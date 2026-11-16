/* =====================================================================
   ESCENAS de la portada de Rincón de Sociales (una por momento del día)
   - mañana: Hemiciclo de La Rotonda, Malecón 2000 (Guayaquil)
   - tarde:  Palacio de Carondelet y Plaza Grande (Quito)
   - noche:  Virgen de El Panecillo (Quito)
   Todas comparten viewBox "0 40 1200 260"; el monumento va centrado en x≈720.
   ===================================================================== */
(function () {
  const INK = "#1d1b2f";

  /* ---------- utilidades ---------- */
  const hoja = (x, y, ang, L) => {
    const r = ang * Math.PI / 180, tx = x + Math.cos(r) * L, ty = y + Math.sin(r) * L;
    const nx = -Math.sin(r), ny = Math.cos(r), mx = (x + tx) / 2, my = (y + ty) / 2 - 6;
    return `<path d="M${x} ${y}Q${(mx + nx*7).toFixed(1)} ${(my + ny*7).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}Q${(mx - nx*3).toFixed(1)} ${(my - ny*3).toFixed(1)} ${x} ${y}z"/>`;
  };
  const palma = (x, y, h, flip) => {
    const s = flip ? -1 : 1, cx = x - 2*s, cy = y - h;
    const angs = flip ? [-10, 20, 200, 160, -60, 240] : [190, 160, -20, 20, 240, -60];
    return `<g class="palma" style="transform-origin:${x}px ${y}px">
      <path d="M${x} ${y}q${6*s} ${-h*0.5} ${-2*s} ${-h}" fill="none" stroke="#7a5a3a" stroke-width="5" stroke-linecap="round"/>
      <g fill="#2e9e5b" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round">${angs.map((g, i) => hoja(cx, cy, g, i > 3 ? 22 : 34)).join("")}</g>
      <circle cx="${cx}" cy="${cy}" r="3" fill="#7a5a3a"/></g>`;
  };
  const arbol = (x, y, r) => `<g><rect x="${x-2}" y="${y-r*0.4}" width="4" height="${r*0.9}" fill="#6b4a2f"/>
      <circle cx="${x}" cy="${y-r}" r="${r}" fill="#3fa36b" stroke="${INK}" stroke-width="2.5"/>
      <circle cx="${x-r*0.35}" cy="${y-r*1.25}" r="${r*0.35}" fill="#5cc084"/></g>`;
  const bandera = (x, y, colores, d) => `<g><line x1="${x}" y1="${y}" x2="${x}" y2="${y-22}" stroke="${INK}" stroke-width="1.6"/>
      <g class="ondea" style="animation-delay:-${d}s; transform-origin:${x}px ${y-22}px">${colores.map((c, i) =>
        `<rect x="${x}" y="${y-22 + i*(9/colores.length)}" width="13" height="${9/colores.length + 0.2}" fill="${c}"/>`).join("")}
        <rect x="${x}" y="${y-22}" width="13" height="9" fill="none" stroke="${INK}" stroke-width="1"/></g></g>`;

  /* =========================== MAÑANA ============================== */
  function manana() {
    // Hemiciclo: 10 pilares + 10 columnas sobre un arco cóncavo
    const n = 20, x0 = 566, x1 = 874;
    let col = "", ent = [], banderas = "";
    const paises = [["#ffd100","#034ea2","#ed1c24"],["#74acdf","#fff","#74acdf"],["#ffcd00","#003893","#ce1126"],["#d52b1e","#fff","#d52b1e"],["#007a3d","#fcd116","#ce1126"],["#ffd100","#034ea2","#ed1c24"]];
    for (let i = 0; i < n; i++) {
      const x = x0 + (x1 - x0) * i / (n - 1);
      const u = (x - 720) / 154;
      const base = 258 - 16 * (1 - u * u);       // el centro está más lejos: sube
      const h = 64 - 10 * (1 - u * u);           // y se ve más pequeño
      const pilar = i % 2 === 0;
      const w = pilar ? 10 : 6;
      col += `<rect x="${(x - w/2).toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w}" height="${h.toFixed(1)}" fill="${pilar ? "url(#marmol)" : "#f4efe4"}" stroke="${INK}" stroke-width="1.6"/>`;
      if (!pilar) col += `<line x1="${x.toFixed(1)}" y1="${(base - h + 4).toFixed(1)}" x2="${x.toFixed(1)}" y2="${(base - 3).toFixed(1)}" stroke="#cfc6b3" stroke-width="1.2"/>`;
      ent.push([x, base - h]);
      if (pilar) banderas += bandera(x, base - h - 8, paises[(i/2) % paises.length], (i * 0.23).toFixed(2));
    }
    const top = ent.map(([x, y]) => `${x.toFixed(1)},${(y - 1).toFixed(1)}`).join(" ");
    const topB = ent.slice().reverse().map(([x, y]) => `${x.toFixed(1)},${(y - 9).toFixed(1)}`).join(" ");
    const casas = Array.from({ length: 16 }, (_, i) => {
      const x = 360 + i * 9.5, y = 238 - Math.sin((i / 15) * Math.PI) * 44 + (i % 3) * 4;
      const c = ["#ff8fb1","#ffcf33","#1aa3c8","#ff6b4a","#7b5cd6","#1fa96b"][i % 6];
      return `<rect x="${x}" y="${y.toFixed(1)}" width="9" height="10" fill="${c}" stroke="${INK}" stroke-width="1.2"/><rect x="${x+3}" y="${(y+3).toFixed(1)}" width="3" height="3" fill="#fff"/>`;
    }).join("");
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="rio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fb3d9"/><stop offset="1" stop-color="#1d7fa8"/></linearGradient>
    <linearGradient id="marmol" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2d9c6"/></linearGradient>
    <linearGradient id="bronce" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6a3c"/><stop offset="1" stop-color="#4f3a1f"/></linearGradient>
  </defs>
  <g class="nube"><ellipse cx="0" cy="110" rx="60" ry="18" fill="#fff" opacity=".9"/><ellipse cx="30" cy="98" rx="34" ry="18" fill="#fff" opacity=".9"/></g>
  <g class="nube b"><ellipse cx="0" cy="140" rx="48" ry="14" fill="#fff" opacity=".8"/><ellipse cx="22" cy="130" rx="26" ry="14" fill="#fff" opacity=".8"/></g>
  <g class="ave"><path class="ala" d="M-20 0q10-10 20 0q10-10 20 0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></g>
  <!-- Cerro Santa Ana con el faro y las casas de Las Peñas -->
  <path d="M250 262q60-70 115-82q30-6 60 4q70 24 130 78z" fill="#6cc48f" stroke="${INK}" stroke-width="3.5"/>
  ${casas}
  <g><rect x="398" y="160" width="12" height="26" fill="#fff" stroke="${INK}" stroke-width="2"/><rect x="398" y="168" width="12" height="5" fill="#1aa3c8"/>
     <path d="M396 160h16l-3-8h-10z" fill="#ffcf33" stroke="${INK}" stroke-width="2"/><path d="M404 152l-4-6h8z" fill="${INK}"/>
     <path class="haz" d="M412 156l60-12v10z" fill="#fff6c2" opacity=".55"/></g>
  <!-- Malecón -->
  <rect x="0" y="258" width="1200" height="14" fill="#efe6d2" stroke="${INK}" stroke-width="3"/>
  ${palma(548, 262, 54, false)}${palma(895, 262, 58, true)}${palma(990, 262, 46, false)}${palma(470, 262, 44, true)}
  <!-- Hemiciclo de La Rotonda -->
  <polygon points="${top} ${topB}" fill="#f4efe4" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
  ${col}
  ${banderas}
  <rect x="556" y="252" width="328" height="8" rx="2" fill="#e6dcc6" stroke="${INK}" stroke-width="2"/>
  <!-- Pedestal y libertadores saludándose -->
  <rect x="702" y="214" width="36" height="40" fill="url(#marmol)" stroke="${INK}" stroke-width="2"/>
  <rect x="698" y="210" width="44" height="6" fill="#efe6d2" stroke="${INK}" stroke-width="2"/>
  <rect x="698" y="248" width="44" height="6" fill="#efe6d2" stroke="${INK}" stroke-width="2"/>
  <g fill="url(#bronce)" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round">
    <!-- Bolívar (izquierda) -->
    <circle cx="710" cy="174" r="4.3"/>
    <path d="M705 179h10l2 16-3 15h-3l-1-12-1 12h-3l-3-15z"/>
    <path d="M714 183l7 6" fill="none" stroke-width="3" stroke-linecap="round"/>
    <path d="M705 180l-4 13 3 1" fill="none" stroke-width="2.4" stroke-linecap="round"/>
    <!-- San Martín (derecha) -->
    <circle cx="730" cy="174" r="4.3"/>
    <path d="M725 179h10l2 16-3 15h-3l-1-12-1 12h-3l-3-15z"/>
    <path d="M726 183l-7 6" fill="none" stroke-width="3" stroke-linecap="round"/>
    <path d="M735 180l4 13-3 1" fill="none" stroke-width="2.4" stroke-linecap="round"/>
  </g>
  <circle cx="720" cy="189.5" r="1.8" fill="#4f3a1f"/>
  <!-- Río Guayas -->
  <rect x="0" y="272" width="1200" height="40" fill="url(#rio)" stroke="${INK}" stroke-width="3"/>
  <g class="olas" fill="none" stroke="#bfe9ff" stroke-width="2" stroke-linecap="round">
    <path d="M40 282q10-5 20 0t20 0M220 290q10-5 20 0t20 0M420 284q10-5 20 0t20 0M640 292q10-5 20 0t20 0M860 283q10-5 20 0t20 0M1080 290q10-5 20 0t20 0"/></g>
  <g class="bote"><path d="M0 282h34l-6 8h-22z" fill="#ff6b4a" stroke="${INK}" stroke-width="2"/><path d="M16 282v-22l14 18z" fill="#fff" stroke="${INK}" stroke-width="2"/></g>
</svg>`;
  }

  /* =========================== TARDE =============================== */
  function tarde() {
    const x0 = 548, x1 = 892, ancho = x1 - x0;
    let arcos = "", columnas = "", balaustre = "";
    for (let x = x0 + 8; x < x1 - 10; x += 22) {
      if (x > 692 && x < 748) continue;
      arcos += `<path d="M${x} 258v-26a8 8 0 0 1 16 0v26z" fill="#3a3550" stroke="${INK}" stroke-width="1.4"/>`;
    }
    for (let x = x0 + 6; x <= x1 - 6; x += 11) {
      if (x > 690 && x < 750) continue;
      columnas += `<rect x="${x-2}" y="190" width="4" height="26" fill="#fffdf6" stroke="${INK}" stroke-width="1.1"/>`;
    }
    for (let x = x0 + 3; x <= x1 - 3; x += 5) balaustre += `<rect x="${x}" y="208" width="2.2" height="8" fill="#fffdf6" stroke="${INK}" stroke-width=".6"/>`;
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="muro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#efe8d8"/></linearGradient>
    <linearGradient id="piedra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9d0bf"/><stop offset="1" stop-color="#bfb5a2"/></linearGradient>
  </defs>
  <g class="nube"><ellipse cx="0" cy="100" rx="60" ry="18" fill="#fff" opacity=".9"/><ellipse cx="30" cy="88" rx="34" ry="18" fill="#fff" opacity=".9"/></g>
  <g class="nube b"><ellipse cx="0" cy="135" rx="48" ry="14" fill="#fff" opacity=".8"/><ellipse cx="22" cy="125" rx="26" ry="14" fill="#fff" opacity=".8"/></g>
  <g class="ave"><path class="ala" d="M-28 0q14-14 28 0q14-14 28 0" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>
  <!-- Pichincha y montañas de Quito -->
  <path d="M0 270V170l140-40 120 30 170-90 140 70 120-30 150 60 160-70 200 80v90z" fill="var(--h1)" stroke="${INK}" stroke-width="3.5"/>
  <path d="M420 90l18-16 20 18-10 2-8-6-10 6z" fill="#fff"/>
  <path d="M0 270V215l200-25 220 18 260-30 260 26 260-20v86z" fill="var(--h2)" stroke="${INK}" stroke-width="3.5"/>
  <!-- Casas coloniales vecinas -->
  <g stroke="${INK}" stroke-width="2">
    <rect x="455" y="222" width="70" height="40" fill="#ffe2b8"/><path d="M450 222h80l-8-10h-64z" fill="#c4553a"/>
    <rect x="915" y="218" width="80" height="44" fill="#d9ecff"/><path d="M910 218h90l-8-10h-74z" fill="#c4553a"/>
  </g>
  <g fill="#3a3550"><rect x="466" y="232" width="8" height="12"/><rect x="486" y="232" width="8" height="12"/><rect x="506" y="232" width="8" height="12"/>
    <rect x="928" y="228" width="8" height="12"/><rect x="950" y="228" width="8" height="12"/><rect x="972" y="228" width="8" height="12"/></g>
  <!-- Palacio de Carondelet -->
  <rect x="${x0}" y="186" width="${ancho}" height="74" fill="url(#muro)" stroke="${INK}" stroke-width="3"/>
  <rect x="${x0-4}" y="180" width="${ancho+8}" height="8" fill="#fffdf6" stroke="${INK}" stroke-width="2.5"/>
  <rect x="${x0}" y="216" width="${ancho}" height="5" fill="#e9e0cc" stroke="${INK}" stroke-width="1.5"/>
  ${columnas}
  ${balaustre}
  <rect x="${x0}" y="206" width="${ancho}" height="3" fill="#fffdf6" stroke="${INK}" stroke-width="1"/>
  ${arcos}
  <!-- cuerpo central -->
  <rect x="690" y="168" width="60" height="92" fill="url(#muro)" stroke="${INK}" stroke-width="3"/>
  <path d="M684 170h72l-36-20z" fill="#fffdf6" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <ellipse cx="720" cy="162" rx="6" ry="5" fill="#ffd100" stroke="${INK}" stroke-width="1.5"/>
  <rect x="696" y="186" width="5" height="30" fill="#fffdf6" stroke="${INK}" stroke-width="1.2"/><rect x="739" y="186" width="5" height="30" fill="#fffdf6" stroke="${INK}" stroke-width="1.2"/>
  <rect x="708" y="190" width="24" height="18" fill="#3a3550" stroke="${INK}" stroke-width="1.5"/>
  <rect x="704" y="206" width="32" height="6" fill="#fffdf6" stroke="${INK}" stroke-width="1.2"/>
  <path d="M706 260v-34a14 14 0 0 1 28 0v34z" fill="#5a3f2a" stroke="${INK}" stroke-width="2"/>
  <!-- Bandera del Ecuador -->
  <line x1="720" y1="150" x2="720" y2="106" stroke="${INK}" stroke-width="2.4"/>
  <g class="ondea" style="transform-origin:720px 108px">
    <rect x="720" y="108" width="30" height="10" fill="#ffd100"/><rect x="720" y="118" width="30" height="5" fill="#034ea2"/><rect x="720" y="123" width="30" height="5" fill="#ed1c24"/>
    <rect x="720" y="108" width="30" height="20" fill="none" stroke="${INK}" stroke-width="1.6"/></g>
  <!-- Plaza Grande -->
  <rect x="0" y="260" width="1200" height="50" fill="url(#piedra)" stroke="${INK}" stroke-width="3"/>
  <g stroke="#a99e8a" stroke-width="1.2"><path d="M0 278h1200M0 292h1200"/></g>
  ${arbol(570, 266, 14)}${arbol(870, 266, 14)}${palma(530, 270, 46, false)}${palma(905, 270, 50, true)}
  <!-- Monumento a los Héroes del 10 de Agosto -->
  <g stroke="${INK}" stroke-width="1.8">
    <rect x="630" y="256" width="24" height="12" fill="#e6dcc6"/><rect x="636" y="246" width="12" height="10" fill="#efe6d2"/>
    <rect x="639" y="190" width="6" height="56" fill="#fffdf6"/><circle cx="642" cy="186" r="3.5" fill="#c9a35a"/>
    <path d="M638 196l-6-4 6 1z" fill="#c9a35a"/></g>
</svg>`;
  }

  /* =========================== NOCHE =============================== */
  function noche() {
    const luces = Array.from({ length: 70 }, (_, i) => {
      const x = 10 + i * 17 + (i * 37 % 11), y = 252 + (i * 53 % 40);
      if (x > 610 && x < 830 && y < 262) return "";
      return `<rect x="${x}" y="${y}" width="3.5" height="3.5" rx="1" style="animation-delay:-${(i * 0.37 % 4).toFixed(2)}s"/>`;
    }).join("");
    const corona = Array.from({ length: 12 }, (_, k) => {
      const a = Math.PI * (1.05 + k * 0.08);
      return `<circle cx="${(720 + Math.cos(a) * 11).toFixed(1)}" cy="${(112 + Math.sin(a) * 11).toFixed(1)}" r="1.3"/>`;
    }).join("");
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="plata" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9cdea"/></linearGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c2" stop-opacity=".55"/><stop offset="1" stop-color="#fff6c2" stop-opacity="0"/></radialGradient>
  </defs>
  <g class="nube"><ellipse cx="0" cy="110" rx="60" ry="16" fill="#8d8bbf" opacity=".3"/></g>
  <path d="M0 300V180l130-50 120 40 160-90 130 70 110-40 150 70 160-80 140 60 100-20v140z" fill="var(--h1)" stroke="${INK}" stroke-width="3.5"/>
  <path d="M410 80l22-18 22 20-12 3-10-7-12 7z" fill="#dfe3ff"/>
  <path d="M0 300V236l180-36 160 26 200-44 200 40 200-36 260 30v84z" fill="var(--h2)" stroke="${INK}" stroke-width="3.5"/>
  <!-- Loma de El Panecillo -->
  <path d="M584 300c18-58 70-92 136-94c66 2 118 36 136 94z" fill="var(--pan)" stroke="${INK}" stroke-width="3.5"/>
  <path d="M640 270q30-8 60-4M745 262q35 2 66 14" fill="none" stroke="#3d5f7d" stroke-width="2"/>
  <!-- Halo y pedestal -->
  <circle cx="720" cy="150" r="70" fill="url(#halo)" class="halo"/>
  <g fill="url(#plata)" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round">
    <path d="M700 210h40l-4-10h-32z"/>
    <rect x="706" y="186" width="28" height="14"/>
    <rect x="710" y="178" width="20" height="8"/>
  </g>
  <!-- Virgen de Quito (Legarda, 1734 · monumento de 1975) -->
  <g class="virgen" fill="url(#plata)" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
    <!-- alas abiertas hacia arriba y a los lados -->
    <path d="M715 130c-14-2-28-12-34-30c6 3 10 5 13 5c-4-7-5-15-3-24c4 7 8 11 12 13c-1-8 1-15 5-21c2 9 5 15 9 19c0 8 0 14 1 20c0 6-1 12-3 18z"/>
    <path d="M725 130c14-3 27-14 32-32c-6 3-10 5-13 5c4-8 4-16 2-24c-4 7-8 11-12 13c1-8-1-15-5-20c-2 9-5 15-9 19c0 8 0 14-1 20c0 6 2 12 6 19z"/>
    <path d="M701 102q6 10 14 16M739 100q-6 10-14 16" fill="none" stroke-width="1"/>
    <!-- globo y dragón encadenado -->
    <circle cx="720" cy="172" r="7"/>
    <path d="M706 176c6 4 10-2 16 0s10 6 16 0" fill="none" stroke-width="2.6"/>
    <path d="M738 176l5-3-1 5z"/>
    <!-- manto en pose de danza -->
    <path d="M713 166c0-14 2-28 4-38h8c3 8 6 18 6 26c-2 5-1 9 2 12c-6 3-14 3-20 0z"/>
    <path d="M717 140c-3 6-5 14-4 22" fill="none" stroke-width="1.2"/>
    <path d="M725 136c2 8 3 16 1 26" fill="none" stroke-width="1.2"/>
    <!-- brazos: el derecho levantado sostiene la cadena -->
    <path d="M724 132l10-10" fill="none" stroke-width="3"/>
    <path d="M734 122q4 20 4 52" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
    <path d="M716 133l-7 9" fill="none" stroke-width="3"/>
    <!-- cabeza -->
    <circle cx="720" cy="121" r="5"/>
  </g>
  <g class="virgen" fill="#fff6c2" stroke="none">${corona}</g>
  <!-- Ciudad -->
  <path d="M0 300v-46l220-12 260 14 240-18 240 16 240-10v56z" fill="var(--h3)" stroke="${INK}" stroke-width="3.5"/>
  <g class="luces">${luces}</g>
</svg>`;
  }

  window.ESCENAS = {
    manana: { svg: manana, lugar: "Hemiciclo de La Rotonda · Guayaquil",
      dato: "El Hemiciclo de La Rotonda, en el Malecón 2000 de Guayaquil, recuerda la Entrevista de Guayaquil entre Simón Bolívar y José de San Martín, el 26 de julio de 1822. Se inauguró en 1938." },
    tarde:  { svg: tarde, lugar: "Palacio de Carondelet · Quito",
      dato: "El Palacio de Carondelet, sede del Gobierno del Ecuador, se construyó entre 1790 y 1801 frente a la Plaza Grande. Simón Bolívar lo nombró así en honor al Barón de Carondelet." },
    noche:  { svg: noche, lugar: "Virgen de El Panecillo · Quito",
      dato: "La Virgen de El Panecillo mide 41 metros con su base, está hecha con 7 400 piezas de aluminio y se terminó en 1975. Copia a la Virgen de Quito que Bernardo de Legarda talló en 1734." }
  };
})();
