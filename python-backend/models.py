from pymongo import MongoClient
from bson.objectid import ObjectId
import os

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
