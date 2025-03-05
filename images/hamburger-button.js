document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.getElementById("hamburger-button");
  const menuButtons = document.getElementById("menu-buttons");
  const buttons = menuButtons.querySelectorAll(".menu-button");
  const overlay = document.getElementById("overlay");
  const searchButton = document.getElementById("search-button");
  const categoryButton = document.getElementById("category-button");
  const searchModal = document.getElementById("search-modal");
  const categoryModal = document.getElementById("category-modal");

  function toggleOverlay(modal) {
    overlay.classList.toggle("hidden");
    modal.classList.toggle("hidden");
  }

  hamburgerButton.addEventListener("click", function () {
    menuButtons.classList.toggle("hidden");
    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.classList.toggle("show");
      }, index * 100);
    });
  });

  searchButton.addEventListener("click", function () {
    toggleOverlay(searchModal);
  });

  categoryButton.addEventListener("click", function () {
    toggleOverlay(categoryModal);
  });

  overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    searchModal.classList.add("hidden");
    categoryModal.classList.add("hidden");
  });
});
