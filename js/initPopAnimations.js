export function initPopAnimations() {
    const elements = document.querySelectorAll(".animate-pop");
    elements.forEach(el => {
        // Simple pop-in animation
        el.style.transform = "scale(0.8)";
        el.style.opacity = 0;
        el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        setTimeout(() => {
            el.style.transform = "scale(1)";
            el.style.opacity = 1;
        }, 50);

        // Optional: pop-out on leave (if you want)
        // You could use IntersectionObserver here
    });
}

// Expose globally
window.initPopAnimations = initPopAnimations;
