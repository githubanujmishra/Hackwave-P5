from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI')

client = MongoClient(MONGODB_URI)
db = client.get_default_database()
collection = db["hackwave"]

class QRCode:
    @classmethod
    def create(cls, email, unique_key, qr_code_url):
        result = collection.insert_one({'email': email, 'unique_key': unique_key, 'qr_code_url': qr_code_url})
        return str(result.inserted_id)

    @classmethod
    def find_by_unique_key(cls, unique_key):
        qr_code = collection.find_one({'unique_key': unique_key})
        return qr_code

    @classmethod
    def mark_attendance(cls, unique_key):
        today_date = datetime.now().date()
        qr_code = QRCode.find_by_unique_key(unique_key)
        if qr_code:
            if 'attendance_date' in qr_code and qr_code['attendance_date'] == today_date:
                return {"message": "Attendance already marked for today"}

            collection.update_one({'unique_key': unique_key}, {'$set': {'attendance_date': today_date}})
            return {"message": "Attendance marked successfully"}
        else:
            return {"error": "Invalid QR code"}

    @classmethod
    def save_qr_image(cls, email, qr_image_bson):
        collection.insert_one({'email': email, 'qr_image': qr_image_bson})

    @classmethod
    def find_by_email(cls, email):
        """
        Find QR code documents by email.

        Args:
            email (str): Email associated with the QR code.

        Returns:
            dict or None: QR code document if found, None if not found.
        """
        qr_code = collection.find_one({'email': email})
        return qr_code
