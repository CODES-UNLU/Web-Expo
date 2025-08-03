// Google Apps Script para procesar datos del juego UNLuWords
// Este código debe ser copiado en Google Apps Script

function doPost(e) {
  try {
    // Obtener los datos enviados
    const datos = JSON.parse(e.postData.contents);
    
    // Obtener la hoja de cálculo (reemplaza con tu ID de hoja)
    const spreadsheetId = 'TU_SPREADSHEET_ID_AQUI'; // Reemplazar con tu ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Preparar los datos para la hoja
    const rowData = [
      new Date(), // Timestamp
      datos.email,
      datos.tiempo,
      datos.intentosNivel4,
      datos.intentosNivel5,
      datos.intentosNivel6,
      datos.totalIntentos,
      datos.fecha
    ];
    
    // Agregar fila a la hoja
    sheet.appendRow(rowData);
    
    // Enviar email de confirmación
    enviarEmailConfirmacion(datos.email, datos.tiempo);
    
    // Devolver respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('UNLuWords API está funcionando correctamente')
    .setMimeType(ContentService.MimeType.TEXT);
}

function enviarEmailConfirmacion(email, tiempo) {
  try {
    const asunto = '¡Felicitaciones por completar UNLuWords! 🏆';
    const mensaje = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🏆 ¡Felicitaciones!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Completaste UNLuWords exitosamente</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #2d3748; margin-top: 0;">Tu resultado:</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <p style="margin: 0; font-size: 18px; color: #4a5568;">
              <strong>⏱️ Tiempo total:</strong> ${tiempo} segundos
            </p>
          </div>
          
          <div style="background: #e6fffa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38a169;">
            <h3 style="color: #2f855a; margin-top: 0;">🎯 ¿Qué sigue?</h3>
            <ul style="color: #4a5568; line-height: 1.6;">
              <li>Tu resultado ha sido registrado en nuestra base de datos</li>
              <li>Participarás del sorteo de premios</li>
              <li>Te contactaremos por email si resultas ganador</li>
            </ul>
          </div>
          
          <div style="background: #fef5e7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ed8936;">
            <h3 style="color: #c05621; margin-top: 0;">📚 ¿Te gustó el juego?</h3>
            <p style="color: #4a5568; margin-bottom: 15px;">
              Considerá estudiar <strong>Licenciatura en Sistemas de Información</strong> en la UNLu
            </p>
            <a href="https://www.sistemas.unlu.edu.ar/" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Conocer más sobre la carrera
            </a>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #718096; font-size: 14px;">
          <p>© 2025 CODES++ - Centro de Estudiantes de Sistemas UNLu</p>
          <p>Desarrollado por Federico Rizzo</p>
        </div>
      </div>
    `;
    
    // Enviar email
    MailApp.sendEmail({
      to: email,
      subject: asunto,
      htmlBody: mensaje
    });
    
  } catch (error) {
    console.error('Error enviando email:', error);
  }
}

// Función para configurar la hoja de cálculo (ejecutar una vez)
function configurarHoja() {
  const spreadsheetId = 'TU_SPREADSHEET_ID_AQUI'; // Reemplazar con tu ID
  const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
  
  // Configurar encabezados
  const headers = [
    'Timestamp',
    'Email',
    'Tiempo (segundos)',
    'Intentos Nivel 4',
    'Intentos Nivel 5', 
    'Intentos Nivel 6',
    'Total Intentos',
    'Fecha Completa'
  ];
  
  // Limpiar hoja y agregar encabezados
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Formatear encabezados
  sheet.getRange(1, 1, 1, headers.length).setBackground('#667eea').setFontColor('white').setFontWeight('bold');
  
  // Ajustar ancho de columnas
  sheet.autoResizeColumns(1, headers.length);
  
  console.log('Hoja configurada correctamente');
} 