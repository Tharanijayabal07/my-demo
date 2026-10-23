/* ============================================
   Style 2 JavaScript
   Three features:
   1. Open and close the menu on small screens
   2. Check the contact form before sending
   3. Highlight the sidebar link of the section you are reading
   ============================================ */


/* ---------- 1. MENU BUTTON ---------- */

var menuBtn = document.getElementById("menuBtn");
var menu = document.getElementById("menu");

// on click, add or remove the class "show"
menuBtn.addEventListener("click", function () {
  menu.classList.toggle("show");
});

// close the menu after a link is clicked
var links = document.querySelectorAll(".menu a");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    menu.classList.remove("show");
  });
}


/* ---------- 2. CONTACT FORM CHECK ---------- */

var form = document.getElementById("contactForm");
var formMsg = document.getElementById("formMsg");

form.addEventListener("submit", function (event) {

  event.preventDefault(); // stop the page from reloading

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // any empty box -> warning
  if (name === "" || email === "" || message === "") {
    formMsg.textContent = "error: please fill all the fields.";
    formMsg.style.color = "#e5604d";
    return;
  }

  // email must contain @
  if (email.indexOf("@") === -1) {
    formMsg.textContent = "error: please enter a valid email.";
    formMsg.style.color = "#e5604d";
    return;
  }

  // save the message in local storage
  var saved = [];
  try {
    saved = JSON.parse(localStorage.getItem("contactMessages")) || [];
  } catch (e) {
    saved = [];
  }
  saved.push({ name: name, email: email, message: message, date: new Date().toLocaleString() });
  try {
    localStorage.setItem("contactMessages", JSON.stringify(saved));
  } catch (e) {
    formMsg.textContent = "error: could not save the message.";
    formMsg.style.color = "#e5604d";
    return;
  }

  // all good
  formMsg.textContent = "ok: message saved. thank you.";
  formMsg.style.color = "#e3a53b";
  form.reset();
});


/* ---------- 3. ACTIVE LINK WHILE SCROLLING ---------- */

// the 4 content sections that have a link in the sidebar
var sectionIds = ["about", "skills", "projects", "contact"];

// runs every time the page is scrolled
window.addEventListener("scroll", function () {

  var current = "";

  // go through the sections from top to bottom.
  // the last one whose top has passed the middle of the screen is the one we are in
  for (var s = 0; s < sectionIds.length; s++) {
    var section = document.getElementById(sectionIds[s]);
    var top = section.getBoundingClientRect().top;

    if (top < window.innerHeight / 2) {
      current = sectionIds[s];
    }
  }

  // give the class "active" to the matching link, remove it from the others
  for (var k = 0; k < links.length; k++) {
    if (links[k].getAttribute("data-section") === current) {
      links[k].classList.add("active");
    } else {
      links[k].classList.remove("active");
    }
  }
});
