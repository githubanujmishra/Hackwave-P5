from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv
import datetime
from flask import jsonify

load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv('MONGODB_URI'))
db = client.get_default_database()
collection = db['qr_codes']


class QRCode:
    @classmethod
    def create(cls, email, unique_key):
        # Insert new QR code document into the collection
        result = collection.insert_one({'email': email, 'unique_key': unique_key})
        return str(result.inserted_id)

    @classmethod
    def get(cls, object_id):
        # Retrieve QR code document by its ObjectID
        qr_code = collection.find_one({'_id': ObjectId(object_id)})
        return qr_code

    @classmethod
    def find_by_unique_key(cls, unique_key):
        # Find QR code document by its unique key
        qr_code = collection.find_one({'unique_key': unique_key})
        return qr_code

    @classmethod
    def mark_attendance(unique_key):
        # Get today's date
        today_date = datetime.datetime.now().date()

        # Check if the QR code exists in the database
        qr_code = QRCode.find_by_unique_key(unique_key)
        if qr_code:
            # Check if attendance is already marked for today
            if 'attendance_date' in qr_code and qr_code['attendance_date'] == today_date:
                return jsonify({"message": "Attendance already marked for today"}), 400

            # Update the document to mark attendance for today
            QRCode.update(unique_key, {'$set': {'attendance_date': today_date}})

            # Calculate attendance percentage
            total_classes_held = 50  # Assuming 50 classes held
            total_classes_attended = QRCode.get_total_attendance(unique_key)
            attendance_percentage = (total_classes_attended / total_classes_held) * 100

            return jsonify({
                "message": "Attendance marked successfully",
                "attendance_percentage": attendance_percentage,
                "total_classes_attended": total_classes_attended,
                "total_classes_held": total_classes_held
            }), 200
        else:
            return jsonify({"error": "Invalid QR code"}), 404

    @classmethod
    def calculate_percentage(cls, email):
        # Calculate attendance percentage for the given email
        total_classes = collection.count_documents({'email': email})
        attended_classes = collection.count_documents({'email': email, 'attendance_marked': True})
        if total_classes > 0:
            percentage = (attended_classes / total_classes) * 100
        else:
            percentage = 0
        return {'email': email, 'attendance_percentage': percentage, 'total_classes': total_classes}

