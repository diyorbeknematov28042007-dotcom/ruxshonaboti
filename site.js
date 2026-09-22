const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.13 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.closest("figure")?.classList.add("image-error");
    img.alt = img.alt + " — surat yuklanmadi";
  }, { once: true });
});
