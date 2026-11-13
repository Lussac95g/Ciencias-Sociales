/* Registro de notas de Rincón de Sociales.
   Envía la nota de cada estudiante a la hoja de Google Sheets del docente.
   Para activarlo, pega entre las comillas la URL de la aplicación web de Apps Script. */
(function () {
  var URL_REGISTRO = "";

  var PEND = "rs-pendientes", ENV = "rs-enviados";
  function leer(k) { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch (e) { return []; } }
  function guardar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function aviso(texto, ok) {
    try {
      var d = document.getElementById("rs-aviso");
      if (!d) {
        d = document.createElement("div");
        d.id = "rs-aviso";
        d.setAttribute("role", "status");
        d.style.cssText = "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999;max-width:calc(100% - 32px);padding:14px 18px;border-radius:12px;font:700 17px/1.35 system-ui,sans-serif;color:#fff;box-shadow:0 6px 24px rgba(0,0,0,.25);text-align:center";
        document.body.appendChild(d);
      }
      d.style.background = ok ? "#1f7a3a" : "#8a4b08";
      d.textContent = texto;
      d.hidden = false;
      clearTimeout(aviso.t);
      aviso.t = setTimeout(function () { d.hidden = true; }, 7000);
    } catch (e) {}
  }

  function enviar(d) {
    return fetch(URL_REGISTRO, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(d)
    });
  }

  function marcarEnviado(clave) {
    var e = leer(ENV);
    if (e.indexOf(clave) < 0) e.push(clave);
    guardar(ENV, e.slice(-400));
  }

  function enviarPendientes() {
    if (!URL_REGISTRO) return;
    var q = leer(PEND);
    if (!q.length) return;
    guardar(PEND, []);
    q.forEach(function (d) {
      enviar(d).then(function () { marcarEnviado(d.clave); })
        .catch(function () { var r = leer(PEND); r.push(d); guardar(PEND, r); });
    });
  }

  window.registrarNota = function (d) {
    try {
      d.nota = Math.round(Number(d.nota) * 100) / 100;
      d.intento = Number(d.intento) || 1;
      d.clave = [d.curso, d.evaluacion, d.nombre, d.intento].join("|");
      d.pagina = location.pathname;
      if (!URL_REGISTRO) return;
      if (leer(ENV).indexOf(d.clave) >= 0) return;
      enviar(d).then(function () {
        marcarEnviado(d.clave);
        aviso("✓ Tu nota (" + String(d.nota).replace(".", ",") + "/10) quedó registrada para el docente.", true);
      }).catch(function () {
        var q = leer(PEND); q.push(d); guardar(PEND, q);
        aviso("Sin internet: tu nota se enviará cuando vuelvas a abrir esta página con conexión. Toma una captura por si acaso.", false);
      });
    } catch (e) {}
  };

  window.addEventListener("load", enviarPendientes);
})();
