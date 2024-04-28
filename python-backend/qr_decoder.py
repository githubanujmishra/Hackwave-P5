import qrcode
from pyzbar.pyzbar import decode
from PIL import Image


def decode_qr_code(image):
    """
    Decode the QR code image and extract email ID and unique key.

    Args:
        image (file): The QR code image file.

    Returns:
        tuple: A tuple containing the email ID and unique key extracted from the QR code.
    """
    # Load QR code image
    qr_image = Image.open(image)

    # Decode QR code
    decoded_objects = decode(qr_image)

    if decoded_objects:
        # Extract data from QR code
        qr_data = decoded_objects[0].data.decode("utf-8")
        email = qr_data.split(",")[0].split(":")[1]
        unique_key = qr_data.split(",")[1].split(":")[1]

        return email, unique_key
    else:
        return None, None
