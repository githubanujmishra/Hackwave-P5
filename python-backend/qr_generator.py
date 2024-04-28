import qrcode
import uuid
import bson
from models import QRCode
from io import BytesIO
from PIL import Image

def generate_qr_code(email, name):
    unique_key = str(uuid.uuid4())

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )

    data = f"email:{email},name:{name},key:{unique_key}"
    qr.add_data(data)
    qr.make(fit=True)

    qr_image_bytes = BytesIO()
    qr.make_image(fill_color="black", back_color="white").save(qr_image_bytes, format='PNG')
    qr_image_bytes.seek(0)

    qr_image_bson = bson.BSON.encode({
        "image": qr_image_bytes.getvalue(),
        "format": "PNG"
    })

    QRCode.save_qr_image(email, qr_image_bson)

    return unique_key
