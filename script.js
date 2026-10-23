/* 1. theme toggle (remembered) */
var themeBtn = document.getElementById("themeBtn");
try { if (localStorage.getItem("theme") === "light") document.body.classList.add("light"); } catch (e) {}
function setIcon() { themeBtn.innerHTML = document.body.classList.contains("light") ? "&#9790;" : "&#9728;"; }
setIcon();
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("light");
  try { localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark"); } catch (e) {}
  setIcon();
});

/* 2. typing effect */
var words = ["CS student", "future full stack developer", "Java learner", "hackathon player"];
var typed = document.getElementById("typed");
var wi = 0, ci = 0, deleting = false;
function type() {
  var word = words[wi];
  typed.textContent = word.substring(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(type, 90); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (ci > 0) { ci--; setTimeout(type, 45); }
  else { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 300); }
}
type();

/* 3. scroll reveal + count-up numbers */
function countUp(el) {
  var target = parseInt(el.getAttribute("data-count"), 10), n = 0;
  var t = setInterval(function () { n++; el.textContent = n; if (n >= target) clearInterval(t); }, 250);
}
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) {
      en.target.classList.add("in");
      en.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

/* 4. 3D tilt on the photo */
var tilt = document.getElementById("tilt");
var inner = tilt.querySelector(".tilt-inner");
tilt.addEventListener("mousemove", function (e) {
  var r = tilt.getBoundingClientRect();
  var x = (e.clientX - r.left) / r.width - 0.5;
  var y = (e.clientY - r.top) / r.height - 0.5;
  inner.style.transform = "rotateY(" + x * 18 + "deg) rotateX(" + -y * 18 + "deg)";
});
tilt.addEventListener("mouseleave", function () { inner.style.transform = ""; });

/* 5. cursor glow, scroll progress, active link, back-to-top */
var glow = document.getElementById("glow");
document.addEventListener("mousemove", function (e) { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });

var links = document.querySelectorAll("#nav a");
var ids = ["about", "skills", "projects", "contact"];
var toTop = document.getElementById("toTop");
window.addEventListener("scroll", function () {
  var h = document.documentElement;
  document.getElementById("progress").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  toTop.classList.toggle("show", h.scrollTop > 500);
  var current = "";
  ids.forEach(function (id) {
    if (document.getElementById(id).getBoundingClientRect().top < window.innerHeight / 2) current = id;
  });
  links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + current); });
});
toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

/* 6. skill cards: tap to flip on touch screens */
document.querySelectorAll(".flip").forEach(function (c) {
  c.addEventListener("click", function () { c.classList.toggle("on"); });
});

/* 7. contact form -> saved in local storage */
var form = document.getElementById("contactForm");
var formMsg = document.getElementById("formMsg");
function fail(text) {
  formMsg.textContent = text; formMsg.style.color = "#f87171";
  form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  if (name === "" || email === "" || message === "") return fail("Error: please fill all the fields.");
  if (email.indexOf("@") === -1) return fail("Error: please enter a valid email.");

  var saved = [];
  try { saved = JSON.parse(localStorage.getItem("contactMessages")) || []; } catch (e) { saved = []; }
  saved.push({ name: name, email: email, message: message, date: new Date().toLocaleString() });
  try { localStorage.setItem("contactMessages", JSON.stringify(saved)); }
  catch (e) { return fail("Error: could not save the message."); }

  formMsg.textContent = "Message saved. Thank you!";
  formMsg.style.color = "#22d3ee";
  form.reset();
});
