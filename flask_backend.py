from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze_food():
    data = request.json
    image_data = data.get('image', '')
    
    # Remove data URL prefix if present
    if 'base64,' in image_data:
        image_data = image_data.split('base64,')[1]
    
    # Decode base64 image
    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes))
    
    # TODO: Add Gemini API call here
    # For now, return mock response
    result = {
        "food_name": "Sample Food (Add Gemini API)",
        "calories": 0,
        "confidence": 0,
        "message": "Add your Gemini API key to get real results"
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
