// ================================
// initEmailProtection.js
// Simple click-to-reveal — no external script dependency
// ================================
export function initEmailProtection() {
  const btn = document.getElementById('email-reveal-btn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // Email is assembled in JS to deter HTML-scraping bots
    const parts = ['kpandey', 'sissa', 'it'];
    const mail  = parts[0] + '@' + parts[1] + '.' + parts[2];

    const link = document.createElement('a');
    link.href      = 'mailto:' + mail;
    link.textContent = mail;
    link.className = 'text-blue-500 dark:text-blue-400 hover:underline';

    btn.replaceWith(link);
  });
}
