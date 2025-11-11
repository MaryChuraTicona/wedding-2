// Countdown
(function () {
  const targetDate = new Date(Date.UTC(2025, 10, 23, 19, 0, 0)); // 23 Nov 2025 14:00 Perú

  const timerContainer = document.getElementById('timer');

  const pad = n => String(n).padStart(2,'0');

  function updateCountdown() {
    const now = new Date();
    const nowUtc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const diff = targetDate.getTime() - nowUtc;

    if (diff <= 0) {
      if(timerContainer) timerContainer.innerHTML = "<p>¡Llegó el gran día! 🎉💍</p>";
      return;
    }

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);

    if(timerContainer) {
      timerContainer.innerHTML = `
        <div class="time-box"><span class="num">${days}</span><span class="label">Días</span></div>
        <div class="time-box"><span class="num">${pad(hours)}</span><span class="label">Horas</span></div>
        <div class="time-box"><span class="num">${pad(minutes)}</span><span class="label">Minutos</span></div>
        <div class="time-box"><span class="num">${pad(seconds)}</span><span class="label">Segundos</span></div>
      `;
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
})();

// Luciérnagas mágicas
(function(){
  const arc = document.querySelector('.countdown-arc');
  const numFireflies = 15;

  for(let i=0; i<numFireflies; i++){
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');

    const top = Math.random() * (arc.clientHeight-10);
    const left = Math.random() * (arc.clientWidth-10);
    firefly.style.top = `${top}px`;
    firefly.style.left = `${left}px`;

    firefly.style.setProperty('--scale', (Math.random()*0.8 + 0.6).toFixed(2));
    firefly.style.setProperty('--x1', `${Math.random()*6-3}px`);
    firefly.style.setProperty('--y1', `${Math.random()*6-3}px`);
    firefly.style.setProperty('--x2', `${Math.random()*6-3}px`);
    firefly.style.setProperty('--y2', `${Math.random()*6-3}px`);
    firefly.style.setProperty('--x3', `${Math.random()*6-3}px`);
    firefly.style.setProperty('--y3', `${Math.random()*6-3}px`);

    firefly.style.animationDuration = `${(Math.random()*3 + 3).toFixed(2)}s`;
    firefly.style.animationDelay = `${(Math.random()*4).toFixed(2)}s`;

    arc.appendChild(firefly);
  }
})();
