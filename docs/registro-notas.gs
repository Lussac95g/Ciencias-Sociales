/**
 * Registro de notas · Rincón de Sociales
 * Pegar en la hoja "Notas – Rincón de Sociales": Extensiones > Apps Script.
 * Cada curso recibe su propia pestaña de registros y una pestaña de resumen
 * con la MEJOR nota de cada estudiante por evaluación.
 */
const ENCABEZADO = ['Fecha y hora', 'Curso', 'Paralelo', 'Evaluación', 'Apellidos y nombres', 'Nota /10', 'Intento'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const curso = limpio(d.curso) || 'Sin curso';
    let hoja = ss.getSheetByName(curso);
    if (!hoja) hoja = crearHojas(ss, curso);
    let nota = Math.round(Number(d.nota) * 100) / 100;
    nota = isNaN(nota) ? '' : Math.max(0, Math.min(10, nota));
    hoja.appendRow([new Date(), curso, limpio(d.grupo).toUpperCase(), limpio(d.evaluacion),
                    limpio(d.nombre), nota, Number(d.intento) || 1]);
    return salida({ ok: true });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return salida({ ok: true, mensaje: 'Registro de notas activo' });
}

function crearHojas(ss, curso) {
  const hoja = ss.insertSheet(curso);
  hoja.appendRow(ENCABEZADO);
  hoja.getRange(1, 1, 1, ENCABEZADO.length).setFontWeight('bold').setBackground('#dcefe7');
  hoja.setFrozenRows(1);
  hoja.setColumnWidth(1, 150);
  hoja.setColumnWidth(4, 260);
  hoja.setColumnWidth(5, 260);
  const res = ss.insertSheet('Resumen ' + curso);
  res.getRange('A1').setFormula(
    "=QUERY('" + curso + "'!A:G;\"select C, E, max(F) where E is not null group by C, E pivot D order by C, E\";1)"
      .replace(/;/g, ','));
  res.getRange(1, 1, 1, 12).setFontWeight('bold');
  res.setFrozenRows(1);
  res.setColumnWidth(2, 260);
  const sobra = ss.getSheetByName('Hoja 1') || ss.getSheetByName('Sheet1') || ss.getSheetByName('Hoja1');
  if (sobra && sobra.getLastRow() === 0 && ss.getSheets().length > 2) ss.deleteSheet(sobra);
  return hoja;
}

function limpio(s) {
  s = String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, 120);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function salida(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** Prueba manual: ejecuta esta función una vez para autorizar el script. */
function probar() {
  doPost({ postData: { contents: JSON.stringify({
    curso: 'Prueba', grupo: 'A', evaluacion: 'Prueba de conexión', nombre: 'Docente Prueba', nota: 10, intento: 1
  }) } });
}
