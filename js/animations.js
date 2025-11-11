document.addEventListener("DOMContentLoaded", () => {
  const seal = document.getElementById("seal");
  const scene = document.querySelector(".scene");
  const invitation = document.getElementById("invitation");
  const sections = invitation?.querySelectorAll("section") || [];
  const firefliesContainer = document.querySelector(".hero-fireflies");
  const fireflies = []; 
  const heroBg = document.querySelector(".inv-hero .hero-bg");

  // ===================== GENERAR LUCiÉRNAGAS SUPERIORES =====================
  for (let i = 0; i < 11; i++) {
    const f = document.createElement("div");
    f.className = "firefly";
    f.style.top = Math.random() * 30 + "%";
    f.style.left = Math.random() * 100 + "%";
    const size = Math.random() * 6 + 10; // 10px a 16px
    f.style.width = `${size}px`;
    f.style.height = `${size}px`;
    firefliesContainer.appendChild(f);

    fireflies.push({
      el: f,
      x: parseFloat(f.style.left),
      y: parseFloat(f.style.top),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      opacityDir: Math.random() < 0.4 ? 1 : -1
    });
  }

  function animateFireflies() {
    fireflies.forEach(f => {
      f.x += f.dx;
      f.y += f.dy;

      if (f.x < 0 || f.x > 100) f.dx = -f.dx;
      if (f.y < 0 || f.y > 30) f.dy = -f.dy;

      let opacity = parseFloat(f.el.style.opacity || 0.7);
      opacity += 0.01 * f.opacityDir;
      if (opacity > 1 || opacity < 0.5) f.opacityDir *= -1;
      f.el.style.opacity = opacity;

      f.el.style.left = f.x + "%";
      f.el.style.top = f.y + "%";
    });

    requestAnimationFrame(animateFireflies);
  }
  animateFireflies();

  // ===================== GENERAR LUCiÉRNAGAS PARTICULAS =====================
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles";
  document.body.appendChild(particlesContainer);

  const numParticles = 40;
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    const p = document.createElement("div");
    p.className = "p";
    const size = Math.random() * 8 + 8;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.top = Math.random() * 100 + "%";
    p.style.left = Math.random() * 100 + "%";

    const speedX = (Math.random() - 0.5) * 0.1;
    const speedY = (Math.random() - 0.5) * 0.1;

    particlesContainer.appendChild(p);
    particles.push({ el: p, x: parseFloat(p.style.left), y: parseFloat(p.style.top), speedX, speedY });
  }

  function animateParticles() {
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > 100) p.speedX = -p.speedX;
      if (p.y < 0 || p.y > 100) p.speedY = -p.speedY;

      p.el.style.left = p.x + "%";
      p.el.style.top = p.y + "%";
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ===================== CLICK EN SELLO =====================
  seal?.addEventListener("click", async () => {
    if (seal.classList.contains("seal--glow")) return;

    seal.classList.add("seal--glow");

    // Reproducir música
    const music = document.getElementById("bgMusic");
    if (music) music.play().catch(e => console.log("Error reproduciendo música:", e));

    // Flash suave
    const flash = document.createElement("div");
    flash.className = "flash-elegant";
    document.body.appendChild(flash);
    flash.classList.add("active");
    setTimeout(() => flash.remove(), 1000);

    // Ocultar portada
    scene?.classList.add("fade-out");
    await new Promise(res => setTimeout(res, 1200));
    scene.style.display = "none";

    // Ocultar fondo inicial
    const bgWrap = document.querySelector('.bg-wrap');
    if(bgWrap) bgWrap.style.display = 'none';

    // Mostrar invitación
    invitation?.classList.add("show");
    invitation.scrollTop = 0;

    // Aparecer secciones una a una
    sections.forEach((sec, i) => {
      setTimeout(() => {
        sec.classList.add("show");

        if(sec.classList.contains('second-screen')) {
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, i * 400);
    });
  });

  // ===================== ZOOM SUAVE HERO AL SCROLL =====================
  invitation?.addEventListener("scroll", () => {
    if(!heroBg) return;
    const scrollY = invitation.scrollTop;
    const scale = 1 + Math.min(scrollY / 1000, 0.2); // zoom hasta 20%
    heroBg.style.transform = `scale(${scale})`;
  });
});







// Generar pétalos dinámicamente
const petalsContainer = document.getElementById('petals-container');
const totalPetals = 4; // más pétalos para realismo

for (let i = 0; i < totalPetals; i++) {
  const petal = document.createElement('div');
  petal.classList.add('petal');

  // posición horizontal aleatoria
  petal.style.left = Math.random() * 100 + '%';

  // duración más lenta y aleatoria
  const duration = 12 + Math.random() * 6; // 12 a 18s
  const delay = Math.random() * 8; // retraso aleatorio
  petal.style.animationDuration = duration + 's';
  petal.style.animationDelay = delay + 's';

  // tamaño aleatorio
  const scale = 0.8 + Math.random() * 0.5; // 0.8 a 1.3
  petal.style.transform = `scale(${scale})`;

  petalsContainer.appendChild(petal);
}





// ===================== CARGAR DATOS DEL INVITADO DESDE GOOGLE APPS SCRIPT =====================
async function cargarInvitado() {
  // Tomar el código de la URL (ejemplo: ?codigo=A001)
  const params = new URLSearchParams(window.location.search);
  const codigo = params.get("codigo");

  if (!codigo) return;

  try {
    // Llamar a tu script publicado en Google Apps Script
    const url = `https://script.google.com/macros/s/AKfycbyHIeggVUWoaoRhaaZ_hMC06rfkmBm3hEVCTiY7Fo9GXlsFXz3ntVjsz9yfo4h4wB9I/exec?codigo=${codigo}`; // cambia por tu URL real
    
   
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      console.error("Error:", data.error);
      return;
    }

    // Mostrar datos en la invitación
    document.getElementById("guestName").textContent = data.nombre || "Invitado especial";
    document.getElementById("guestPasses").textContent = `Número de pases: ${data.pases || 0}`;
  } catch (err) {
    console.error("Error al cargar invitado:", err);
  }
}

document.addEventListener("DOMContentLoaded", cargarInvitado);
