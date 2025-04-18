from flask import Flask, request, jsonify, render_template, redirect, url_for, session, send_from_directory
from flask_cors import CORS
import random
import firebase_admin
from firebase_admin import credentials, db
import smtplib
from functools import wraps  # ✅ Import for route protection

app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key_here'

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://blog-f8552-default-rtdb.firebaseio.com/'
})

# Temporary store for OTP and user data
otp_store = {}

# ✅ Function to check if email is already registered
def is_email_registered(email):
    ref = db.reference('users')
    users = ref.get()
    if users:
        for user_id, user_data in users.items():
            if user_data.get('email').lower() == email.lower():
                return True
    return False

# ✅ Route protection decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("login_page"))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    return render_template("registration.html")
@app.route('/register', methods=['POST'])
def register():
    try:
        name = request.form['name']
        email = request.form['email']
        college = request.form['college']
        branch = request.form['branch']
        year = request.form['year']
        mobile = request.form['mobile']
        password = request.form['password']

        if is_email_registered(email):
            return jsonify({"success": False, "message": "🔥 Email is already registered.✅"}), 400

        otp = str(random.randint(100000, 999999))

        send_otp_email(email, otp)

        otp_store[email] = {
            "otp": otp,
            "data": {
                "name": name,
                "email": email,
                "college": college,
                "branch": branch,
                "year": year,
                "mobile": mobile,
                "password": password
            }
        }

        return jsonify({"success": True, "message": "OTP sent to email"})

    except Exception as e:
        print("Error during registration:", e)
        return jsonify({"success": False, "message": "Failed to send OTP"}), 500

@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    try:
        data = request.get_json()
        email = data['email']
        entered_otp = data['otp']

        if email in otp_store and otp_store[email]['otp'] == entered_otp:
            user_data = otp_store[email]['data']
            ref = db.reference('users')
            ref.push(user_data)

            del otp_store[email]

            return jsonify({"success": True, "message": "OTP verified and user registered"})
        else:
            return jsonify({"success": False, "message": "Invalid OTP"}), 400

    except Exception as e:
        print("Error during OTP verification:", e)
        return jsonify({"success": False, "message": "OTP verification failed"}), 500

def send_otp_email(to_email, otp):
    sender_email = "shaikmoula6304@gmail.com"
    sender_password = "enzq ifvr rpqy ezyn"

    subject = "CoreHub - OTP Verification"
    body = f"Your OTP is: {otp}"

    message = f"Subject: {subject}\n\n{body}"

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, message)

@app.route("/login.html")
def login_page():
    return render_template("login.html")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    try:
        ref = db.reference('users')
        users = ref.get()

        if users:
            for uid, user in users.items():
                if user.get("email") == email and user.get("password") == password:
                    session["user_id"] = uid
                    return jsonify({"success": True})
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    except Exception as e:
        print("🔥 LOGIN ERROR:", e)
        return jsonify({"success": False, "message": "Server error"}), 500

@app.route("/registration.html")
def registration_page():
    return render_template("registration.html")

# ✅ Secured routes
@app.route("/index.html")
@login_required
def index_page():
    return render_template("index.html")

@app.route('/blog.html')
@login_required
def blog():
    return render_template("blog.html")

@app.route('/courses.html')
@login_required
def courses():
    return render_template("courses.html")

@app.route('/careers.html')
@login_required
def careers():
    return render_template("careers.html")

@app.route('/projects.html')
@login_required
def projects():
    return render_template("projects.html")

@app.route("/about.html")
def about_page():
    return render_template("about.html")
@app.route("/contact.html")
def contact_page():
    return render_template("contact.html")
@app.route("/vlsi.html")
def vlsi_page():
    return render_template("vlsi.html")


@app.route("/profile.html")
def profile_page():
    if "user_id" in session:
        user_data = {
            "name": session.get("name"),
            "email": session.get("email"),
            # Add any other user data stored in session
        }
        return render_template("profile.html", user=user_data)
    else:
        return redirect(url_for("login_page"))
    
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login_page'))

if __name__ == '__main__':
    app.run(debug=True)
