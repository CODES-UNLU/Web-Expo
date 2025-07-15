const palabras = {
  
    4: ["dato", "aula", "wifi", "test", "byte", "user", "apps", "mail", "nota"],
    5: ["tarea", "grupo", "clave", "libro", "disco", "redes", "clase", "curso", "login", "error"],
    6: ["editor", "correo", "acceso", "buscar", "clases", "pagina","modulo", "titulo", "teoria"]
  
  
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
    <form class="unluwords-email-form" onsubmit="event.preventDefault(); enviarEmail();">
      <div class="unluwords-email-input-wrapper">
        <span class="unluwords-email-icon">
          <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.75 6.5A2.25 2.25 0 0 1 5 4.25h12A2.25 2.25 0 0 1 19.25 6.5v9a2.25 2.25 0 0 1-2.25 2.25H5A2.25 2.25 0 0 1 2.75 15.5v-9Zm1.5.19v8.31c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75V6.69l-6.75 4.5-6.75-4.5Zm1.13-1.19 6.12 4.08a.75.75 0 0 0 .84 0l6.12-4.08A.75.75 0 0 0 17 5.75H5a.75.75 0 0 0-.62.31Z" fill="#667eea"/></svg>
        </span>
        <input type="email" id="email" class="unluwords-email-input" placeholder="tucorreo@ejemplo.com" autocomplete="off">
      </div>
      <button class="unluwords-email-btn" id="unluwords-email-btn" type="submit">Enviar</button>
    </form>
    <p id="emailMensaje"></p>
  `;
  lanzarConfeti();
}