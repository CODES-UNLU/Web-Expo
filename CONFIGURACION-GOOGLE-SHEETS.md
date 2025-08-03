# Configuración de Google Sheets para UNLuWords

## Paso 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo o usa tu hoja existente
3. Crea una hoja llamada "Ranking" (o usa la que ya tienes)
4. Asegúrate de que la hoja "Ranking" tenga al menos estas columnas:
   - Columna A: Email
   - Columna B: Tiempo (segundos)
   - Columna C: Fecha
5. Copia el ID de la URL (está entre /d/ y /edit)
   - Ejemplo: `https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`**`/edit`

## Paso 2: Configurar Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com)
2. Crea un nuevo proyecto o usa tu proyecto existente
3. Nombra el proyecto como "UNLuWords API"
4. Reemplaza todo el código por defecto con este código simplificado:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Ranking");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.email, data.tiempo, new Date()]);
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Ranking");
  const rows = sheet.getDataRange().getValues();
  const result = [];

  for (let i = 1; i < rows.length; i++) {
    result.push({ 
      email: rows[i][0], 
      tiempo: Number(rows[i][1]),
      fecha: rows[i][2] // Incluir la fecha para desempate
    });
  }

  // Ordenar por tiempo ascendente, y en caso de empate, por fecha (más antiguo primero)
  result.sort((a, b) => {
    if (a.tiempo === b.tiempo) {
      // Si tienen el mismo tiempo, ordenar por fecha (más antiguo primero)
      return new Date(a.fecha) - new Date(b.fecha);
    }
    return a.tiempo - b.tiempo;
  });

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Paso 3: Configurar Permisos

1. En Google Apps Script, haz clic en "Deploy" → "New deployment"
2. Selecciona "Web app"
3. Configura:
   - **Execute as**: Me (tu cuenta)
   - **Who has access**: Anyone
4. Haz clic en "Deploy"
5. Copia la URL que se genera (será algo como `https://script.google.com/macros/s/AKfycbz2XIqDM5ux2IlTs9ZDFP-bNMqucBZb7jZ-sljE6m5S-rMHFsIuJR6kC4Xw4tTjGjY_2A/exec`)

## Paso 4: Actualizar el código del juego

1. Abre el archivo `juego.js`
2. Busca la línea que dice:
   ```javascript
   const scriptURL = 'https://script.google.com/macros/s/AKfycbz2XIqDM5ux2IlTs9ZDFP-bNMqucBZb7jZ-sljE6m5S-rMHFsIuJR6kC4Xw4tTjGjY_2A/exec';
   ```
3. Reemplaza la URL con la que obtuviste en el paso 3

## Paso 5: Configurar la hoja de cálculo

1. En tu Google Sheet, asegúrate de que la hoja "Ranking" tenga los encabezados:
   - A1: Email
   - B1: Tiempo
   - C1: Fecha
2. Opcional: Puedes formatear los encabezados con colores para que se vean mejor

## Paso 6: Probar la integración

1. Sube los cambios a GitHub Pages
2. Juega UNLuWords hasta completarlo
3. Ingresa un email de prueba
4. Verifica que los datos aparezcan en tu Google Sheet
5. Verifica que recibas el email de confirmación

## Estructura de datos que se envía:

- **Email**: Correo del jugador
- **Tiempo**: Tiempo total en segundos
- **Fecha**: Se agrega automáticamente por el script

## Funcionalidades incluidas:

✅ **Almacenamiento en Google Sheets**: Todos los resultados se guardan automáticamente
✅ **Validación de email**: Se verifica que el email sea válido
✅ **Feedback visual**: El botón cambia de estado durante el envío
✅ **Manejo de errores**: Mensajes claros si algo falla
✅ **Datos simples**: Se guarda email y tiempo para el ranking

## Notas importantes:

- El Google Apps Script debe estar desplegado como "Web app"
- Los permisos deben ser "Anyone" para que funcione desde GitHub Pages
- Los datos se guardan con timestamp automático
- El script incluye función `doGet()` para obtener el ranking ordenado por tiempo
- **Manejo de empates**: Si dos o más jugadores tienen el mismo tiempo, se ordenan por fecha de registro (quien se registró primero aparece primero) 