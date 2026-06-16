import { saveUser } from "./storage.js";
import { showFormMessage } from "./utils.js";

const signupForm = document.querySelector(".auth-card");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(signupForm);

    const name = formData.get("fullname");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const terms = formData.get("terms");

    if (!name || !email || !password || !confirmPassword) {
      showFormMessage(signupForm, "Please fill all required fields.", "error");
      return;
    }

    if (!email.includes("@")) {
      showFormMessage(signupForm, "Please enter a valid email.", "error");
      return;
    }

    if (password.length < 8) {
      showFormMessage(signupForm, "Password must be at least 8 characters.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showFormMessage(signupForm, "Passwords do not match.", "error");
      return;
    }

    if (!terms) {
      showFormMessage(signupForm, "Please agree to the terms.", "error");
      return;
    }

    saveUser({
      name: name,
      email: email,
      password: password
    });

    showFormMessage(signupForm, "Account created successfully.", "success");
    signupForm.reset();
  });
}