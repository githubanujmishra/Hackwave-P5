from flask import Flask, request, jsonify, send_file
from dotenv import load_dotenv
import os
from models import QRCode
import cv2
import qrcode
import numpy as np

load_dotenv()

# Create Flask app
app = Flask(__name__)

# Initialize MongoDB connection
app.config['MONGO_URI'] = os.getenv('MONGODB_URI')


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

    # Generate unique key
    unique_key = os.urandom(16).hex()

    # Generate QR code image
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(f"{email}-{unique_key}")
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white")

    # Save QR code image locally
    qr_img_path = f"qr_codes/{unique_key}.png"
    qr_img.save(qr_img_path)

    # Save QR code URL to the database
    qr_code_doc_id = QRCode.create(email, unique_key, qr_img_path)

    # Return the QR code URL and document ID in the response
    return jsonify({"qr_code_url": qr_img_path, "qr_code_doc_id": qr_code_doc_id}), 201


@app.route("/decode_qr_code", methods=["GET"])
def decode_qr():
    """
    Endpoint to decode the provided QR code image using the webcam.
    """
    # Initialize webcam
    cap = cv2.VideoCapture(0)

    # Initialize QR code detector
    detector = cv2.QRCodeDetector()

    while True:
        # Capture frame from webcam
        ret, frame = cap.read()

        # Detect QR codes in the frame
        data, vertices, _ = detector.detectAndDecodeMulti(frame)

        if data:
            # Split data into email and unique key
            email, unique_key = data.split("-")

            # Mark attendance
            if QRCode.mark_attendance(unique_key):
                return jsonify({"message": "Attendance marked successfully", "email": email, "unique_key": unique_key})
            else:
                return jsonify({"error": "Failed to mark attendance"}), 500

        # Display the frame
        cv2.imshow("QR Code Scanner", frame)

        # Check for key press to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release resources
    cap.release()
    cv2.destroyAllWindows()

    return jsonify({"error": "No QR code detected"}), 400


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
