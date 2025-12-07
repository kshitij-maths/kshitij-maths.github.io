// ================================
// initContactForm.js
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

    // Field Validation
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

    //reCAPTCHA Validation ---
    // This gets the token from Google. If empty, the user didn't check the box.
    const captchaResponse = grecaptcha.getResponse();
    
    if (captchaResponse.length === 0) {
      const captchaError = document.getElementById("messageError"); 
      captchaError.textContent = "Please verify you are not a robot.";
      captchaError.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // 3. Send via EmailJS
    const sendBtn = form.querySelector('.send-btn');
    const originalBtnText = sendBtn.textContent;
    sendBtn.textContent = "Sending...";
    sendBtn.disabled = true;

    // --- CONFIGURATION ---
    const serviceID = "service_p2j1kfl";
    const templateID = "template_o8qipet";

    const templateParams = {
      name: name,
      email: email,
      message: message,
      'g-recaptcha-response': captchaResponse // Send token to EmailJS for verification
    };

    emailjs.send(serviceID, templateID, templateParams)
      .then(() => {
        // Success
        successMsg.textContent = "Your Message is Sent";
        successMsg.style.display = "block";
        successMsg.style.color = "#166534";
        successMsg.style.backgroundColor = "#dcfce7";
        
        form.reset();
        grecaptcha.reset(); // Reset the captcha so it can be used again
        
        setTimeout(() => successMsg.style.display = "none", 4000);
      })
      .catch((error) => {
        console.error('FAILED...', error);
        
        let errorText = "Failed to send message.";
        // Check for specific error text regarding limits or security
        if (error.text && error.text.includes("limit")) {
             errorText = "Monthly limit reached. Please email me directly.";
        }
        // Check for reCAPTCHA specific error
        if (error.text && error.text.includes("reCAPTCHA")) {
             errorText = "reCAPTCHA verification failed. Please try again.";
        }

        successMsg.textContent = errorText;
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