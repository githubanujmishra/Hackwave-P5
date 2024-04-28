# qr_generator.py

import qrcode
import uuid
import os

def generate_qr_code(email):
    """
    Generate a QR code for the given email ID and return a unique key and the path to the QR code image.

    Args:
        email (str): The email ID to encode in the QR code.

    Returns:
        tuple: A tuple containing the unique key associated with the QR code and the path to the QR code image.
    """
    # Generate a unique key for the QR code
    unique_key = str(uuid.uuid4())

    # Create QR code instance
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )

    # Add email ID and unique key to the QR code data
    data = f"email:{email},key:{unique_key}"
    qr.add_data(data)
    qr.make(fit=True)

    # Generate QR code image
    qr_image_path = os.path.join("static", "qr_codes", f"{unique_key}.png")
    qr.make_image(fill_color="black", back_color="white").save(qr_image_path)

    # Return the unique key and the path to the QR code image
    return unique_key, qr_image_path
