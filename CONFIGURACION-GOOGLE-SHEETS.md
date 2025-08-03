# Configuración de Google Sheets para UNLuWords

## Paso 1: Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nombra la hoja como "UNLuWords - Resultados"
4. Copia el ID de la URL (está entre /d/ y /edit)
   - Ejemplo: `https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`**`/edit`

## Paso 2: Configurar Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com)
2. Crea un nuevo proyecto
3. Nombra el proyecto como "UNLuWords API"
4. Reemplaza todo el código por defecto con el contenido del archivo `google-apps-script.js`
5. **IMPORTANTE**: Reemplaza `TU_SPREADSHEET_ID_AQUI` con el ID que copiaste en el paso 1

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

1. En Google Apps Script, ejecuta la función `configurarHoja()`
2. Esto creará los encabezados en tu Google Sheet

## Paso 6: Probar la integración

1. Sube los cambios a GitHub Pages
2. Juega UNLuWords hasta completarlo
3. Ingresa un email de prueba
4. Verifica que los datos aparezcan en tu Google Sheet
5. Verifica que recibas el email de confirmación

## Estructura de datos que se envía:

- **Email**: Correo del jugador
- **Tiempo**: Tiempo total en segundos
- **Intentos Nivel 4**: Número de intentos en el primer nivel
- **Intentos Nivel 5**: Número de intentos en el segundo nivel
- **Intentos Nivel 6**: Número de intentos en el tercer nivel
- **Total Intentos**: Suma de todos los intentos
- **Fecha**: Fecha y hora del juego

## Funcionalidades incluidas:

✅ **Almacenamiento en Google Sheets**: Todos los resultados se guardan automáticamente
✅ **Email de confirmación**: Los jugadores reciben un email elegante con su resultado
✅ **Validación de email**: Se verifica que el email sea válido
✅ **Feedback visual**: El botón cambia de estado durante el envío
✅ **Manejo de errores**: Mensajes claros si algo falla
✅ **Datos completos**: Se guarda tiempo, intentos por nivel y total

## Notas importantes:

- El Google Apps Script debe estar desplegado como "Web app"
- Los permisos deben ser "Anyone" para que funcione desde GitHub Pages
- El email de confirmación se envía automáticamente a cada jugador
- Los datos se guardan con timestamp para seguimiento temporal 