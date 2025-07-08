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

      document.querySelectorAll(".siguiente").forEach((btn, index) => {
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

        // Puntajes para cada carrera
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

        // Ordenar carreras por puntaje descendente
        const orden = Object.entries(puntajes)
          .sort((a, b) => b[1] - a[1])
          .filter((entry) => entry[1] > 0);

        if (orden.length === 0) {
          textoResultado.textContent =
            "No pudimos determinar tu afinidad. Por favor, intenta nuevamente.";
        } else {
          // Mostrar las carreras con mayor puntaje (puede haber empate)
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

        form.style.display = "none";
        resultado.style.display = "block";

        // Enviar datos (a modificar con URL real)
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
      });