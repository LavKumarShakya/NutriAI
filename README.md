# Clarity Bite - AI Nutrition Advisor

Clarity Bite is an intelligent nutrition assistant that helps you track your diet by simply scanning your food. Powered by Google's Gemini AI, it analyzes food images to provide instant nutritional breakdowns, health scores, and personalized insights.

## 🚀 Features

- **AI Food Scanner**: Snap a photo or upload an image to get an instant analysis of your meal.
- **Detailed Nutrition Facts**: Get calorie counts, macronutrients (Protein, Carbs, Fats), and a health score (0-100).
- **Smart Context**: Add your own notes (e.g., "extra cheese", "cooked in olive oil") to refine the AI's analysis.
- **Gamified Experience**: Track your "Health Score" and build healthy habits with a visual and engaging interface.
- **Responsive Design**: A modern, mobile-friendly UI built with React and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- **React**: UI library for building the interface.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn UI**: Reusable UI components.
- **Framer Motion**: For smooth animations and transitions.
- **React Router**: For client-side routing.

### Backend
- **Node.js & Express**: Server-side runtime and framework.
- **Google Gemini API**: Advanced AI model for image analysis.
- **Dotenv**: For environment variable management.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (Node Package Manager)

### 1. Clone the Repository
```bash
git clone <YOUR_GIT_URL>
cd clarity-bite
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your Gemini API key (optional if hardcoded for demo, but recommended for security):
```env
GEMINI_API_KEY=your_api_key_here
```
*Note: The current implementation may have the key configured directly in `server.js` for demonstration purposes.*

### 4. Run the Application

You need to run both the frontend and the backend servers.

**Start the Backend Server:**
```bash
npm run server
```
*The server runs on `http://localhost:5000`*

**Start the Frontend Development Server:**
```bash
npm run dev
```
*The app will be available at `http://localhost:8080` (or the port shown in your terminal)*

## 📖 Usage

1.  Open the application in your browser.
2.  Click on **"Try AI Food Scanner"** or navigate to the Scan page.
3.  Upload a photo of your food.
4.  (Optional) Add any hidden details in the "Additional Context" box.
5.  Click **"Analyze Food"**.
6.  View your nutritional breakdown and health score!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
