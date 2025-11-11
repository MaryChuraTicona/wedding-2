// Script para animar solo cuando se vea la sección
document.addEventListener("DOMContentLoaded", function() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Para que solo se ejecute una vez
      }
    });
  }, { threshold: 0.2 }); // 20% visible para activar

  // Selecciona todos los elementos que quieres animar
  document.querySelectorAll('.family-block, .family-footer p, .group-title, .family-content p').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
});
