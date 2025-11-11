document.addEventListener("DOMContentLoaded", () => {
  let nombreInvitado = "Invitado especial";
  let codigoInvitado = null;

  // ===================== CARGAR DATOS DEL INVITADO =====================
  async function cargarInvitado() {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");
    if (!codigo) return;

    try {
      const url = `https://script.google.com/macros/s/AKfycbyHIeggVUWoaoRhaaZ_hMC06rfkmBm3hEVCTiY7Fo9GXlsFXz3ntVjsz9yfo4h4wB9I/exec?codigo=${codigo}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        console.error("Error al obtener invitado:", data.error);
        return;
      }

      nombreInvitado = data.nombre || "Invitado especial";
      codigoInvitado = codigo;

      // Mostrar datos en la página si existen elementos
      const guestNameEl = document.getElementById("guestName");
      const guestPassesEl = document.getElementById("guestPasses");
      if (guestNameEl) guestNameEl.textContent = nombreInvitado;
      if (guestPassesEl) guestPassesEl.textContent = `Número de pases: ${data.pases || 0}`;

    } catch (err) {
      console.error("Error al cargar invitado:", err);
    }
  }

  cargarInvitado();

  // ===================== CONFIRMAR ASISTENCIA =====================
  const botones = document.querySelectorAll('.btn-asistira');
  const confirmSection = document.getElementById('confirmSection');
  const tituloConfirm = document.getElementById('tituloConfirm') || confirmSection.querySelector('h2');
  const mensajeInicial = document.getElementById('mensaje-inicial');
  const seleccionAsistencia = document.getElementById('seleccion-asistencia');
  const graciasMessage = document.getElementById('graciasMessage');
  const graciasTitulo = document.getElementById('graciasTitulo');
  const graciasTexto = document.getElementById('graciasTexto');

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyHIeggVUWoaoRhaaZ_hMC06rfkmBm3hEVCTiY7Fo9GXlsFXz3ntVjsz9yfo4h4wB9I/exec";

  botones.forEach(btn => {
    btn.addEventListener('click', async () => {
      const accion = btn.getAttribute('data-value'); // "si" o "no"

      if (!codigoInvitado) {
        alert("No se ha detectado el código del invitado.");
        return;
      }

      try {
        // Enviar confirmación al Google Sheet
        const url = `${WEB_APP_URL}?codigo=${codigoInvitado}&accion=${accion}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
          alert("❌ Error al registrar la asistencia.");
          console.error(data.error);
          return;
        }

        // Ocultar títulos y botones
        tituloConfirm.style.display = 'none';
        if (mensajeInicial) mensajeInicial.style.display = 'none';
        if (seleccionAsistencia) seleccionAsistencia.style.display = 'none';

        // Mostrar mensaje de gracias con fondo activo
        graciasMessage.style.display = 'block';
        confirmSection.classList.add('fondo-activo');

        // Mensaje personalizado según la respuesta
        if (accion === "si") {
          graciasTitulo.textContent = `¡Gracias ${nombreInvitado}!`;
          graciasTexto.textContent = "Este día los esperamos con mucha alegría.";
        } else {
          graciasTitulo.textContent = `Gracias por avisar, ${nombreInvitado}`;
          graciasTexto.textContent = "Lamentamos que no puedas acompañarnos, pero siempre estarás en nuestros corazones. 💌";
        }

      } catch (err) {
        alert("❌ Error al conectar con la hoja.");
        console.error(err);
      }
    });
  });
});
