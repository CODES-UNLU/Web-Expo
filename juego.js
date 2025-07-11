const palabras = {
  5: ["tesis", "aulas", "notas", "libro", "curso", "clase"],
  6: ["campus", "alumno", "codigo", "formar", "clases", "examen"],
  7: ["materia", "carrera", "sistema", "parcial", "docente"],
};

let nivelActual = 5;
let palabraSecreta = "";
let intentos = [];
let maxIntentos = 6;
let inicioTiempo = null;

function iniciarJuego() {
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
  document.getElementById("unluwords-nivel-texto").textContent = `Nivel actual: Palabra de ${nivelActual} letras`;
  generarGrid();
}

function generarGrid() {
  const gridContainer = document.getElementById("unluwords-grid-container");
  gridContainer.innerHTML = "";
  for (let i = 0; i < maxIntentos; i++) {
    const row = document.createElement("div");
    row.className = "unluwords-grid";
    row.style.gridTemplateColumns = `repeat(${nivelActual}, 50px)`;
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

  if (intento.length !== nivelActual || intentos.length >= maxIntentos) return;

  intentos.push(intento);

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
    celda.disabled = true; // Opcional: desactiva la fila actual tras verificar
  }

  if (intento === palabraSecreta) {
    if (nivelActual < 7) {
      document.getElementById("unluwords-mensaje").textContent = "¡Correcto! Pasás al siguiente nivel.";
      setTimeout(() => {
        nivelActual++;
        iniciarNivel();
      }, 1500);
    } else {
      mostrarFinal();
    }
  } else if (intentos.length >= maxIntentos) {
    document.getElementById("unluwords-mensaje").textContent = `Perdiste. La palabra era ${palabraSecreta}`;
  }
}

function mostrarFinal() {
  const fin = new Date();
  const segundos = Math.floor((fin - inicioTiempo) / 1000);
  document.getElementById("unluwords-game-area").innerHTML = `
    <h2>¡Felicitaciones!</h2>
    <p>Completaste todos los niveles en <strong>${segundos}</strong> segundos.</p>
    <p>Dejanos tu correo para participar del sorteo:</p>
    <input type="email" id="email" placeholder="tucorreo@ejemplo.com">
    <button onclick="enviarEmail()">Enviar</button>
    <p id="emailMensaje"></p>
  `;
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
