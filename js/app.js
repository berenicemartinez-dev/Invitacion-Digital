const sobre = document.querySelector(".sobre");
const contenedor = document.querySelector(".sobre-container");
const invitacion = document.querySelector(".invitacion");
const audio = document.getElementById("musica");
const abrirBtn = document.getElementById("abrirBtn");
const loader = document.getElementById("loader");
/* enlace para el formulario y traer el nombre del invitado */
const params = new URLSearchParams(window.location.search);
const nombre = params.get("nombre");

const nombreElemento = document.getElementById("nombreInvitado");
const mensajeElemento = document.getElementById("mensajeInvitacion");
  /* boton para la musica  */
const btn = document.getElementById("btnPlay");
const progreso = document.getElementById("progreso");
const formBase = "https://docs.google.com/forms/d/e/1FAIpQLSeM54Q7NX_DiJJec_pzC0yGckE6zcGxubWKhom8X0Jmc_YY0Q/viewform?usp=preview";
let linkFinal = formBase;

/* --------Parte principal de la invitación------ */
abrirBtn.addEventListener("click", () => {
  // mostrar loader
  loader.classList.add("mostrar");
  // animacion sobre
  sobre.classList.add("abriendo");

  setTimeout(() => {
    // ocultar sobre
    contenedor.style.display = "none";
    // ocultar loader
    loader.style.display = "none";
    // mostrar invitacion
    invitacion.classList.add("mostrar");
  }, 1500);
  // reproducir musica
  audio.play().catch(() => {
    console.log("El navegador bloqueó el autoplay");
  });
});


//------------------------------
document.addEventListener("DOMContentLoaded", () => {

  /* ---------Nombre dinamico para la tarjeta principal-------- */
  if(nombre){
    nombreElemento.textContent = nombre;
  } else {  
    nombreElemento.textContent = "De: Daniela y Carlos";
  }
  mensajeElemento.textContent = "Eres muy especial para nosotros por eso queremos que seas parte de esta gran celebracion";
  
  /* ----------------reproducción de musica ----------------*/
  audio.volume = 0.1;

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = "⏸";
    } else {
      audio.pause();
      btn.textContent = "▶";
    }
  });

  /*------------ Barra de progreso del sonido --------------*/
  audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
      const porcentaje = (audio.currentTime / audio.duration) * 100;
      progreso.style.width = porcentaje + "%";
    }
  });

  /* ---------------------- link del formulario para personalizar ----------- */
  if (nombre) {
    linkFinal += "&entry.750116087=" + encodeURIComponent(nombre);
  }
  document.getElementById("btnConfirmar").href = linkFinal
});

/* ---------Contador de dias que faltan para el evento ------------ */
//const fechaBoda = new Date("Jul 12, 2026 00:00:00").getTime(); → otra forma de poner la fecha 
const fechaBoda = new Date("2026-07-12T00:00:00").getTime(); //Formato recomendado

const countdown = setInterval(() => {
  const ahora = new Date().getTime();
  const distancia = fechaBoda - ahora;

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;

  if (distancia < 0) {
    clearInterval(countdown);
    document.querySelector(".contador").textContent = "¡Hoy es el gran día!";
  }

}, 1000);
/* sistema de themes */
const themeLink = document.getElementById("theme-style");

function cambiarTema(theme){
  themeLink.href = `./css/themes/${theme}.css`;
}