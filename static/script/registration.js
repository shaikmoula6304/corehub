// Elements
const registerForm = document.getElementById("registerForm");
const otpForm = document.getElementById("otpForm");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const loginLink = document.getElementById("loginLink");

// Show loading or error messages
function showMessage(msg, type = "error") {
  let existing = document.getElementById("form-msg");
  if (existing) existing.remove();

  const msgBox = document.createElement("p");
  msgBox.id = "form-msg";
  msgBox.className = type === "error" ? "error-message" : "success-message";
  msgBox.innerText = msg;

  const container = document.querySelector(".register-container");
  container.insertBefore(msgBox, otpForm);
}

// ✅ Send OTP using FormData (Option 2)
async function sendForm(event) {
  event.preventDefault();

  const formData = new FormData(registerForm); // Automatically includes all inputs

  try {
    const response = await fetch("/register", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok && result.success) {
      step1.style.display = "none";
      step2.style.display = "block";
      showMessage("✅ OTP sent to your email!", "success");
    } else {
      showMessage(result.message || "❌ Something went wrong.");
    }
  } catch (error) {
    showMessage("❌ Server error. Please try again later.");
    console.error(error);
  }
}

// ✅ Verify OTP
async function verifyOTP(event) {
  event.preventDefault();

  const otp = document.getElementById("otp").value;
  const email = registerForm.email.value; // Get email from the first form

  try {
    const response = await fetch("/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      step2.style.display = "none";
      loginLink.style.display = "block";
      showMessage("🎉 Account created successfully!", "success");
      window.location.href = "login.html";
    } else {
      showMessage(result.message || "❌ Invalid OTP, please try again.");
    }
  } catch (error) {
    showMessage("❌ Failed to verify OTP.");
    console.error(error);
  }
}
