import os

class Config:
    # Secret key for Flask sessions
    SECRET_KEY = os.getenv('SECRET_KEY')
