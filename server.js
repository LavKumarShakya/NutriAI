import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// In a real app, use process.env.API_KEY
const API_KEY = process.env.GEMINI_API_KEY;
const genai = new GoogleGenerativeAI(API_KEY);

app.post('/analyze', async (req, res) => {
    try {
        const { image, additionalInfo } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }

        // Remove data URL prefix if present
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

        // Use gemini-2.0-flash as discovered previously
        const model = genai.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
    You are NutriAI, a deterministic nutrition analysis engine.

    Your goal is to produce REPEATABLE nutrition results for identical images.

    You MUST strictly follow the rules below:

    ========================================================
    ### 🔒 1. DETERMINISTIC BEHAVIOR
    - Do NOT generate creative or alternative interpretations.
    - Interpret the same image the SAME way every time.
    - Do NOT vary serving size, food type, or USDA item selection between runs.

    ========================================================
    ### 🔒 2. STRICT USDA-BASED IDENTIFICATION
    Identify the food using **USDA FoodData Central** item codes ONLY:
    URL: https://fdc.nal.usda.gov/

    Rules:
    - Choose the SINGLE closest USDA item.
    - Always use the SAME USDA code for the SAME dish, unless the user explicitly specifies otherwise.
    - Do NOT guess random similar dishes.
    - Use only standardized USDA nutritional values.

    Output the following fields:
    "food_identified": "Exact USDA Item Name",
    "usda_fdc_id": "FDC ID Number"

    ========================================================
    ### 🔒 3. UNIVERSAL PORTION-SIZE LOGIC (APPLIES TO ALL FOODS)
    You MUST determine the portion based strictly on the image content.

    GENERAL RULES:
    1. **If the ENTIRE food item is visible**  
       → Portion = the entire item.  
       Examples:
       - A whole pizza  
       - A whole burger  
       - A full bowl of rice  
       - A complete plate/thali  
       - A whole sandwich  
       - A complete pastry or muffin  

    2. **If only ONE serving unit is visible**  
       → Portion = exactly one standard serving of that item.  
       Examples:
       - One pizza slice  
       - One burger patty  
       - One muffin  
       - One bowl  
       - One plate of food  

    3. **If multiple units are clearly visible, count them.**  
       Examples:
       - 3 muffins  
       - 2 burgers  
       - 2 pizza slices  
       - 4 samosas  
       - A platter with multiple identical items  

    4. **If portion cannot be visually determined (cropped image, unclear size)**  
       → Output:
         "needs_user_input": true  
       And do NOT assume any serving size.

    5. **NEVER assume a default USDA serving size** unless:
       - The image clearly shows a single serving, OR
       - The user explicitly specifies the serving.

    EXAMPLES FOR CLARITY:
    - Whole pizza visible → portion = entire pizza (all slices)  
    - A single slice shown → portion = 1 slice  
    - 2 pastries visible → portion = 2 pastries  
    - A full meal plate shown → portion = the entire plate  
    - A cropped bowl top that hides depth → needs user input  

    Output the determination:
    "portion_size_assumed": "<your portion conclusion here>"

    ========================================================
    ### 🔒 4. HEALTH SCORE RULES (0–100)
    Your health evaluation MUST be grounded in:

    1. WHO Healthy Diet Guidelines  
       URL: https://www.who.int/news-room/fact-sheets/detail/healthy-diet  

    2. Dietary Guidelines for Americans 2020–2025  
       URL: https://www.dietaryguidelines.gov/

    Rules:
    - Penalize sodium, sugar, saturated fat per WHO thresholds.
    - Reward whole grains, vegetables, lean proteins.
    - Score MUST be consistent across identical inputs.

    Include:
    "health_rationale": "Explain exactly which WHO/DGA criteria affected the score."

    ========================================================
    ### 🔒 5. OUTPUT FORMAT (JSON ONLY)
    ${additionalInfo ? `User provided additional context: "${additionalInfo}". Take this into account.` : ""}

    Respond ONLY with JSON:

    {
      "food_identified": "...",
      "usda_fdc_id": "...",
      "portion_size_assumed": "...",
      "needs_user_input": false,
      "calories": number,
      "macronutrients": {
        "protein_g": number,
        "carbs_g": number,
        "fats_g": number
      },
      "micronutrients": {
        "fiber_g": number,
        "sodium_mg": number,
        "other_key_micros": "..."
      },
      "health_score": number,
      "health_rationale": "...",
      "assumptions": {
        "why_this_food_item": "...",
        "confidence": 0.0
      }
    }

    If the image is not food, return:
    {
        "error": "Not a food image"
    }

    ========================================================
    Return JSON only. No text outside JSON.
    `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: "image/jpeg",
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean up response text to ensure valid JSON
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const jsonResponse = JSON.parse(cleanedText);

        res.json(jsonResponse);
    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: error.message });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
