from flask import Flask, request, jsonify, send_file
from dotenv import load_dotenv
import os
from qr_generator import generate_qr_code
from models import QRCode
import cv2
from io import BytesIO

load_dotenv()

app = Flask(__name__)
app.config['MONGO_URI'] = os.getenv('MONGODB_URI')

@app.route("/generate_qr_code", methods=["POST"])
def generate_qr():
    data = request.json
    email = data.get("email")
    name = data.get("name")

    if not email or not name:
        return jsonify({"error": "Email ID or name not provided"}), 400

    unique_key = generate_qr_code(email, name)

    return jsonify({"qr_code_unique_key": unique_key}), 201

@app.route("/decode_qr_code", methods=["GET"])
def decode_qr_code():
    cap = cv2.VideoCapture(0)
    detector = cv2.QRCodeDetector()

    while True:
        ret, frame = cap.read()

        cv2.imshow("QR Code Scanner", frame)

        decoded_info, _, _, _ = detector.detectAndDecodeMulti(frame)

        if decoded_info is not False and isinstance(decoded_info, str):
            email, unique_key = decoded_info.split(",")
            student = QRCode.find_by_unique_key(unique_key)
            if student:
                result = QRCode.mark_attendance(unique_key)
                return jsonify(result), 200
            else:
                return jsonify({"error": "Student does not exist"}), 404

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    return jsonify({"error": "No QR code detected"}), 400

@app.route("/get_qr_image", methods=["POST"])
def get_qr_image():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email ID not provided"}), 400

    qr_code = QRCode.find_by_email(email)

    if qr_code:
        qr_image_bson = qr_code.get('qr_image')
        if qr_image_bson:
            return send_file(BytesIO(qr_image_bson), mimetype='image/jpeg'), 200
        else:
            return jsonify({"error": "No QR image found for the given email ID"}), 404
    else:
        return jsonify({"error": "No QR code found for the given email ID"}), 404

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
