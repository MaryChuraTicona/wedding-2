const items = document.querySelectorAll('.timeline-item');

// Inicializar imágenes más pequeñas al cargar
items.forEach(item => {
  const img = item.querySelector('img');
  if (img) {
    img.style.transform = 'scale(0.8)';   // empieza un poco más pequeña
    img.style.opacity = '0';              // invisible al inicio
    img.style.transition = 'transform 0.7s ease, opacity 0.7s ease';
  }
});

// Función para mostrar items y hacer zoom dinámico
function showItems() {
  const triggerBottom = window.innerHeight / 5 * 4; // cuándo activar

  items.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      item.classList.add('visible'); // hace visible todo el item

      // Hacer zoom dinámico en la imagen del item
      const img = item.querySelector('img');
      if (img && !img.classList.contains('zoomed')) { // evitar repetir animación
        img.classList.add('zoomed');
        setTimeout(() => {
          img.style.transform = 'scale(1)';
          img.style.opacity = '1';
        }, index * 150); // efecto secuencial: 150ms entre cada foto
      }
    }
  });
}

// Event listeners
window.addEventListener('scroll', showItems);
window.addEventListener('load', showItems); // para las fotos que ya estén visibles al cargar
