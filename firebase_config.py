import firebase_admin
from firebase_admin import credentials, db

# Load service account credentials
cred = credentials.Certificate("serviceAccountKey.json")

# Initialize Firebase Admin SDK with Realtime Database
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://blog-f8552-default-rtdb.firebaseio.com/'  # Replace with your DB URL
})
