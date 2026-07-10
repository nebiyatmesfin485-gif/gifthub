const API_URL = "http://localhost:3000/api";

console.log("auth.js loaded");

// ==========================
// REGISTER
// ==========================
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        console.log("Register form submitted");

        const full_name = document.getElementById("full_name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    full_name,
                    email,
                    password
                })
            });

            const data = await response.json();

            console.log("Register Response:", data);

            if (response.ok && data.success) {

                alert("Registration successful!");

                window.location.href = "login.html";

            } else {

                alert(data.message || "Registration failed.");

            }

        } catch (error) {

            console.error("Register Error:", error);

            alert("Unable to connect to the server.");

        }

    });

}

// ==========================
// LOGIN
// ==========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            console.log(data);

            if (data.success) {

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Login successful!");

               if (data.user.role === "admin") {

    window.location.href = "admin.html";

} else {

    window.location.href = "index.html";

}

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Unable to connect to the server.");

        }

    });

}