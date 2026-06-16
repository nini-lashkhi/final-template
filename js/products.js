import { getProducts } from "./api.js";
import { addOrRemoveFavorite, checkFavorite } from "./storage.js";
import { showMessage, debounce, createCounter } from "./utils.js";

const productsList = document.querySelector("#products-list");
const searchInput = document.querySelector("#product-search");
const favoriteCounter = createCounter();

let allProducts = [];

document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
});

async function loadProducts() {
  if (!productsList) return;

  showMessage(productsList, "Loading products...");

  try {
    allProducts = await getProducts();
    renderProducts(allProducts);
    setupSearch();
  } catch (error) {
    showMessage(productsList, "Products could not be loaded.");
  }
}

function setupSearch() {
  if (!searchInput) return;

  searchInput.addEventListener(
    "input",
    debounce(function () {
      const text = searchInput.value.toLowerCase();

      const filteredProducts = allProducts.filter(function (product) {
        return (
          product.title.toLowerCase().includes(text) ||
          product.description.toLowerCase().includes(text) ||
          product.brand.toLowerCase().includes(text)
        );
      });

      renderProducts(filteredProducts);
    }, 300)
  );

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      searchInput.value = "";
      renderProducts(allProducts);
    }
  });
}

function renderProducts(products) {
  while (productsList.firstChild) {
    productsList.removeChild(productsList.firstChild);
  }

  if (products.length === 0) {
    showMessage(productsList, "No products found.");
    return;
  }

  products.forEach(function (product) {
    const card = createProductCard(product);
    productsList.appendChild(card);
  });
}

function createProductCard(product) {
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
  category.textContent = product.brand;

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
  button.textContent = checkFavorite(product.id)
    ? "Remove from Favorites"
    : "Add to Favorites";

  button.addEventListener("click", function () {
    addOrRemoveFavorite(product);
    console.log("Favorites added:", favoriteCounter());

    button.textContent = checkFavorite(product.id)
      ? "Remove from Favorites"
      : "Add to Favorites";
  });

  card.appendChild(imageWrapper);
  card.appendChild(category);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(button);

  return card;
}