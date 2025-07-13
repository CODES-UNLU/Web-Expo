const palabras = {
  
    4: ["code", "dato", "aula", "chat", "wifi", "test", "base"],
    5: ["email", "tarea", "grupo", "clave", "libro", "disco", "input", "query", "login"],
    6: ["backup", "editor", "correo", "acceso", "buscar", "clases", "pagina", "python", "visual", "script", "docker", "modulo", "metric"]
  
  
};

let nivelActual = 4;
let palabraSecreta = "";
let intentos = [];
let maxIntentos = 6;
let inicioTiempo = null;
let intentosPorNivel = [];

function actualizarContadorIntentos() {
  const intentosRestantes = maxIntentos - intentos.length;
  const contador = document.getElementById("attempts-counter");
  contador.textContent = `${intentosRestantes} intentos restantes`;
  
  // Cambiar el color según los intentos restantes
  if (intentosRestantes <= 2) {
    contador.style.color = "#e53e3e"; // Rojo para pocos intentos
  } else if (intentosRestantes <= 3) {
    contador.style.color = "#ed8936"; // Naranja para intentos medios
  } else {
    contador.style.color = "#38a169"; // Verde para muchos intentos
  }
}

function iniciarJuego() {
  intentosPorNivel = [];
  document.getElementById("unluwords-bienvenida").classList.add("unluwords-oculto");
  document.getElementById("unluwords-game-area").classList.remove("unluwords-oculto");
  iniciarNivel();
}

function iniciarNivel() {
  if (!inicioTiempo) inicioTiempo = new Date();
  const lista = palabras[nivelActual].filter((p) => p.length === nivelActual);
  palabraSecreta = lista[Math.floor(Math.random() * lista.length)].toUpperCase();
  intentos = [];
  document.getElementById("unluwords-mensaje").textContent = "";
  // document.getElementById("unluwords-nivel-texto").textContent = `Palabra de ${nivelActual} letras`;
  actualizarContadorIntentos();
  generarGrid();
  setTimeout(() => {
    const firstInput = document.getElementById("cell-0-0");
    if (firstInput) firstInput.focus();
  }, 100);
}

function generarGrid() {
  const gridContainer = document.getElementById("unluwords-grid-container");
  gridContainer.innerHTML = "";
  for (let i = 0; i < maxIntentos; i++) {
    const row = document.createElement("div");
    row.className = `unluwords-grid nivel-${nivelActual}`;
    for (let j = 0; j < nivelActual; j++) {
      const input = document.createElement("input");
      input.className = "unluwords-tile";
      input.maxLength = 1;
      input.id = `cell-${i}-${j}`;
      input.autocapitalize = "characters";
      input.autocomplete = "off";
      input.spellcheck = false;
      input.inputMode = "latin";

      input.addEventListener("input", (e) => {
        e.target.value = e.target.value.toUpperCase().slice(0, 1);
        if (e.target.value && j < nivelActual - 1) {
          const nextInput = document.getElementById(`cell-${i}-${j + 1}`);
          if (nextInput) nextInput.focus();
        } else if (e.target.value && j === nivelActual - 1) {
          verificarIntento(); // Verifica automáticamente al completar última letra
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !e.target.value && j > 0) {
          const prevInput = document.getElementById(`cell-${i}-${j - 1}`);
          if (prevInput) prevInput.focus();
        } else if (e.key === "Enter") {
          verificarIntento(); // Verifica con Enter
        }
      });

      input.addEventListener("focus", () => {
        // Si la fila está incompleta, muestra ayuda
        const fila = parseInt(input.id.split("-")[1]);
        let incompleta = false;
        for (let k = 0; k < nivelActual; k++) {
          const celda = document.getElementById(`cell-${fila}-${k}`);
          if (!celda.value) {
            incompleta = true;
            break;
          }
        }
        if (incompleta && fila === intentos.length) {
          document.getElementById("unluwords-mensaje").textContent = "Completá la palabra para intentar";
        } else {
          document.getElementById("unluwords-mensaje").textContent = "";
        }
      });

      row.appendChild(input);
    }
    gridContainer.appendChild(row);
  }
}

function verificarIntento() {
  const fila = intentos.length;
  let intento = "";
  for (let i = 0; i < nivelActual; i++) {
    const celda = document.getElementById(`cell-${fila}-${i}`);
    intento += celda.value.toUpperCase();
  }

  if (intento.length !== nivelActual || intentos.length >= maxIntentos) {
    // Feedback UX: shake si está incompleto
    if (intento.length !== nivelActual) {
      const row = document.querySelectorAll('.unluwords-grid')[fila];
      if (row) {
        row.classList.add('shake');
        setTimeout(() => row.classList.remove('shake'), 500);
      }
      document.getElementById("unluwords-mensaje").textContent = "Completá la palabra para intentar";
    }
    return;
  }

  intentos.push(intento);
  actualizarContadorIntentos();

  const resultado = Array(nivelActual).fill("absent");
  const letrasSecretas = palabraSecreta.split("");
  const usadas = Array(nivelActual).fill(false);

  for (let i = 0; i < nivelActual; i++) {
    if (intento[i] === letrasSecretas[i]) {
      resultado[i] = "correct";
      usadas[i] = true;
    }
  }

  for (let i = 0; i < nivelActual; i++) {
    if (resultado[i] === "correct") continue;
    for (let j = 0; j < nivelActual; j++) {
      if (!usadas[j] && intento[i] === letrasSecretas[j]) {
        resultado[i] = "present";
        usadas[j] = true;
        break;
      }
    }
  }

  for (let i = 0; i < nivelActual; i++) {
    const celda = document.getElementById(`cell-${fila}-${i}`);
    celda.classList.add(`unluwords-${resultado[i]}`);
    celda.disabled = true;
  }

  // Feedback UX: animación de acierto o error
  const row = document.querySelectorAll('.unluwords-grid')[fila];
  if (intento === palabraSecreta) {
    if (row) {
      row.classList.add('flash');
      setTimeout(() => row.classList.remove('flash'), 700);
    }
    // Guardar intentos usados en este nivel
    intentosPorNivel.push(intentos.length);
    if (nivelActual < 6) {
      document.getElementById("unluwords-mensaje").textContent = "¡Correcto! Pasás al siguiente nivel.";
      setTimeout(() => {
        nivelActual++;
        iniciarNivel();
      }, 1500);
    } else {
      mostrarFinal();
    }
  } else if (intentos.length >= maxIntentos) {
    if (row) {
      row.classList.add('shake');
      setTimeout(() => row.classList.remove('shake'), 700);
    }
    document.getElementById("unluwords-mensaje").textContent = `Perdiste. La palabra era ${palabraSecreta}`;
  }
}

function mostrarFinal() {
  const fin = new Date();
  const segundos = Math.floor((fin - inicioTiempo) / 1000);
  // Resumen de intentos por nivel
  const niveles = [4,5,6];
  let resumen = '<ul style="list-style:none;padding:0;margin:1rem 0 0 0;">';
  for (let i = 0; i < intentosPorNivel.length; i++) {
    resumen += `<li>🔹 Nivel ${niveles[i]} letras: <b>${intentosPorNivel[i]} intento${intentosPorNivel[i]===1?'':'s'}</b></li>`;
  }
  resumen += '</ul>';
  document.getElementById("unluwords-game-area").innerHTML = `
    <div class="final-anim">
      <div class="final-trophy">🏆</div>
      <h2>¡Felicitaciones!</h2>
    </div>
    <div class="final-summary">
      <strong>¡Completaste todos los niveles!</strong><br>
      <span>⏱️ Tiempo total: <b>${segundos} segundos</b></span>
      ${resumen}
    </div>
    <p>Dejanos tu correo para participar del sorteo:</p>
    <input type="email" id="email" placeholder="tucorreo@ejemplo.com">
    <button onclick="enviarEmail()">Enviar</button>
    <p id="emailMensaje"></p>
  `;
  lanzarConfeti();
}

// Confeti animado
function lanzarConfeti() {
  const colors = ["#48bb78", "#667eea", "#ed8936", "#38a169", "#764ba2", "#f6e05e", "#29C5F4"];
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = (Math.random() * 10 - 10) + "vh";
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    piece.style.animation = `confetti-fall 1.8s ${Math.random()*0.7}s cubic-bezier(.6,1.5,.6,1) forwards`;
    confetti.appendChild(piece);
  }
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 2500);
}

// Confeti keyframes
const style = document.createElement('style');
style.innerHTML = `@keyframes confetti-fall {
  to {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0.7;
  }
}`;
document.head.appendChild(style);

function reiniciarJuego() {
  nivelActual = 4;
  intentos = [];
  inicioTiempo = null;
  document.getElementById("unluwords-bienvenida").classList.remove("unluwords-oculto");
  document.getElementById("unluwords-game-area").classList.add("unluwords-oculto");
}

function enviarEmail() {
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("emailMensaje");
  const segundos = Math.floor((new Date() - inicioTiempo) / 1000);

  if (email && email.includes("@")) {
    fetch(
      "https://script.google.com/macros/s/AKfycbz2XIqDM5ux2IlTs9ZDFP-bNMqucBZb7jZ-sljE6m5S-rMHFsIuJR6kC4Xw4tTjGjY_2A/exec",
      {
        method: "POST",
        body: JSON.stringify({ email, tiempo: segundos }),
        contentType: "application/json",
      }
    )
      .then(() => {
        mensaje.textContent = "¡Gracias por participar! Te contactaremos si ganás.";
      })
      .catch(() => {
        mensaje.textContent = "Ocurrió un error al enviar los datos.";
      });
  } else {
    mensaje.textContent = "Por favor ingresá un correo válido.";
  }
}
