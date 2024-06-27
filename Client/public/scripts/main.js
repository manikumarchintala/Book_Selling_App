document.addEventListener("DOMContentLoaded", async () => {
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");

  console.log(username, password);
  const jwt = localStorage.getItem("jwt");
  if (jwt == null || username == null || password == null) {
    window.location.href = "./login.html";
  }

  //setting logout function
  let logoutbutton = document.getElementById("logout");
  logoutbutton.addEventListener("click", logout);
  //functanlity for the display bar of the logout.
  let logoutbar = document.querySelector(".profile");
  let loginbar = document.querySelector(".Login");
  logoutbar.addEventListener("click", () => {
    loginbar.classList.toggle("visible");
  });
  //functionality to display the username
  let userdisplay = document.querySelector(".user");
  userdisplay.innerText = username;

  //decalaring options to send the data as a headers to the server with get method
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      username: username,
      password: password,
    },
  };
  try {
    let response = await fetch("http://127.0.0.1:3000/api/user/view", options);
    if (!response.ok) {
      throw new Error(`Httperror`);
    }
    let body = await response.json();
    // destructuring the books for the inner text
    let { books } = body;
    //dont mess this up this works totally fine
    books.forEach((element) => {
      let gridcontainer = document.getElementById("gridcontainer");
      //xreating child for the elements of grid
      let child = document.createElement("div");
      child.setAttribute("class", "child");
      //subchild one is for the images
      let subchildone = document.createElement("div");
      subchildone.setAttribute("class", "subchildone");
      //images to display the link
      let img = document.createElement("img");
      img.setAttribute("src", `${element.imagelink}`);
      // append the image
      subchildone.appendChild(img);
      //for the secondchild element
      let subchildtwo = document.createElement("div");
      subchildtwo.setAttribute("class", "subchildtwo");
      //creating a span element for the tittle and set its text
      let tittle = document.createElement("span");
      tittle.setAttribute("class", "tittle");
      tittle.innerText = `${element.title}`;
      //creating a span element for the author and set its text
      let author = document.createElement("span");
      author.setAttribute("class", "author");
      author.innerText = `${element.author}`;
      //creating a break element
      let brea = document.createElement("br");
      //append the title for and author to the second subchild and br
      subchildtwo.appendChild(tittle);
      subchildtwo.appendChild(brea);
      subchildtwo.appendChild(author);
      //appened both subchildren to the main child element
      child.appendChild(subchildone);
      child.appendChild(subchildtwo);
      //append the child for the grid container
      gridcontainer.appendChild(child);
    });
    // saving in the dummy variable for further use
  } catch (error) {
    console.error("error:", error);
  }

  //logout
  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "./login.html";
  }

  //dont mess this
});
