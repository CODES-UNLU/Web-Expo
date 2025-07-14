// Configuración del test
const preguntas = [
  {
    id: 1,
    pregunta: "¿Qué disfrutás más hacer en la compu o el celu?",
    opciones: [
      { valor: "sistemas", texto: "Jugar y pensar cómo están hechos los juegos", icono: "fas fa-gamepad" },
      { valor: "datos", texto: "Ver estadísticas o gráficos de deportes, redes o economía", icono: "fas fa-chart-bar" },
      { valor: "ambos", texto: "Ver cómo funcionan las apps y redes sociales", icono: "fas fa-mobile-alt" },
      { valor: "ninguno", texto: "Chatear, sacar fotos o crear contenido", icono: "fas fa-camera" }
    ]
  },
  {
    id: 2,
    pregunta: "¿Qué tipo de tareas preferís en clase?",
    opciones: [
      { valor: "sistemas", texto: "Resolver problemas lógicos o técnicos", icono: "fas fa-cogs" },
      { valor: "datos", texto: "Trabajar con números, datos o estadísticas", icono: "fas fa-calculator" },
      { valor: "ambos", texto: "Hacer trabajos en grupo donde todos aportan ideas", icono: "fas fa-users" },
      { valor: "ninguno", texto: "Exponer oralmente o escribir textos creativos", icono: "fas fa-microphone" }
    ]
  },
  {
    id: 3,
    pregunta: "¿Qué te gustaría hacer en el futuro?",
    opciones: [
      { valor: "sistemas", texto: "Crear una app o juego desde cero", icono: "fas fa-code" },
      { valor: "datos", texto: "Analizar información para entender cómo funciona algo", icono: "fas fa-search" },
      { valor: "ambos", texto: "Hacer un proyecto con tecnología que ayude a otros", icono: "fas fa-heart" },
      { valor: "ninguno", texto: "Ser influencer, artista o trabajar con personas", icono: "fas fa-star" }
    ]
  },
  {
    id: 4,
    pregunta: "¿Cómo te gusta resolver un problema difícil?",
    opciones: [
      { valor: "sistemas", texto: "Busco una solución paso a paso y pruebo hasta que funcione", icono: "fas fa-puzzle-piece" },
      { valor: "datos", texto: "Recojo información y comparo antes de decidir", icono: "fas fa-search-plus" },
      { valor: "ambos", texto: "Hago un poco de todo: investigar, probar, preguntar", icono: "fas fa-lightbulb" },
      { valor: "ninguno", texto: "Me guío por mi intuición o pido ayuda a alguien", icono: "fas fa-magic" }
    ]
  },
  {
    id: 5,
    pregunta: "¿Qué materia te interesa más?",
    opciones: [
      { valor: "sistemas", texto: "Informática o tecnología", icono: "fas fa-laptop-code" },
      { valor: "datos", texto: "Matemática o geografía con datos", icono: "fas fa-chart-line" },
      { valor: "ninguno", texto: "Ciencias naturales o sociales", icono: "fas fa-flask" },
      { valor: "ambos", texto: "Me gustan varias, depende de cómo la den", icono: "fas fa-thumbs-up" }
    ]
  },
  {
    id: 6,
    pregunta: "¿Qué rol te gustaría tener en un proyecto escolar?",
    opciones: [
      { valor: "sistemas", texto: "El que hace funcionar el trabajo con lógica y tecnología", icono: "fas fa-cog" },
      { valor: "datos", texto: "El que investiga y analiza la información", icono: "fas fa-search" },
      { valor: "ambos", texto: "El que ayuda en todo un poco", icono: "fas fa-hands-helping" },
      { valor: "ninguno", texto: "El que organiza o presenta el proyecto", icono: "fas fa-tasks" }
    ]
  },
  {
    id: 7,
    pregunta: "¿Qué te parece más interesante?",
    opciones: [
      { valor: "sistemas", texto: "Pensar cómo se hacen las apps, juegos o robots", icono: "fas fa-robot" },
      { valor: "datos", texto: "Entender por qué pasan las cosas con datos reales", icono: "fas fa-lightbulb" },
      { valor: "ambos", texto: "Usar tecnología para mejorar algo del día a día", icono: "fas fa-tools" },
      { valor: "ninguno", texto: "Hacer cosas creativas como escribir o comunicar", icono: "fas fa-palette" }
    ]
  },
  {
    id: 8,
    pregunta: "¿Con qué tipo de trabajo te sentirías más cómodo?",
    opciones: [
      { valor: "sistemas", texto: "Frente a una compu, resolviendo desafíos paso a paso", icono: "fas fa-desktop" },
      { valor: "datos", texto: "Analizando información y sacando conclusiones", icono: "fas fa-chart-pie" },
      { valor: "ambos", texto: "Un poco de todo: analizar, programar, trabajar en equipo", icono: "fas fa-balance-scale" },
      { valor: "ninguno", texto: "Trabajando con personas, comunicando o enseñando", icono: "fas fa-comments" }
    ]
  },
  {
    id: 9,
    pregunta: "¿Qué te da más satisfacción?",
    opciones: [
      { valor: "sistemas", texto: "Lograr que algo funcione luego de mucho intentar", icono: "fas fa-trophy" },
      { valor: "datos", texto: "Descubrir una causa o una relación entre cosas", icono: "fas fa-search" },
      { valor: "ambos", texto: "Hacer algo útil para otros con tecnología", icono: "fas fa-heart" },
      { valor: "ninguno", texto: "Compartir lo que hago o comunicar ideas", icono: "fas fa-bullhorn" }
    ]
  },
  {
    id: 10,
    pregunta: "¿Qué te motiva a aprender algo nuevo?",
    opciones: [
      { valor: "sistemas", texto: "Saber cómo se crean cosas tecnológicas", icono: "fas fa-cogs" },
      { valor: "datos", texto: "Entender el mundo con datos reales", icono: "fas fa-globe" },
      { valor: "ambos", texto: "Poder aplicar lo que sé a la vida diaria", icono: "fas fa-lightbulb" },
      { valor: "ninguno", texto: "Conocer nuevas formas de expresarme o ayudar", icono: "fas fa-star" }
    ]
  }
];

// Variables globales
let preguntasAleatorizadas = [];
let pasoActual = 0;
let respuestas = {};

// Elementos del DOM
const btnIniciar = document.getElementById("btnIniciar");
const inicio = document.getElementById("inicio");
const form = document.getElementById("testForm");
const resultado = document.getElementById("resultado");
const resultadoContenido = document.getElementById("resultado-contenido");

// Función para aleatorizar array (Fisher-Yates shuffle)
function aleatorizarArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Función para inicializar el test con preguntas aleatorizadas
function inicializarTest() {
  // Aleatorizar preguntas
  preguntasAleatorizadas = aleatorizarArray(preguntas);
  
  // Limpiar formulario
  form.innerHTML = '';
  
  // Crear preguntas aleatorizadas
  preguntasAleatorizadas.forEach((pregunta, index) => {
    // Aleatorizar opciones de cada pregunta
    const opcionesAleatorizadas = aleatorizarArray(pregunta.opciones);
    
    const preguntaHTML = `
      <div class="question paso" data-paso="${index + 1}" style="display: none">
        <div class="question-header">
          <div class="question-number">${index + 1}</div>
          <h3>${pregunta.pregunta}</h3>
        </div>
        <div class="options-container">
          ${opcionesAleatorizadas.map((opcion, opcionIndex) => `
            <input type="radio" id="q${index + 1}-${opcionIndex}" name="q${index + 1}" value="${opcion.valor}" required />
            <label for="q${index + 1}-${opcionIndex}">
              <i class="${opcion.icono}"></i>
              <span>${opcion.texto}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
    
    form.insertAdjacentHTML('beforeend', preguntaHTML);
  });
  
  // Agregar event listeners a los nuevos radio buttons
  agregarEventListeners();
}

// Función para agregar event listeners a los radio buttons
function agregarEventListeners() {
  document.querySelectorAll("input[type='radio']").forEach((radio) => {
    radio.addEventListener("change", () => {
      setTimeout(() => {
        const currentPaso = document.querySelector(`[data-paso="${pasoActual + 1}"]`);
        const inputs = currentPaso.querySelectorAll("input[type='radio']");
        const checked = Array.from(inputs).some((input) => input.checked);
        
        if (checked) {
          // Guardar respuesta
          const preguntaId = preguntasAleatorizadas[pasoActual].id;
          const valorSeleccionado = currentPaso.querySelector("input[type='radio']:checked").value;
          respuestas[preguntaId] = valorSeleccionado;
          
          currentPaso.style.display = "none";
          pasoActual++;
          
          if (pasoActual < preguntasAleatorizadas.length) {
            const nextPaso = document.querySelector(`[data-paso="${pasoActual + 1}"]`);
            nextPaso.style.display = "block";
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
}

// Función para procesar resultados
function procesarResultados() {
  document.getElementById("procesando").style.display = "none";
  
  // Procesar resultados usando las respuestas guardadas
  let puntajes = { sistemas: 0, datos: 0 };
  let ningunoCount = 0;

  Object.values(respuestas).forEach(valor => {
    if (valor === "sistemas") puntajes.sistemas++;
    else if (valor === "datos") puntajes.datos++;
    else if (valor === "ambos") {
      puntajes.sistemas += 0.5;
      puntajes.datos += 0.5;
    } else if (valor === "ninguno") {
      ningunoCount++;
    }
  });

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

// Event listener para iniciar el test
btnIniciar.addEventListener("click", () => {
  // Reiniciar variables
  pasoActual = 0;
  respuestas = {};
  
  // Inicializar test con preguntas aleatorizadas
  inicializarTest();
  
  // Mostrar primera pregunta
  inicio.style.display = "none";
  form.style.display = "block";
  const primeraPregunta = document.querySelector('[data-paso="1"]');
  primeraPregunta.style.display = "block";
});

// Función para reiniciar el test (opcional, para debugging)
function reiniciarTest() {
  pasoActual = 0;
  respuestas = {};
  inicio.style.display = "block";
  form.style.display = "none";
  resultado.style.display = "none";
  document.getElementById("procesando").style.display = "none";
}


