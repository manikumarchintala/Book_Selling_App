document.addEventListener("DOMContentLoaded", () => {
  let jwt = localStorage.getItem("jwt");
  if (jwt != null) {
    window.location.href = "./main.html";
  }
  const form = document.getElementById("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
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
        throw new Error(`Httperror`);
      }
      let body = await response.json();
      // destructuring the books for the inner text
      let { auth, status, message } = body;
      //   console.log(body);
      console.log(auth);
      console.log(status);
      console.log(message);

      if (status === "ok") {
        localStorage.setItem("jwt", auth);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        window.location.href = "./main.html";
      } else {
        console.error(message);
        alert("an error has occured");
      }
    } catch (error) {
      console.error(error);
    }
  });
});
// export default { username, password };
