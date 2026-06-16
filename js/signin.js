import { getUser } from "./storage.js";
import { showFormMessage } from "./utils.js";

const signinForm = document.querySelector(".auth-card");

if (signinForm) {
  signinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const savedUser = getUser();
    const formData = new FormData(signinForm);

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      showFormMessage(signinForm, "Please enter email and password.", "error");
      return;
    }

    if (!savedUser) {
      showFormMessage(signinForm, "Account not found. Please sign up first.", "error");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      showFormMessage(signinForm, "Welcome, " + savedUser.name + "!", "success");
      signinForm.reset();
    } else {
      showFormMessage(signinForm, "Email or password is incorrect.", "error");
    }
  });
}