from flask import Flask, request, jsonify
from qr_generator import generate_qr_code

app = Flask(__name__)

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

    # Return the unique key in the response
    return jsonify({"unique_key": unique_key})

if __name__ == "__main__":
    app.run(debug=True)
