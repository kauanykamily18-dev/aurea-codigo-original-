// botao flutuante
const fabMain = document.getElementById("fabMain");
const fabClose = document.getElementById("fabClose");
const fabUp = document.getElementById("fabUp");
const fabContainer = document.querySelector(".fab-container");

fabMain.addEventListener("click", () => {
  fabContainer.classList.add("active");
  fabMain.style.display = "none";
  fabClose.style.display = "flex";
  fabUp.style.display = "flex";
});

fabClose.addEventListener("click", () => {
  fabContainer.classList.remove("active");
  fabMain.style.display = "flex";
  fabClose.style.display = "none";
  fabUp.style.display = "none";
});

fabUp.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});