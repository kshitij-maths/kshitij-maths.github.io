export function initNavigation() {
  const links = document.querySelectorAll(".top-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mobileMenu");
      if (menu) menu.classList.add("hidden");
    });
  });
}
