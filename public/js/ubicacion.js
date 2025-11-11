
(() => {
  const buttons = document.querySelectorAll('#location .btn-map');
  const modal = document.getElementById('map-modal');
  const iframe = document.getElementById('modal-iframe');
  const closeBtn = document.getElementById('close-modal');
  const addressDiv = document.getElementById('map-address');
  const openInMaps = document.getElementById('open-in-maps');
  const directionsBtn = document.getElementById('directions-btn');

  if (!modal || !iframe || !closeBtn || !addressDiv || !openInMaps || !directionsBtn) return;

  let lastTrigger = null; // para devolver el foco

  // Convierte un URL de embed a vista normal (fallback si no hay data-link)
  function embedToView(url = "") {
    try {
      if (!url) return "";
      // Casos típicos: /maps/embed?  ->  /maps?  (quita "embed")
      return url.replace(/\/embed\?/i, '/?');
    } catch { return url; }
  }

  // Construye URL "Abrir en Google Maps"
  function buildOpenUrl(address, link, embed) {
    if (link) return link;
    const fromEmbed = embedToView(embed);
    if (fromEmbed) return fromEmbed;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || "")}`;
  }

  // Construye URL "Cómo llegar" (deja origin vacío para que el dispositivo lo ponga)
  function buildDirectionsUrl(address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address || "")}`;
  }

  function openModal({ mapSrc, addressText, link, embed }) {
    iframe.src = mapSrc || '';
    addressDiv.textContent = addressText || '';

    openInMaps.href = buildOpenUrl(addressText, link, embed);
    directionsBtn.href = buildDirectionsUrl(addressText);

    modal.style.display = 'flex';
    modal.scrollTop = 0;
    requestAnimationFrame(() => {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      // Mueve el foco al botón cerrar para accesibilidad
      closeBtn.focus({ preventScroll: true });
    });
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.style.display = 'none';
      iframe.src = '';
      addressDiv.textContent = '';
      openInMaps.removeAttribute('href');
      directionsBtn.removeAttribute('href');
      // Devuelve el foco al botón que abrió
      if (lastTrigger && typeof lastTrigger.focus === 'function') {
        lastTrigger.focus({ preventScroll: true });
      }
    }, 250);
  }

  // Click en botones
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      lastTrigger = btn;
      const mapSrc = btn.getAttribute('data-map') || '';
      const mapLink = btn.getAttribute('data-link') || '';
      const addressText = btn.getAttribute('data-address') || '';

      openModal({
        mapSrc,
        addressText,
        link: mapLink,
        embed: mapSrc
      });
    });
  });

  // Cerrar
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  // Evita que el clic dentro del contenido cierre el modal
  modal.querySelector('.modal-content')?.addEventListener('click', e => e.stopPropagation());

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show') && (e.key === 'Escape' || e.key === 'Esc')) {
      closeModal();
    }
  });
})();

