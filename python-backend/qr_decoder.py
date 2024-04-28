import qrcode
from pyzbar.pyzbar import decode


def decode_qr_code(image_path):
    """
    Decode the QR code image and extract email ID and unique key.

    Args:
        image_path (str): Path to the QR code image file.

    Returns:
        tuple: A tuple containing the email ID and unique key extracted from the QR code.
    """
    # Load QR code image
    image = qrcode.load(image_path)

    # Decode QR code
    decoded_objects = decode(image)

    if decoded_objects:
        # Extract data from QR code
        qr_data = decoded_objects[0].data.decode("utf-8")
        email = qr_data.split(",")[0].split(":")[1]
        unique_key = qr_data.split(",")[1].split(":")[1]

        return email, unique_key
    else:
        return None, None
