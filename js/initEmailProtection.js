// ================================
// initEmailProtection.js
// ================================
export function initEmailProtection() {
  const btn = document.getElementById('email-reveal-btn');
  const container = document.getElementById('secure-email-container');
  const captchaBox = document.getElementById('email-captcha-box'); 

  if (!btn || !container || !captchaBox) return;

  document.addEventListener('click', (e) => {
    if (captchaBox.style.display === 'block' && 
        !container.contains(e.target)) {
      captchaBox.style.display = 'none';
      btn.style.display = 'inline-block';
      grecaptcha.reset();
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof grecaptcha === 'undefined') {
      alert("Security check is loading... please try again.");
      return;
    }

    btn.style.display = 'none';
    captchaBox.style.display = 'block';

    captchaBox.innerHTML = ''; 

    try {
      grecaptcha.render(captchaBox, {
        'sitekey': '6LezRCQsAAAAAEHBalDdbup4up_jMhgh4XPZz3hE',
        'callback': function(response) {
          const u = 'kpandey';
          const d = 'sissa.it';
          const mail = u + '@' + d;

          captchaBox.style.display = 'none';
          
          const link = document.createElement('a');
          link.href = `mailto:${mail}`;
          // Added 'unselectable-email' class here
          link.className = "text-blue-500 dark:text-blue-400 hover:underline unselectable-email";
          link.textContent = mail;
          
          btn.replaceWith(link);
        }
      });
    } catch (err) {
      console.error("Captcha render error:", err);
    }
  });
}