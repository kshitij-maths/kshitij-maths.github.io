// ================================
// initContactForm.js (Final for GitHub Pages)
// ================================
export function initContactForm() {
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("successMessage");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Clear previous errors
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");

    // 2. Validation Logic
    let isValid = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name) {
      document.getElementById("nameError").textContent = "Please enter your name";
      document.getElementById("nameError").style.display = "block";
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      document.getElementById("emailError").textContent = "Please enter a valid email address";
      document.getElementById("emailError").style.display = "block";
      isValid = false;
    }
    if (!message) {
      document.getElementById("messageError").textContent = "Please enter a message";
      document.getElementById("messageError").style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // 3. Send to Formspree
    const sendBtn = form.querySelector('.send-btn');
    const originalBtnText = sendBtn.textContent;
    sendBtn.textContent = "Sending...";
    sendBtn.disabled = true;

    // Your specific endpoint
    const endpoint = "https://formspree.io/f/xovgnqlv";

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name: name,
        email: email,
        message: message 
      }),
    })
    .then(response => {
      if (response.ok) {
        // Success
        successMsg.textContent = "Your Message is Sent";
        successMsg.style.display = "block";
        successMsg.style.color = "#166534";
        successMsg.style.backgroundColor = "#dcfce7";
        form.reset();
        setTimeout(() => successMsg.style.display = "none", 4000);
      } else {
        // Error from Formspree
        return response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            throw new Error(data.errors.map(error => error.message).join(", "));
          } else {
            throw new Error('Oops! There was a problem submitting your form');
          }
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      successMsg.textContent = "Failed to send: " + error.message;
      successMsg.style.display = "block";
      successMsg.style.color = "#991b1b";
      successMsg.style.backgroundColor = "#fee2e2";
    })
    .finally(() => {
      sendBtn.textContent = originalBtnText;
      sendBtn.disabled = false;
    });
  });
}