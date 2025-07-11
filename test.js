const btnIniciar = document.getElementById("btnIniciar");
const inicio = document.getElementById("inicio");
const form = document.getElementById("testForm");
const pasos = document.querySelectorAll(".paso");
const resultado = document.getElementById("resultado");
const textoResultado = document.getElementById("textoResultado");

let pasoActual = 0;

btnIniciar.addEventListener("click", () => {
  inicio.style.display = "none";
  form.style.display = "block";
  pasos[pasoActual].style.display = "block";
});

document.querySelectorAll(".siguiente").forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentPaso = pasos[pasoActual];
    const inputs = currentPaso.querySelectorAll("input[type='radio']");
    const checked = Array.from(inputs).some((input) => input.checked);
    if (!checked) {
      alert("Seleccioná una opción antes de continuar");
      return;
    }
    currentPaso.style.display = "none";
    pasoActual++;
    if (pasoActual < pasos.length) {
      pasos[pasoActual].style.display = "block";
      window.scrollTo(0, 0);
    }
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = new FormData(form);
  form.style.display = "none";

  const analizando = document.createElement("div");
  analizando.id = "analizando";
  analizando.innerHTML = `
    <h2>🔍 Analizando tus respuestas...</h2>
    ${generarSVGProcesando()}
    <p>Esto puede tardar unos segundos, por favor espera.</p>
  `;
  analizando.style.textAlign = "center";
  analizando.style.padding = "50px";
  analizando.style.fontSize = "1.5em";
  document.body.appendChild(analizando);

  setTimeout(() => {
    let puntajes = { sistemas: 0, datos: 0 };
    let ningunoCount = 0;

    for (let i = 1; i <= 10; i++) {
      const val = data.get("q" + i);
      if (val === "sistemas") puntajes.sistemas++;
      else if (val === "datos") puntajes.datos++;
      else if (val === "ambos") {
        puntajes.sistemas += 0.5;
        puntajes.datos += 0.5;
      } else if (val === "ninguno") {
        ningunoCount++;
      }
    }

    analizando.remove();
    resultado.style.display = "block";

    const totalPreguntas = 10;
    const respuestasConAfinidad = totalPreguntas - ningunoCount;
    const afinidadTotal = puntajes.sistemas + puntajes.datos;

    // Mostrar mensaje de "no match" si más de la mitad son "ninguno" o si la afinidad total es baja
    if (ningunoCount >= 5 || afinidadTotal <= 4) {
      textoResultado.innerHTML = `
        <h2>😅 ¡Todavía no hiciste match con ninguna carrera!</h2>
        <p>Capaz sos un alma libre, o quizás... ¡un unicornio multidisciplinario! 🦄</p>
        <p>No te preocupes, explorá la <strong>Expo UNLu</strong> y descubrí otras áreas donde puede estar tu talento oculto ✨</p>
        <p>🙌 A veces, la vocación se encuentra cuando menos lo esperás.</p>
      `;
      return;
    }

    const porcSistemas = Math.round((puntajes.sistemas / respuestasConAfinidad) * 100);
    const porcDatos = Math.round((puntajes.datos / respuestasConAfinidad) * 100);

    const hearts = (p) => {
      const count = Math.round(p / 20);
      return "❤️".repeat(count) + "🤍".repeat(5 - count);
    };

    textoResultado.innerHTML = `
      <h3>Tu afinidad con las carreras es:</h3>
      <p><strong>Licenciatura en Sistemas de Información:</strong> ${porcSistemas}% ${hearts(porcSistemas)}</p>
      <p><strong>Ciencia de Datos:</strong> ${porcDatos}% ${hearts(porcDatos)}</p>
      <p>Respuestas sin afinidad específica: ${ningunoCount}</p>
      <p>¡Gracias por completar el test! Explorá la Expo y descubrí tu vocación 💫</p>
    `;
  }, 3500);
});

function generarSVGProcesando() {
  return `
    <svg width="150" height="150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradPC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00b3ff" />
          <stop offset="100%" stop-color="#003366" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="40" y="40" width="120" height="80" rx="10" fill="url(#gradPC)" stroke="#fff" stroke-width="2" filter="url(#glow)" />
      <rect x="85" y="125" width="30" height="10" fill="#003366" />
      <rect x="75" y="135" width="50" height="5" rx="2" fill="#555" />
      <g transform="translate(100,80)">
        <circle r="18" fill="none" stroke="#ffffff33" stroke-width="4"/>
        <circle r="18" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="90" stroke-dashoffset="0">
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="1s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  `;
}
