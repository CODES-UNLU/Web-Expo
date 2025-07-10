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
    pasos[pasoActual].style.display = "block";
    window.scrollTo(0, 0);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(form);
  form.style.display = "none";

  // Pantalla de análisis
  const analizando = document.createElement("div");
  analizando.id = "analizando";
  analizando.innerHTML = `
    <h2>🔍 Analizando tus respuestas...</h2>
    ${generarSVGProcesando()}
  `;
  analizando.style.textAlign = "center";
  analizando.style.padding = "50px";
  analizando.style.fontSize = "1.5em";
  document.body.appendChild(analizando);

  setTimeout(() => {
    // Calcular afinidades
    const puntajes = {
      sistemas: 0,
      comunicacion: 0,
      trabajosocial: 0,
      agronomia: 0,
    };

    for (let i = 1; i <= 12; i++) {
      const val = data.get("q" + i);
      if (val && puntajes.hasOwnProperty(val)) {
        puntajes[val]++;
      }
    }

    const orden = Object.entries(puntajes)
      .sort((a, b) => b[1] - a[1])
      .filter((entry) => entry[1] > 0);

    if (orden.length === 0) {
      textoResultado.textContent =
        "No pudimos determinar tu afinidad. Por favor, intentá nuevamente.";
    } else {
      const maxPuntaje = orden[0][1];
      const carrerasAfinidad = orden
        .filter((entry) => entry[1] === maxPuntaje)
        .map((entry) => {
          switch (entry[0]) {
            case "sistemas":
              return "Licenciatura en Sistemas de Información";
            case "comunicacion":
              return "Carreras de Comunicación y Diseño";
            case "trabajosocial":
              return "Licenciatura en Trabajo Social o Psicopedagogía";
            case "agronomia":
              return "Carreras de Ingeniería Agronómica o afines";
            default:
              return "Otras opciones";
          }
        });

      textoResultado.textContent = `Según tus respuestas, podés tener afinidad con: ${carrerasAfinidad.join(
        ", "
      )}.`;
    }

    analizando.remove();
    resultado.style.display = "block";

    fetch("TU_URL_AQUI", {
      method: "POST",
      body: JSON.stringify({
        email: data.get("email"),
        respuestas: Object.fromEntries(data.entries()),
        sugerencia: textoResultado.textContent,
        timestamp: new Date().toISOString(),
      }),
      headers: { "Content-Type": "application/json" },
    });
  }, 4500); // Tiempo extendido a 4.5 segundos
});

function generarSVGProcesando() {
  return `
    <svg width="150" height="150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradPC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00b3ff" />
          <stop offset="100%" stop-color="#003366" />
        </linearGradient>
        <filter id="pulse" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5">
            <animate attributeName="stdDeviation" values="1.5;3;1.5" dur="1.5s" repeatCount="indefinite"/>
          </feGaussianBlur>
        </filter>
      </defs>

      <!-- Monitor -->
      <rect x="40" y="40" width="120" height="80" rx="10" fill="url(#gradPC)" stroke="#fff" stroke-width="2" filter="url(#pulse)" />

      <!-- Base del monitor -->
      <rect x="85" y="125" width="30" height="10" fill="#003366" />
      <rect x="75" y="135" width="50" height="5" rx="2" fill="#555" />

      <!-- Barras animadas (datos) centradas -->
      <rect x="65" y="60" width="10" height="30" fill="#fff">
        <animate attributeName="height" values="30;50;30" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="y" values="60;40;60" dur="1.2s" repeatCount="indefinite" />
      </rect>
      <rect x="85" y="65" width="10" height="25" fill="#fff">
        <animate attributeName="height" values="25;45;25" dur="1.4s" repeatCount="indefinite" />
        <animate attributeName="y" values="65;45;65" dur="1.4s" repeatCount="indefinite" />
      </rect>
      <rect x="105" y="55" width="10" height="35" fill="#fff">
        <animate attributeName="height" values="35;55;35" dur="1.3s" repeatCount="indefinite" />
        <animate attributeName="y" values="55;35;55" dur="1.3s" repeatCount="indefinite" />
      </rect>
      <rect x="125" y="70" width="10" height="20" fill="#fff">
        <animate attributeName="height" values="20;40;20" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="y" values="70;50;70" dur="1.5s" repeatCount="indefinite" />
      </rect>
    </svg>
  `;
}
