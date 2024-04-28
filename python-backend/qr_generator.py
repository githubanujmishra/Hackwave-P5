import qrcode
import uuid

def generate_qr_code(email):
    """
    Generate a QR code for the given email ID and return a unique key.

    Args:
        email (str): The email ID to encode in the QR code.

    Returns:
        str: A unique key associated with the QR code.
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

    # Return the unique key
    return unique_key
