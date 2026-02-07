// Living Street - main (tiny, safe)

const home = document.getElementById("home");
const street = document.getElementById("street");

const startBtn = document.getElementById("start");
const backBtn = document.getElementById("back");

function showHome() {
  home.classList.remove("hidden");
  street.classList.add("hidden");
}

function showStreet() {
  home.classList.add("hidden");
  street.classList.remove("hidden");
}

startBtn.addEventListener("click", showStreet);
backBtn.addEventListener("click", showHome);
