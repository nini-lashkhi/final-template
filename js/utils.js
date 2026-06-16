export function showMessage(place, text) {
  while (place.firstChild) {
    place.removeChild(place.firstChild);
  }

  const p = document.createElement("p");
  p.className = "message";
  p.textContent = text;
  place.appendChild(p);
}

export function showFormMessage(form, text, type) {
  let message = form.querySelector(".form-message");

  if (!message) {
    message = document.createElement("p");
    message.className = "form-message";
    form.appendChild(message);
  }

  message.textContent = text;
  message.className = "form-message " + type;
}

export function debounce(callback, time) {
  let timer;

  return function () {
    clearTimeout(timer);
    const args = arguments;

    timer = setTimeout(function () {
      callback.apply(null, args);
    }, time);
  };
}

export function createCounter() {
  let count = 0;

  return function () {
    count = count + 1;
    return count;
  };
}