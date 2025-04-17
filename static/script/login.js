async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // ✅ Email and password format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (password.length < 10) {
    alert("Password must be at least 10 characters.");
    return;
  }

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // ✅ Redirect on success
      window.location.href = "index.htm";
    } else {
      // ❌ Login failed
      alert(result.message || "Invalid email or password.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Something went wrong. Please try again.");
  }
}
fetch('/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',  // Important for session
  body: JSON.stringify({ email, password })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    window.location.href = "/index.htm";
  } else {
    alert(data.message);
  }
});
