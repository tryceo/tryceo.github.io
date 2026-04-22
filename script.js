const revealElements = document.querySelectorAll("[data-reveal]");
const header = document.querySelector(".site-header");

revealElements.forEach((element) => {
  const delay = element.dataset.revealDelay;

  if (delay) {
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -32px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (header) {
  const syncHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });
}

if (window.matchMedia("(pointer: fine)").matches) {
  const tiltElements = document.querySelectorAll("[data-tilt]");

  tiltElements.forEach((element) => {
    const resetTilt = () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--tilt-scale", "1");
      element.style.setProperty("--glow-x", "50%");
      element.style.setProperty("--glow-y", "20%");
    };

    resetTilt();

    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 8;

      element.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      element.style.setProperty("--tilt-scale", "1.01");
      element.style.setProperty("--glow-x", `${(x * 100).toFixed(1)}%`);
      element.style.setProperty("--glow-y", `${(y * 100).toFixed(1)}%`);
    });

    element.addEventListener("pointerleave", resetTilt);
    element.addEventListener("pointercancel", resetTilt);
  });
}

const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
