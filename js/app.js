// Revela elementos .reveal cuando entran a viewport
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0){
    // Fallback: mostrar todo
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  els.forEach(el => io.observe(el));
})();






/* ============================
   1) Cuenta regresiva
   Cambia la fecha/hora abajo:
============================ */
(function(){
  // 23 Nov 2025 - 16:00 (Lima -05:00). Ajusta a tu hora.
  const TARGET = new Date('2025-11-23T16:00:00-05:00').getTime();

  const $ = id => document.getElementById(id);
  const daysEl = $('days'), hoursEl = $('hours'), minutesEl = $('minutes'), secondsEl = $('seconds');

  if(!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const pad = n => String(n).padStart(2,'0');

  function tick(){
    const now = Date.now();
    let dist = TARGET - now;

    if(dist <= 0){
      daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '00';
      return;
    }
    const d = Math.floor(dist / 86400000); dist -= d*86400000;
    const h = Math.floor(dist / 3600000);  dist -= h*3600000;
    const m = Math.floor(dist / 60000);    dist -= m*60000;
    const s = Math.floor(dist / 1000);

    daysEl.textContent    = pad(d);
    hoursEl.textContent   = pad(h);
    minutesEl.textContent = pad(m);
    secondsEl.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
})();

/* ============================
   2) Animaciones al aparecer
   (sin tocar tu HTML)
============================ */
(function(){
  const section = document.getElementById('countdown');
  if(!section) return;

  // Elementos a observar
  const toReveal = [
    section.querySelector('.countdown-arc'),
    section.querySelector('.calendar'),
    section.querySelector('.timer-arc'),
    section.querySelector('.countdown-content')
  ].filter(Boolean);

  // Fallback si no hay IntersectionObserver
  if(!('IntersectionObserver' in window)){
    toReveal.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  toReveal.forEach(el => io.observe(el));
})();

/* ============================
   3) Estrellitas aleatorias opcionales
============================ */
(function(){
  const container = document.getElementById('countdown');
  if(!container) return;

  // crea 12 estrellas si no existen
  const existing = container.querySelectorAll('.star.auto').length;
  if(existing > 0) return;

  for(let i=0;i<12;i++){
    const s = document.createElement('span');
    s.className = 'star auto';
    s.style.left = Math.random()*90 + '%';
    s.style.top  = Math.random()*60 + '%';
    s.style.setProperty('--x', (Math.random()*30 - 15) + 'px');
    s.style.setProperty('--y', (Math.random()*20 - 10) + 'px');
    s.style.animationDelay = (Math.random()*3).toFixed(2) + 's';
    container.querySelector('.countdown-arc').appendChild(s);
  }
})();



// ==== 1) Reveal para título e ítems ====
(() => {
  const section = document.getElementById('history');
  if(!section) return;

  const title = section.querySelector('h2');
  const items = section.querySelectorAll('.timeline-item');
  const imgs  = section.querySelectorAll('.timeline-left img, .timeline-right img');

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, obs)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            e.target.classList.add('visible');
            // si el target es un item, revela su imagen con un ligero retraso
            if(e.target.classList.contains('timeline-item')){
              const pic = e.target.querySelector('img');
              if(pic){ setTimeout(()=>pic.classList.add('visible'), 120); }
            }
            obs.unobserve(e.target);
          }
        });
      }, { threshold: .2 })
    : null;

  if(io){
    if(title) io.observe(title);
    items.forEach(el => io.observe(el));
    imgs.forEach(img => io.observe(img)); // por si quieres revelar imágenes aunque no estén dentro del item
  }else{
    // fallback
    title && title.classList.add('visible');
    items.forEach(el => el.classList.add('visible'));
    imgs.forEach(img => img.classList.add('visible'));
  }
})();

// ==== 2) Dibujo progresivo de la línea central ====
(() => {
  const section = document.getElementById('history');
  if(!section) return;
  const timeline = section.querySelector('.timeline');
  if(!timeline) return;

  function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }

  function updateLine(){
    const rect = timeline.getBoundingClientRect();
    const viewH = window.innerHeight || document.documentElement.clientHeight;

    // Comienza a dibujar un poco antes de entrar (15% del viewport)
    const start = rect.top - viewH * 0.15;
    const end   = rect.bottom - viewH * 0.10;
    const progress = clamp((viewH - start) / (end - start), 0, 1);

    timeline.style.setProperty('--line-progress', progress.toFixed(3));
  }

  // Primer cálculo + al hacer scroll/resize
  updateLine();
  window.addEventListener('scroll', updateLine, { passive: true });
  window.addEventListener('resize', updateLine);
})();



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));




  // Reveal al entrar en el viewport
  (function(){
    const els = document.querySelectorAll('#wedding-schedule .reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible')); // fallback
      return;
    }
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.15});
    els.forEach(el=>io.observe(el));
  })();





  // Scroll reveal
  (function(){
    const els = document.querySelectorAll('#gallery .reveal');
    if (!('IntersectionObserver' in window)){
      els.forEach(el=>el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, {threshold:0.2});
    els.forEach(el=>obs.observe(el));
  })();




(function(){
  const els = document.querySelectorAll('#dress-code .reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('visible')); return; }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); }
    });
  }, {threshold:0.15});
  els.forEach(e=>io.observe(e));
})();

