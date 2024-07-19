document.addEventListener("DOMContentLoaded", () => {
  let jwt = localStorage.getItem("jwt");
  if (jwt != null) {
    window.location.href = "./main.html";
  }

  // Elements for login and registration forms
  let regDisplay = document.getElementById("registrandisplay");
  let loginDisplay = document.getElementById("logindisplay");
  let showRegister = document.getElementById("showRegister");
  let showLogin = document.getElementById("showLogin");

  // Show registration form and hide login form
  showRegister.addEventListener("click", (event) => {
    event.preventDefault();
    loginDisplay.classList.add("hidden");
    loginDisplay.classList.remove("visible");
    regDisplay.classList.remove("hidden");
    regDisplay.classList.add("visible");
  });

  // Show login form and hide registration form
  showLogin.addEventListener("click", (event) => {
    event.preventDefault();
    regDisplay.classList.add("hidden");
    regDisplay.classList.remove("visible");
    loginDisplay.classList.remove("hidden");
    loginDisplay.classList.add("visible");
  });

  // Login form submission
  const form = document.getElementById("loginform");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("login_username").value;
    const password = document.getElementById("login_password").value;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: username,
        password: password,
      },
    };
    try {
      let response = await fetch(
        "http://127.0.0.1:3000/api/user/signin",
        options
      );
      if (!response.ok) {
        throw new Error("HTTP error");
      }
      let body = await response.json();
      let { auth, status, message } = body;

      if (status === "ok") {
        localStorage.setItem("jwt", auth);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        window.location.href = "./main.html";
      } else {
        console.error(message);
        alert("An error has occurred");
      }
    } catch (error) {
      console.error(error);
    }
  });
});
