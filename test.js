const btnIniciar = document.getElementById("btnIniciar");
const inicio = document.getElementById("inicio");
const form = document.getElementById("testForm");
const pasos = document.querySelectorAll(".paso");
const resultado = document.getElementById("resultado");
const resultadoContenido = document.getElementById("resultado-contenido");

let pasoActual = 0;

btnIniciar.addEventListener("click", () => {
  inicio.style.display = "none";
  form.style.display = "block";
  pasos[pasoActual].style.display = "block";
});

// Navegación automática al seleccionar una respuesta
document.querySelectorAll("input[type='radio']").forEach((radio) => {
  radio.addEventListener("change", () => {
    setTimeout(() => {
      const currentPaso = pasos[pasoActual];
      const inputs = currentPaso.querySelectorAll("input[type='radio']");
      const checked = Array.from(inputs).some((input) => input.checked);
      
      if (checked) {
        currentPaso.style.display = "none";
        pasoActual++;
        
        if (pasoActual < pasos.length) {
          pasos[pasoActual].style.display = "block";
          window.scrollTo(0, 0);
        } else {
          // Mostrar pantalla de procesamiento cuando se completa el test
          form.style.display = "none";
          document.getElementById("procesando").style.display = "block";
          
          // Procesar resultados después de 1.5 segundos
          setTimeout(() => {
            procesarResultados();
          }, 1500);
        }
      }
    }, 300); // Pequeña pausa para que se vea la selección
  });
});

// Función para procesar resultados
function procesarResultados() {
  document.getElementById("procesando").style.display = "none";
  
  // Procesar resultados inmediatamente
  let puntajes = { sistemas: 0, datos: 0 };
  let ningunoCount = 0;

  for (let i = 1; i <= 10; i++) {
    const val = document.querySelector(`input[name="q${i}"]:checked`)?.value;
    if (val === "sistemas") puntajes.sistemas++;
    else if (val === "datos") puntajes.datos++;
    else if (val === "ambos") {
      puntajes.sistemas += 0.5;
      puntajes.datos += 0.5;
    } else if (val === "ninguno") {
      ningunoCount++;
    }
  }

  resultado.style.display = "block";

    const totalPreguntas = 10;
    const respuestasConAfinidad = totalPreguntas - ningunoCount;
    const afinidadTotal = puntajes.sistemas + puntajes.datos;

    // Mostrar mensaje de "no match" si más de la mitad son "ninguno" o si la afinidad total es baja
    if (ningunoCount >= 5 || afinidadTotal <= 4) {
      resultadoContenido.innerHTML = `
        <h2><i class="fas fa-unicorn"></i> ¡Todavía no hiciste match con ninguna carrera!</h2>
        <p>Capaz sos un alma libre, o quizás... ¡un unicornio multidisciplinario! 🦄</p>
        <p>No te preocupes, explorá la <strong>Expo UNLu</strong> y descubrí otras áreas donde puede estar tu talento oculto ✨</p>
        <p><i class="fas fa-heart"></i> A veces, la vocación se encuentra cuando menos lo esperás.</p>
      `;
      return;
    }

    const porcSistemas = Math.round((puntajes.sistemas / respuestasConAfinidad) * 100);
    const porcDatos = Math.round((puntajes.datos / respuestasConAfinidad) * 100);

    const hearts = (p) => {
      const count = Math.round(p / 20);
      return "❤️".repeat(count) + "🤍".repeat(5 - count);
    };

    resultadoContenido.innerHTML = `
      <h3><i class="fas fa-chart-bar"></i> Tu afinidad con las carreras es:</h3>
      <div class="result-item">
        <h4><i class="fas fa-laptop-code"></i> Licenciatura en Sistemas de Información:</h4>
        <p class="result-percentage">${porcSistemas}% ${hearts(porcSistemas)}</p>
      </div>
      <div class="result-item">
        <h4><i class="fas fa-chart-line"></i> Ciencia de Datos:</h4>
        <p class="result-percentage">${porcDatos}% ${hearts(porcDatos)}</p>
      </div>
      <div class="result-summary">
        <p><i class="fas fa-info-circle"></i> Respuestas sin afinidad específica: ${ningunoCount}</p>
        <p><i class="fas fa-star"></i> ¡Gracias por completar el test! Explorá la Expo y descubrí tu vocación 💫</p>
      </div>
    `;
}


