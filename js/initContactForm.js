export function initContactForm() {
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("successMessage");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");

    let isValid = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name) {
      const nameError = document.getElementById("nameError");
      nameError.textContent = "Please enter your name";
      nameError.style.display = "block";
      isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      const emailError = document.getElementById("emailError");
      emailError.textContent = "Please enter a valid email address";
      emailError.style.display = "block";
      isValid = false;
    }

    if (!message) {
      const messageError = document.getElementById("messageError");
      messageError.textContent = "Please enter a message";
      messageError.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending
    setTimeout(() => {
      successMsg.style.display = "block";
      form.reset();
      setTimeout(() => successMsg.style.display = "none", 4000);
    }, 500);
  });
}
