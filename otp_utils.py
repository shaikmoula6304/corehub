import random
import smtplib
from email.mime.text import MIMEText
from firebase_config import db

def generate_otp():
    """Generate a 6-digit random OTP"""
    return str(random.randint(100000, 999999))

def send_otp_email(email, otp):
    """Send OTP via email using Gmail SMTP"""
    subject = "CoreHub - Your OTP Verification Code"
    body = f"Hello!\n\nYour OTP for registration is: {otp}\n\nThank you,\nCoreHub Team"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = "shaikmoula6304@gmail.com"   # Replace with your email
    msg["To"] = email

    try:
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login("shaikmoula6304@gmail.com", "enzq ifvr rpqy ezyn")  # Use an app password (not your Gmail password)
        server.sendmail("your_email@gmail.com", email, msg.as_string())
        server.quit()
        print(f"✅ OTP sent to {email}")
    except Exception as e:
        print(f"❌ Failed to send OTP: {e}")

def store_otp(email, otp):
    """Store OTP in Firebase Realtime Database under 'otps' node"""
    db.reference(f"otps/{email.replace('.', '_')}").set({
        "otp": otp
    })

def verify_otp(email, input_otp):
    """Verify the user input OTP with the stored one in Firebase"""
    ref = db.reference(f"otps/{email.replace('.', '_')}")
    stored_data = ref.get()
    if stored_data and stored_data.get("otp") == input_otp:
        return True
    return False
