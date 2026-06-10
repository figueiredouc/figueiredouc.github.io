// Nav border on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(
  '.section-label, h2, .about-bio p, .skills-group, .project-card, .contact-link, .hero-sub, .hero-links'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
