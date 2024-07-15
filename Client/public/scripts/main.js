document.addEventListener("DOMContentLoaded", async () => {
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");
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
  //functionality for the checkout view section
  let checkout = document.querySelector(".checkoutcart");
  let checkoutgrid = document.querySelector(".checkoutgrid");
  checkout.addEventListener("click", async () => {
    checkoutgrid.classList.toggle("visiblecheckout");
    const cartitems = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        username: username,
        password: password,
      },
    };

    try {
      let response = await fetch(
        "http://127.0.0.1:3000/api/user/Addedbooks",
        cartitems
      );
      if (!response.ok) {
        throw Error(`Httperror`);
      }
      let body = await response.json();
      let { items } = body;
      console.log("mani");
    } catch (error) {
      console.error(error);
    }
  });
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
      //append the title for and author to the second subchild and br
      subchildtwo.appendChild(tittle);
      subchildtwo.appendChild(document.createElement("br"));
      subchildtwo.appendChild(author);
      //creating sub child three for the hidden details
      let subchildthree = document.createElement("div");
      subchildthree.setAttribute("class", "subchildthree");
      //creating span for the discreption;
      let discreption = document.createElement("span");
      discreption.setAttribute("class", "discription");
      discreption.innerText = `${element.descreption}`;
      //creating id for the push to the cart
      let id = document.createElement("span");
      id.setAttribute("class", "id");
      id.innerText = `${element._id}`;
      //creating genere for the books
      let genre = document.createElement("span");
      genre.setAttribute("class", "genre");
      genre.innerText = `${element.genre}`;
      //  creating price
      let price = document.createElement("span");
      price.setAttribute("class", "price");
      price.innerText = `${element.price}`;
      //appending indvidual elements into the subchild three
      subchildthree.appendChild(discreption);
      subchildthree.appendChild(id);
      subchildthree.appendChild(genre);
      subchildthree.appendChild(price);
      //appened both subchildren to the main child element
      child.appendChild(subchildone);
      child.appendChild(subchildtwo);
      child.appendChild(subchildthree);
      //append the child for the grid container
      gridcontainer.appendChild(child);
    });
  } catch (error) {
    console.error("error:", error);
  }
  //using event delegation on the gridcontainer.
  gridcontainer.addEventListener("click", function (event) {
    // Check if the clicked element has the class "child"
    let clickedChild = event.target.closest(".child");
    if (clickedChild) {
      //Accessing title and author from the clicked child element
      let title = clickedChild.querySelector(".tittle").innerText;
      let author = clickedChild.querySelector(".author").innerText;
      let discription = clickedChild.querySelector(".discription").innerText;
      let genre = clickedChild.querySelector(".genre").innerText;
      let price = clickedChild.querySelector(".price").innerText;
      let image = clickedChild.querySelector("img").getAttribute("src");
      let id = clickedChild.querySelector(".id").innerText;
      //Printing the title, author, and book name (assuming book name is the same as title)
      console.log(`Author: ${author}`);
      console.log(`Book Name: ${title}`);
      console.log(`Genre: ${genre}`);
      console.log(`discreption:${discription}`);
      console.log(`Price:${price}`);
      console.log(`url:${image}`);
      console.log(`id:${id}`);
      //Getting the element from Html
      let popup = document.querySelector(".popup");
      //creating display and adding image to the display.
      let popupdisplay = document.createElement("div");
      popupdisplay.setAttribute("class", "popupdisplay");
      let displaypicture = document.createElement("img");
      displaypicture.setAttribute("src", `${image}`);
      displaypicture.setAttribute("alt", `${title}`);
      popupdisplay.appendChild(displaypicture);
      //for the middle compartment.
      let popuptext = document.createElement("div");
      popupdisplay.setAttribute("class", "popuptext");
      let displaytittle = document.createElement("span");
      displaytittle.setAttribute("class", "displaytittle");
      displaytittle.innerText = `${title}`;
      let displayid = document.createElement("span");
      displayid.setAttribute("class", "displayid");
      displayid.innerText = id;
      let displaygenre = document.createElement("span");
      displaygenre.setAttribute("class", "displaygenre");
      displaygenre.innerText = genre;
      let displayauthor = document.createElement("span");
      displayauthor.setAttribute("class", "displayauthor");
      displayauthor.innerText = author;
      let displaydescription = document.createElement("span");
      displaydescription.setAttribute("class", "displaydescription");
      displaydescription.innerText = discription;
      let displayprice = document.createElement("span");
      displayprice.setAttribute("class", "displayprice");
      displayprice.innerText = `${price}  $`;
      let cartbutton = document.createElement("button");
      cartbutton.setAttribute("class", "displaybutton");
      cartbutton.innerText = "Add to Cart";
      popuptext.appendChild(displaytittle);
      popuptext.appendChild(document.createElement("br"));
      popuptext.appendChild(displayid);
      popuptext.appendChild(document.createElement("br"));
      popuptext.appendChild(displaygenre);
      popuptext.appendChild(document.createElement("br"));
      popuptext.appendChild(displayauthor);
      popuptext.appendChild(document.createElement("br"));
      popuptext.appendChild(displaydescription);
      popuptext.appendChild(document.createElement("br"));
      popuptext.appendChild(displayprice);
      popuptext.appendChild(document.createElement("br"));
      popuptext.appendChild(cartbutton);

      //creating the button close button.
      let popupclose = document.createElement("div");
      popupclose.setAttribute("class", "popupclose");
      let butn = document.createElement("button");
      butn.innerText = "X";
      butn.setAttribute("class", "remove");
      popupclose.appendChild(butn);
      popup.appendChild(popupdisplay);
      popup.appendChild(popuptext);
      popup.appendChild(popupclose);

      let but = document.querySelector(".remove");
      but.addEventListener("click", () => {
        popup.innerHTML = "";
      });
    }
  });
  //logout
  function logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "./login.html";
  }
  //dont mess this
});
