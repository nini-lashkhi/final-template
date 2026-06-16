document.addEventListener("DOMContentLoaded", function () {
  makeHomeCardsInteractive();
});

function makeHomeCardsInteractive() {
  const cards = document.querySelectorAll(".product-grid--home .product-card");

  cards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.classList.add("active-card");
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("active-card");
    });
  });
}