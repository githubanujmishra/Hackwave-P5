from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from models import QRCode
from app import generate_qr_code, decode_qr_code

# Load environment variables from .env file
load_dotenv()

# Create Flask app
app = Flask(__name__)

# Initialize MongoDB connection
app.config['MONGODB_URI'] = os.getenv('MONGODB_URI')

@app.route("/generate_qr_code", methods=["POST"])
def generate_qr():
    """
    Endpoint to generate a QR code for the provided email ID.
    Expects JSON data with the email ID in the request body.
    """
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email ID not provided"}), 400

    unique_key = generate_qr_code(email)
    # Save QR code data to the database
    QRCode.create(email, unique_key)

    # Return the unique key in the response
    return jsonify({"unique_key": unique_key})

@app.route("/decode_qr_code", methods=["POST"])
def decode_qr():
    """
    Endpoint to decode the provided QR code image and extract email ID and unique key.
    Expects a file upload with the QR code image.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    qr_image = request.files["file"]

    if qr_image.filename == "":
        return jsonify({"error": "No file selected"}), 400

    email, unique_key = decode_qr_code(qr_image)

    if email and unique_key:
        return jsonify({"email": email, "unique_key": unique_key})
    else:
        return jsonify({"error": "Failed to decode QR code"}), 400

if __name__ == "__main__":
    app.run(debug=True)
