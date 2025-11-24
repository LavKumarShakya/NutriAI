import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// In a real app, use process.env.API_KEY
const API_KEY = "AIzaSyCjCdhDbGNRTyf3XXlvrIt_YARoE1g1VMk";
const genai = new GoogleGenerativeAI(API_KEY);

app.get('/', (req, res) => {
    res.send('AI Nutrition Analyzer Node.js Backend is Running!');
});

app.post('/analyze', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }

        // Remove data URL prefix if present
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

        // Use gemini-2.0-flash as discovered previously
        const model = genai.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
    Analyze this food image and provide nutritional information.
    Return ONLY a valid JSON object with the following structure:
    {
        "food_name": "Name of the food",
        "calories": 0,
        "macros": {
            "protein": "0g",
            "carbs": "0g",
            "fats": "0g"
        },
        "health_score": 0,
        "message": "A brief health analysis message"
    }
    If the image is not food, return:
    {
        "error": "Not a food image"
    }
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
