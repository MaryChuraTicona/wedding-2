
/* ======= Carrusel (solo avanza) ======= */
(function(){
  const track = document.querySelector('#gallery .carousel-track');
  if(!track) return;

  const slides = Array.from(track.children);
  const nextButton = document.querySelector('#gallery .next');
  // Si mantienes el botón prev, también funcionará:
  const prevButton = document.querySelector('#gallery .prev');

  let index = 0;
  let autoSlide;

  function showSlide(i){
    index = (i + slides.length) % slides.length;   // bucle
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform  = `translateX(-${index * 100}%)`;
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
  }
  function nextSlide(){ showSlide(index + 1); }

  nextButton && nextButton.addEventListener('click', ()=>{ nextSlide(); resetAutoSlide(); });
  // Si NO quieres retroceder, comenta estas 2 líneas:
  prevButton && prevButton.addEventListener('click', ()=>{ showSlide(index - 1); resetAutoSlide(); });

  function startAutoSlide(){ autoSlide = setInterval(nextSlide, 6000); }
  function resetAutoSlide(){ clearInterval(autoSlide); startAutoSlide(); }
  startAutoSlide();

  /* ======= Lightbox ======= */
  const lb = document.getElementById('gallery-lightbox');
  const lbImg = lb.querySelector('.lb-image');
  const lbPrev = lb.querySelector('.lb-prev');
  const lbNext = lb.querySelector('.lb-next');
  const lbClose = lb.querySelector('.lb-close');
  const lbThumbs = lb.querySelector('.lb-thumbs');

  // Recolectar todas las imágenes del carrusel (las <img> dentro de .polaroid)
  const imgs = Array.from(document.querySelectorAll('#gallery .polaroid img'));
  const sources = imgs.map(img => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' }));

  // Crear miniaturas
  lbThumbs.innerHTML = sources.map((o,i)=>`<img data-idx="${i}" src="${o.src}" alt="">`).join('');

  function openLightbox(i){
    current = i;
    updateLightbox();
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  let current = 0;
  function updateLightbox(){
    const obj = sources[(current + sources.length) % sources.length];
    lbImg.src = obj.src;
    lbImg.alt = obj.alt;
    // marcar miniatura activa
    lbThumbs.querySelectorAll('img').forEach(t => t.classList.remove('active'));
    const act = lbThumbs.querySelector(`img[data-idx="${(current + sources.length)%sources.length}"]`);
    act && act.classList.add('active');
  }

  function nextLB(){ current = (current + 1) % sources.length; updateLightbox(); }
  function prevLB(){ current = (current - 1 + sources.length) % sources.length; updateLightbox(); }

  // Abrir al hacer click en cualquier imagen del carrusel
  imgs.forEach((img,i)=>{
    img.addEventListener('click', ()=> openLightbox(i));
  });

  // Controles
  lbNext.addEventListener('click', nextLB);
  lbPrev.addEventListener('click', prevLB);
  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', e=>{ if(e.target === lb) closeLightbox(); });

  // Teclado
  document.addEventListener('keydown', e=>{
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') nextLB();
    if(e.key === 'ArrowLeft')  prevLB();
  });

  // Miniaturas
  lbThumbs.addEventListener('click', e=>{
    const t = e.target.closest('img[data-idx]');
    if(!t) return;
    current = parseInt(t.dataset.idx,10);
    updateLightbox();
  });

  // Swipe básico en lightbox (móvil)
  let sx = null;
  lb.addEventListener('touchstart', e=>{ sx = e.touches[0].clientX; }, {passive:true});
  lb.addEventListener('touchend', e=>{
    if(sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if(Math.abs(dx) > 40) (dx < 0 ? nextLB() : prevLB());
    sx = null;
  }, {passive:true});
})();

