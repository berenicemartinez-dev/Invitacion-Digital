const abrirInvitacion = () => {
  const sobre = document.querySelector(".sobre");
  const contenedor = document.querySelector(".sobre-container");
  const invitacion = document.querySelector(".invitacion");

  // animar sobre
  sobre.classList.add("abriendo");

  setTimeout(() => {
    contenedor.style.display = "none";
    invitacion.style.display = "block";

    // pequeño delay para que se vea bonito
    setTimeout(() => {
      invitacion.classList.add("mostrar");
    }, 50);

  }, 600);
 
  const musica = document.getElementById("musica");
  musica.play().catch(() => {
    console.log("El navegador bloqueó el autoplay");
  });

};

document.getElementById("abrirBtn").addEventListener("click", abrirInvitacion);

// opcional: sello también abre
const sello = document.getElementById("sello");
if (sello) {
  sello.addEventListener("click", abrirInvitacion);
}

//------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const nombre = params.get("nombre");

  const nombreElemento = document.getElementById("nombreInvitado");
  const mensajeElemento = document.getElementById("mensajeInvitacion");
  const audio = document.getElementById("musica");
  const btn = document.getElementById("btnPlay");
  const progreso = document.getElementById("progreso");
  

  /* Nombre dinamico para la tarjeta principal */
  if(nombre){
    nombreElemento.textContent = nombre;
  } else {  
    nombreElemento.textContent = "De: Berenice y Luis";
  }
  mensajeElemento.textContent = "Eres muy especial para nosotros por eso queremos que seas parte de esta gran celebracion";
  
  /* reproduccion de musica */
  audio.volume = 0.3;

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = "⏸";
    } else {
      audio.pause();
      btn.textContent = "▶";
    }
  });

  /* Barra de progreso del sonido */
  audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
      const porcentaje = (audio.currentTime / audio.duration) * 100;
      progreso.style.width = porcentaje + "%";
    }
  });
});


const fechaBoda = new Date("Oct 17, 2026 00:00:00").getTime();

const countdown = setInterval(() => {
  const ahora = new Date().getTime();
  const distancia = fechaBoda - ahora;

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("dias").innerHTML = dias;
  document.getElementById("horas").innerHTML = horas;
  document.getElementById("minutos").innerHTML = minutos;
  document.getElementById("segundos").innerHTML = segundos;

  if (distancia < 0) {
    clearInterval(countdown);
    document.querySelector(".contador").innerHTML = "¡Hoy es el gran día!";
  }

}, 1000);


document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const nombre = params.get("nombre");

  const formBase = "https://docs.google.com/forms/d/e/1FAIpQLSd4KpJRaWAQDHsJrEnR19OoLFVb4DptZMEIYstfX-uTH25rMQ/viewform?usp=pp_url";

  let linkFinal = formBase;

  if (nombre) {
    linkFinal += "&entry.750116087=" + encodeURIComponent(nombre);
  }
  document.getElementById("btnConfirmar").href = linkFinal
});