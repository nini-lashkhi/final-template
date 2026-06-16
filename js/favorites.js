import { getFavorites, addOrRemoveFavorite } from "./storage.js";
import { showMessage } from "./utils.js";

const favoritesList = document.querySelector("#favoritesGrid");

document.addEventListener("DOMContentLoaded", showFavorites);

function showFavorites() {
  if (!favoritesList) return;

  while (favoritesList.firstChild) {
    favoritesList.removeChild(favoritesList.firstChild);
  }

  const favorites = getFavorites();

  if (favorites.length === 0) {
    showMessage(favoritesList, "No favorite products yet.");
    return;
  }

  favorites.forEach(function (product) {
    const card = createFavoriteCard(product);
    favoritesList.appendChild(card);
  });
}

function createFavoriteCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "product-card__image";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  imageWrapper.appendChild(img);

  const category = document.createElement("span");
  category.className = "product-card__category";
  category.textContent = product.category;

  const title = document.createElement("h3");
  title.className = "product-card__title";
  title.textContent = product.title;

  const description = document.createElement("p");
  description.className = "product-card__text";
  description.textContent = product.description;

  const price = document.createElement("p");
  price.className = "product-card__price";
  price.textContent = "$" + product.price;

  const button = document.createElement("button");
  button.className = "button button--small";
  button.type = "button";
  button.textContent = "Remove";

  button.addEventListener("click", function () {
    addOrRemoveFavorite(product);
    showFavorites();
  });

  card.appendChild(imageWrapper);
  card.appendChild(category);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(button);

  return card;
}