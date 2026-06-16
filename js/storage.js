const FAVORITES_KEY = "lumi_favorites";
const USER_KEY = "lumi_user";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function addOrRemoveFavorite(product) {
  const favorites = getFavorites();
  const exists = favorites.find(function (item) {
    return item.id === product.id;
  });

  let updatedFavorites;

  if (exists) {
    updatedFavorites = favorites.filter(function (item) {
      return item.id !== product.id;
    });
  } else {
    updatedFavorites = favorites.concat(product);
  }

  saveFavorites(updatedFavorites);
}

export function checkFavorite(id) {
  const favorites = getFavorites();

  return favorites.some(function (item) {
    return item.id === id;
  });
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}