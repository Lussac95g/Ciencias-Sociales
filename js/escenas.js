/* =====================================================================
   ESCENAS de la portada de Rincón de Sociales: galería de lugares del Ecuador
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

  /* ======================= VIRGEN DE EL PANECILLO ===================== */
  function panecillo() {
    const luces = Array.from({ length: 70 }, (_, i) => {
      const x = 10 + i * 17 + (i * 37 % 11), y = 254 + (i * 53 % 38);
      return `<rect x="${x}" y="${y}" width="3.5" height="3.5" rx="1" style="animation-delay:-${(i * 0.37 % 4).toFixed(2)}s"/>`;
    }).join("");
    const corona = Array.from({ length: 12 }, (_, k) => {
      const a = Math.PI * (1.08 + k * 0.077);
      return `<path d="M${(720 + Math.cos(a) * 10).toFixed(1)} ${(103 + Math.sin(a) * 10 - 1.8).toFixed(1)}l.6 1.2 1.3.2-1 .9.3 1.3-1.2-.7-1.2.7.3-1.3-1-.9 1.3-.2z"/>`;
    }).join("");
    const pluma = (x, y, dx, dy) => `<path d="M${x} ${y}q${dx * 0.4} ${dy * 0.6} ${dx} ${dy}" fill="none" stroke-width="1"/>`;
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="plata" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c7cce6"/></linearGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c2" stop-opacity=".5"/><stop offset="1" stop-color="#fff6c2" stop-opacity="0"/></radialGradient>
  </defs>
  <g class="nube"><ellipse cx="0" cy="110" rx="60" ry="16" fill="#fff" opacity=".7"/><ellipse cx="28" cy="100" rx="30" ry="14" fill="#fff" opacity=".7"/></g>
  <path d="M0 300V180l130-50 120 40 160-90 130 70 110-40 150 70 160-80 140 60 100-20v140z" fill="var(--h1)" stroke="${INK}" stroke-width="3.5"/>
  <path d="M410 80l22-18 22 20-12 3-10-7-12 7z" fill="#fff"/>
  <path d="M0 300V236l180-36 160 26 200-44 200 40 200-36 260 30v84z" fill="var(--h2)" stroke="${INK}" stroke-width="3.5"/>
  <!-- Loma de El Panecillo -->
  <path d="M574 300c20-60 74-94 146-96c72 2 126 36 146 96z" fill="var(--pan)" stroke="${INK}" stroke-width="3.5"/>
  <path d="M630 272q30-8 60-4M748 264q35 2 66 14" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="2"/>
  <circle cx="720" cy="130" r="80" fill="url(#halo)" class="halo"/>
  <!-- Base escalonada -->
  <g fill="url(#plata)" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round">
    <path d="M692 214h56l-4-12h-48z"/>
    <rect x="700" y="188" width="40" height="14"/>
    <rect x="706" y="178" width="28" height="10"/>
  </g>
  <!-- Virgen de Quito: alas abiertas, corona de 12 estrellas, globo y dragón encadenado -->
  <g class="virgen" fill="url(#plata)" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M717 118c-8-10-16-24-22-44c-2 8-1 14 1 19c-5-4-8-9-10-16c-1 9 1 16 5 22c-5-1-9-4-12-8c2 9 7 16 14 21c-4 1-8 0-11-2c5 7 13 11 22 12z"/>
    <path d="M725 118c8-10 16-24 22-44c2 8 1 14-1 19c5-4 8-9 10-16c1 9-1 16-5 22c5-1 9-4 12-8c-2 9-7 16-14 21c4 1 8 0 11-2c-5 7-13 11-22 12z"/>
    ${pluma(710,100,-10,-14)}${pluma(708,108,-14,-8)}${pluma(732,100,10,-14)}${pluma(734,108,14,-8)}
    <circle cx="720" cy="170" r="9"/>
    <path d="M711 171h18" fill="none" stroke-width="1.2"/>
    <path d="M706 176c4 6 12 6 16 2s10-6 16-1l6-4" fill="none" stroke-width="3"/>
    <path d="M744 173l6-5-1 6 5-1-6 4z"/>
    <path d="M712 162c-3-10 0-22 5-34h10c3 10 8 22 7 33c-8 4-16 4-22 1z"/>
    <path d="M714 160c4-8 6-18 6-28M724 132c1 10 4 20 8 27" fill="none" stroke-width="1"/>
    <path d="M716 128c-1-6 0-12 2-16h7c2 4 3 10 2 16z"/>
    <path d="M725 116l9-12" fill="none" stroke-width="3"/>
    <path d="M734 104c4 22 10 44 14 66" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
    <path d="M717 117l-8 8" fill="none" stroke-width="3"/>
    <circle cx="721" cy="106" r="4.6"/>
  </g>
  <g class="virgen" fill="#fff3b0" stroke="${INK}" stroke-width=".5">${corona}</g>
  <path d="M0 300v-44l220-12 260 14 240-18 240 16 240-10v54z" fill="var(--h3)" stroke="${INK}" stroke-width="3.5"/>
  <g class="luces">${luces}</g>
</svg>`;
  }

  /* ============================ GALÁPAGOS ============================ */
  function galapagos() {
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs><linearGradient id="mar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3cc2d6"/><stop offset="1" stop-color="#127a9e"/></linearGradient></defs>
  <g class="nube"><ellipse cx="0" cy="110" rx="60" ry="18" fill="#fff" opacity=".9"/><ellipse cx="30" cy="98" rx="34" ry="18" fill="#fff" opacity=".9"/></g>
  <rect x="0" y="200" width="1200" height="110" fill="url(#mar)"/>
  <g class="olas" fill="none" stroke="#c9f3ff" stroke-width="2" stroke-linecap="round"><path d="M60 214q10-5 20 0t20 0M300 222q10-5 20 0t20 0M980 216q10-5 20 0t20 0M1120 226q10-5 20 0t20 0M520 210q10-5 20 0t20 0"/></g>
  <!-- Islas volcánicas -->
  <path d="M380 204l50-56 20 10 30-30 60 76z" fill="#7a6a5a" stroke="${INK}" stroke-width="3"/>
  <path d="M900 206l40-40 30 16 40-24 70 48z" fill="#8a7a66" stroke="${INK}" stroke-width="3"/>
  <!-- Playa y roca de lava -->
  <path d="M470 300c40-60 120-84 250-86c130 2 210 26 250 86z" fill="#efe1b8" stroke="${INK}" stroke-width="3.5"/>
  <path d="M560 260q40-20 90-14q30 4 40 18" fill="none" stroke="#d8c690" stroke-width="2"/>
  <path d="M760 246h90l10 14h-108z" fill="#4a3f45" stroke="${INK}" stroke-width="2.5"/>
  <!-- Cactus Opuntia -->
  <g fill="#3f9a5b" stroke="${INK}" stroke-width="2"><rect x="532" y="200" width="8" height="54" fill="#a07a4f"/>
    <ellipse cx="528" cy="196" rx="10" ry="16" transform="rotate(-25 528 196)"/><ellipse cx="546" cy="188" rx="10" ry="16" transform="rotate(20 546 188)"/><ellipse cx="536" cy="172" rx="9" ry="14"/></g>
  <!-- Tortuga gigante -->
  <g class="tortuga">
    <path d="M590 246c-4-22 18-40 52-40s54 18 50 40z" fill="#6b5b45" stroke="${INK}" stroke-width="3"/>
    <path d="M612 216l14 12 18-14 18 14 14-10M600 236h84M626 228v18M658 228v18" fill="none" stroke="#3f3427" stroke-width="2"/>
    <path d="M688 236c10-4 14-14 24-18c8-3 14 2 14 8c0 7-8 10-14 10l-10 4z" fill="#8a7a62" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="718" cy="224" r="1.8" fill="${INK}"/>
    <path d="M600 244l-2 10h12l2-8M670 244l2 10h12l-2-8" fill="#8a7a62" stroke="${INK}" stroke-width="2.5"/>
  </g>
  <!-- Piquero de patas azules -->
  <g class="piquero">
    <path d="M800 246v-16M812 246v-16" stroke="#29a6e6" stroke-width="4"/>
    <path class="pata" d="M792 247h14" stroke="#29a6e6" stroke-width="5" stroke-linecap="round"/>
    <path d="M806 247h14" stroke="#29a6e6" stroke-width="5" stroke-linecap="round"/>
    <path d="M790 210c0-18 12-28 22-28c8 0 14 6 12 14c-2 10-2 22-8 32c-6 8-24 8-26-18z" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M794 212c6 6 16 10 22 6c-2 8-6 12-12 12c-6 0-10-8-10-18z" fill="#8a6b4f" stroke="${INK}" stroke-width="2"/>
    <path d="M800 184c0-12 6-20 14-20c7 0 11 6 10 12c-1 7-8 10-14 10z" fill="#e9dccb" stroke="${INK}" stroke-width="2.5"/>
    <path d="M822 172l20 6-20 4z" fill="#6aa7c4" stroke="${INK}" stroke-width="2"/>
    <circle cx="815" cy="172" r="2" fill="#fff" stroke="${INK}" stroke-width="1"/><circle cx="815" cy="172" r=".9" fill="${INK}"/>
  </g>
  <g class="ave"><path class="ala" d="M-20 0q10-10 20 0q10-10 20 0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/></g>
</svg>`;
  }

  /* ============================ INGAPIRCA ============================ */
  function ingapirca() {
    let piedras = "";
    for (let r = 0; r < 4; r++) for (let i = 0; i < 16; i++) {
      const x = 612 + i * 14 + (r % 2) * 7, y = 214 + r * 9;
      if (x > 832) continue;
      piedras += `<rect x="${x}" y="${y}" width="13" height="8" rx="2" fill="${(i + r) % 3 ? "#8f9a86" : "#7f8b77"}" stroke="${INK}" stroke-width="1"/>`;
    }
    const llama = (x, y, f) => `<g transform="translate(${x} ${y}) scale(${f * 1.7} 1.7)"><path d="M0 0h22l2 14h-4l-1-8h-16l-1 8h-4zM18 0l2-20 6 0 1 6-4 1-1 13" fill="#f3ead8" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M22 -21l1-4 2 4" fill="none" stroke="${INK}" stroke-width="1.5"/></g>`;
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <g class="nube"><ellipse cx="0" cy="110" rx="60" ry="18" fill="#fff" opacity=".9"/><ellipse cx="30" cy="98" rx="34" ry="18" fill="#fff" opacity=".9"/></g>
  <g class="ave"><path class="ala" d="M-28 0q14-14 28 0q14-14 28 0" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>
  <path d="M0 300V170l150-50 140 40 160-70 160 60 140-30 180 60 150-40 120 30v140z" fill="var(--h1)" stroke="${INK}" stroke-width="3.5"/>
  <path d="M0 300V230l200-30 220 20 260-26 260 22 260-16v100z" fill="var(--h2)" stroke="${INK}" stroke-width="3.5"/>
  <!-- Colina ovalada y Templo del Sol -->
  <path d="M560 300c10-40 70-70 160-72c90 2 150 32 160 72z" fill="#7cc48a" stroke="${INK}" stroke-width="3.5"/>
  <path d="M606 248c0-22 50-38 114-38s114 16 114 38z" fill="#9aa592" stroke="${INK}" stroke-width="3"/>
  ${piedras}
  <path d="M606 248c0-22 50-38 114-38s114 16 114 38" fill="none" stroke="${INK}" stroke-width="3"/>
  <rect x="660" y="190" width="120" height="24" fill="#a5b09c" stroke="${INK}" stroke-width="2.5"/>
  ${[0,1,2,3,4].map(k => `<path d="M${672 + k * 22} 212l3-16h8l3 16z" fill="#3a3550" stroke="${INK}" stroke-width="1.4"/>`).join("")}
  <path d="M700 190l3-14h34l3 14z" fill="#a5b09c" stroke="${INK}" stroke-width="2"/>
  <path d="M714 190l2-9h8l2 9z" fill="#3a3550"/>
  ${llama(548, 262, 1)}${llama(896, 266, -1)}
  <path d="M0 300v-26l300-10 300 16 300-14 300 10v24z" fill="var(--h3)" stroke="${INK}" stroke-width="3.5"/>
</svg>`;
  }

  /* ======================= CATEDRAL DE CUENCA ======================== */
  function cuenca() {
    const cupula = (cx, by, r, h) => `<g><rect x="${cx - r * 0.75}" y="${by - 8}" width="${r * 1.5}" height="10" fill="#e9dccb" stroke="${INK}" stroke-width="2"/>
      <path d="M${cx - r} ${by - 8}c0-${h} ${r * 2} -${h} ${r * 2} 0z" fill="#5fb6e8" stroke="${INK}" stroke-width="2.5"/>
      ${[-0.5, 0, 0.5].map(k => `<path d="M${cx + k * r} ${by - 8}q${-k * r * 0.2} -${h * 0.6} 0 -${h * 0.75}" fill="none" stroke="#fff" stroke-width="2"/>`).join("")}
      <rect x="${cx - 4}" y="${by - 8 - h * 0.75 - 10}" width="8" height="10" fill="#e9dccb" stroke="${INK}" stroke-width="1.5"/>
      <path d="M${cx} ${by - 8 - h * 0.75 - 10}v-8M${cx - 3} ${by - 8 - h * 0.75 - 15}h6" stroke="${INK}" stroke-width="2"/></g>`;
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs><linearGradient id="ladrillo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d77a55"/><stop offset="1" stop-color="#b85d3c"/></linearGradient></defs>
  <g class="nube"><ellipse cx="0" cy="110" rx="60" ry="18" fill="#fff" opacity=".9"/><ellipse cx="30" cy="98" rx="34" ry="18" fill="#fff" opacity=".9"/></g>
  <g class="ave"><path class="ala" d="M-28 0q14-14 28 0q14-14 28 0" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>
  <path d="M0 300V200l200-40 200 30 240-50 220 40 200-30 140 20v130z" fill="var(--h1)" stroke="${INK}" stroke-width="3.5"/>
  <!-- Cúpulas celestes -->
  ${cupula(650, 178, 30, 40)}${cupula(790, 178, 30, 40)}${cupula(720, 162, 44, 62)}
  <!-- Fachada de ladrillo con torres truncas -->
  <rect x="620" y="176" width="200" height="86" fill="url(#ladrillo)" stroke="${INK}" stroke-width="3"/>
  <rect x="604" y="150" width="34" height="112" fill="url(#ladrillo)" stroke="${INK}" stroke-width="3"/>
  <rect x="802" y="150" width="34" height="112" fill="url(#ladrillo)" stroke="${INK}" stroke-width="3"/>
  <rect x="600" y="146" width="42" height="6" fill="#e9dccb" stroke="${INK}" stroke-width="2"/><rect x="798" y="146" width="42" height="6" fill="#e9dccb" stroke="${INK}" stroke-width="2"/>
  <g fill="#3a3550" stroke="${INK}" stroke-width="1.4"><path d="M614 196v-14a7 7 0 0 1 14 0v14zM812 196v-14a7 7 0 0 1 14 0v14z"/></g>
  <circle cx="720" cy="196" r="13" fill="#ffd36e" stroke="${INK}" stroke-width="2.5"/>
  <path d="M707 196h26M720 183v26" stroke="#b85d3c" stroke-width="1.5"/>
  <path d="M704 262v-34a16 16 0 0 1 32 0v34z" fill="#5a3f2a" stroke="${INK}" stroke-width="2.5"/>
  <path d="M652 262v-24a10 10 0 0 1 20 0v24zM768 262v-24a10 10 0 0 1 20 0v24z" fill="#5a3f2a" stroke="${INK}" stroke-width="2"/>
  <path d="M620 176l100-14 100 14" fill="none" stroke="#e9dccb" stroke-width="4"/>
  <!-- Parque Calderón -->
  <rect x="0" y="262" width="1200" height="48" fill="#bfb5a2" stroke="${INK}" stroke-width="3"/>
  ${arbol(560, 268, 16)}${arbol(880, 268, 16)}${palma(520, 272, 48, false)}${palma(925, 272, 50, true)}
</svg>`;
  }

  /* =================== BASÍLICA DEL VOTO NACIONAL ==================== */
  function basilica() {
    const torre = (x) => `<g><rect x="${x}" y="140" width="34" height="122" fill="url(#gris)" stroke="${INK}" stroke-width="2.5"/>
      <path d="M${x - 2} 140l19-56 19 56z" fill="#8d93a8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M${x + 17} 84v-12M${x + 13} 77h8" stroke="${INK}" stroke-width="2"/>
      <path d="M${x + 9} 176v-16a8 8 0 0 1 16 0v16z" fill="#3a3550" stroke="${INK}" stroke-width="1.4"/>
      <path d="M${x + 9} 216v-20a8 8 0 0 1 16 0v20z" fill="#3a3550" stroke="${INK}" stroke-width="1.4"/></g>`;
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs><linearGradient id="gris" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d6d8e0"/><stop offset="1" stop-color="#b5b8c6"/></linearGradient></defs>
  <g class="nube"><ellipse cx="0" cy="110" rx="60" ry="18" fill="#fff" opacity=".9"/><ellipse cx="30" cy="98" rx="34" ry="18" fill="#fff" opacity=".9"/></g>
  <path d="M0 300V180l140-40 150 30 170-80 150 60 150-30 160 50 160-40 120 30v120z" fill="var(--h1)" stroke="${INK}" stroke-width="3.5"/>
  <!-- Torre del reloj al fondo -->
  <rect x="842" y="128" width="26" height="100" fill="url(#gris)" stroke="${INK}" stroke-width="2.5"/>
  <path d="M840 128l15-40 15 40z" fill="#8d93a8" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="855" cy="146" r="7" fill="#fffdf6" stroke="${INK}" stroke-width="2"/><path d="M855 141v5l3 2" stroke="${INK}" stroke-width="1.4" fill="none"/>
  <!-- Nave -->
  <rect x="740" y="180" width="110" height="82" fill="url(#gris)" stroke="${INK}" stroke-width="2.5"/>
  <path d="M736 182l57-26 57 26z" fill="#8d93a8" stroke="${INK}" stroke-width="2.5"/>
  ${[0,1,2,3].map(k => `<path d="M${752 + k * 24} 240v-26a6 6 0 0 1 12 0v26z" fill="#3a3550" stroke="${INK}" stroke-width="1.2"/>`).join("")}
  <!-- Fachada neogótica con dos torres -->
  ${torre(632)}${torre(774)}
  <rect x="666" y="160" width="108" height="102" fill="url(#gris)" stroke="${INK}" stroke-width="2.5"/>
  <path d="M662 162l58-34 58 34z" fill="#8d93a8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="720" cy="186" r="15" fill="#7b5cd6" stroke="${INK}" stroke-width="2.5"/>
  <g stroke="#ffcf33" stroke-width="1.6">${[0,1,2,3,4,5].map(k => { const a = k * Math.PI / 3; return `<line x1="720" y1="186" x2="${(720 + Math.cos(a) * 14).toFixed(1)}" y2="${(186 + Math.sin(a) * 14).toFixed(1)}"/>`; }).join("")}</g>
  <circle cx="720" cy="186" r="4" fill="#ffcf33" stroke="${INK}" stroke-width="1.2"/>
  <path d="M700 262v-38l20-18 20 18v38z" fill="#5a3f2a" stroke="${INK}" stroke-width="2.5"/>
  <!-- Tortugas e iguanas que sobresalen de los muros -->
  <g fill="#3fae80" stroke="${INK}" stroke-width="1.5"><ellipse cx="628" cy="200" rx="6" ry="4"/><ellipse cx="812" cy="200" rx="6" ry="4"/><path d="M850 210l12-3-12-1z"/></g>
  <rect x="0" y="262" width="1200" height="48" fill="#bfb5a2" stroke="${INK}" stroke-width="3"/>
  ${arbol(580, 268, 14)}${arbol(900, 268, 14)}
</svg>`;
  }

  /* ======================== SAN FRANCISCO =========================== */
  function sanfrancisco() {
    const torre = (x) => `<g><rect x="${x}" y="150" width="30" height="76" fill="#fffdf6" stroke="${INK}" stroke-width="2.5"/>
      <path d="M${x + 7} 176v-14a8 8 0 0 1 16 0v14z" fill="#3a3550" stroke="${INK}" stroke-width="1.3"/>
      <rect x="${x - 2}" y="146" width="34" height="6" fill="#fffdf6" stroke="${INK}" stroke-width="2"/>
      <path d="M${x + 2} 146c0-16 26-16 26 0z" fill="#fffdf6" stroke="${INK}" stroke-width="2"/>
      <path d="M${x + 15} 132v-12M${x + 11} 125h8" stroke="${INK}" stroke-width="2"/></g>`;
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <g class="nube"><ellipse cx="0" cy="110" rx="60" ry="18" fill="#fff" opacity=".9"/><ellipse cx="30" cy="98" rx="34" ry="18" fill="#fff" opacity=".9"/></g>
  <g class="ave"><path class="ala" d="M-28 0q14-14 28 0q14-14 28 0" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>
  <!-- Pichincha -->
  <path d="M0 300V170l200-50 160 30 200-90 200 70 180-30 260 60v140z" fill="var(--h1)" stroke="${INK}" stroke-width="3.5"/>
  <path d="M540 74l20-14 20 16-10 2-10-6-10 6z" fill="#fff"/>
  <!-- Templo y convento -->
  <rect x="560" y="186" width="74" height="54" fill="#f1e8d6" stroke="${INK}" stroke-width="2.5"/>
  <rect x="806" y="186" width="74" height="54" fill="#f1e8d6" stroke="${INK}" stroke-width="2.5"/>
  <g fill="#3a3550">${[0,1,2,3].map(k => `<rect x="${570 + k * 16}" y="198" width="8" height="12"/><rect x="${816 + k * 16}" y="198" width="8" height="12"/>`).join("")}</g>
  ${torre(626)}${torre(784)}
  <rect x="656" y="166" width="128" height="74" fill="#fffdf6" stroke="${INK}" stroke-width="2.5"/>
  <path d="M652 168h136l-10-12h-116z" fill="#fffdf6" stroke="${INK}" stroke-width="2"/>
  <path d="M700 156c0-16 40-16 40 0z" fill="#fffdf6" stroke="${INK}" stroke-width="2"/>
  <g stroke="#c9bfa8" stroke-width="2"><path d="M676 172v62M764 172v62M690 172v62M750 172v62"/></g>
  <path d="M706 240v-40a14 14 0 0 1 28 0v40z" fill="#5a3f2a" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="720" cy="180" r="6" fill="#ffd36e" stroke="${INK}" stroke-width="1.5"/>
  <!-- Atrio escalonado y plaza -->
  <path d="M560 240h320v8H560zM548 248h344v8H548zM536 256h368v8H536z" fill="#e6dcc6" stroke="${INK}" stroke-width="2"/>
  <rect x="0" y="264" width="1200" height="46" fill="#c9bfa8" stroke="${INK}" stroke-width="3"/>
  <g class="palomas" fill="#8d93a8" stroke="${INK}" stroke-width="1"><ellipse cx="600" cy="276" rx="5" ry="3"/><ellipse cx="640" cy="284" rx="5" ry="3"/><ellipse cx="820" cy="280" rx="5" ry="3"/><ellipse cx="860" cy="288" rx="5" ry="3"/></g>
</svg>`;
  }

  /* ============================ YASUNÍ ============================== */
  function yasuni() {
    const copa = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${INK}" stroke-width="2.5"/>`;
    let selva = "";
    for (let i = 0; i < 26; i++) { const x = i * 48 + (i % 2) * 14, y = 200 + (i * 7 % 18); selva += copa(x, y, 30 + (i * 5 % 12), i % 3 ? "#2e8f57" : "#3fae6b"); }
    const guaca = (cls, c1, c2) => `<g class="${cls}"><path d="M0 0q8-10 18-2l14 2-14 4q-10 6-18-4z" fill="${c1}" stroke="${INK}" stroke-width="1.5"/>
      <path class="ala" d="M8 0q4-12 14-14q-2 10-8 14z" fill="${c2}" stroke="${INK}" stroke-width="1.5"/><path d="M-6 0l6-2v4z" fill="${c2}"/></g>`;
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <g class="neblina"><ellipse cx="300" cy="170" rx="260" ry="14" fill="#fff" opacity=".35"/><ellipse cx="980" cy="160" rx="240" ry="12" fill="#fff" opacity=".3"/></g>
  ${selva}
  <!-- Ceibo gigante -->
  <path d="M708 262c4-30 6-70 4-110h16c-2 40 0 80 4 110c8 4 14 6 22 6h-68c8 0 14-2 22-6z" fill="#b9a68a" stroke="${INK}" stroke-width="2.5"/>
  <path d="M712 180c-20-10-50-8-70-2M728 170c20-12 50-12 72-4" fill="none" stroke="#b9a68a" stroke-width="7" stroke-linecap="round"/>
  <path d="M712 180c-20-10-50-8-70-2M728 170c20-12 50-12 72-4" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>
  <ellipse cx="640" cy="164" rx="44" ry="18" fill="#3fae6b" stroke="${INK}" stroke-width="2.5"/>
  <ellipse cx="800" cy="154" rx="48" ry="20" fill="#3fae6b" stroke="${INK}" stroke-width="2.5"/>
  <ellipse cx="720" cy="130" rx="60" ry="24" fill="#4fbf78" stroke="${INK}" stroke-width="2.5"/>
  <!-- Río y canoa -->
  <rect x="0" y="262" width="1200" height="48" fill="#8a6a4a" stroke="${INK}" stroke-width="3"/>
  <g class="olas" fill="none" stroke="#c9a77f" stroke-width="2" stroke-linecap="round"><path d="M80 276q10-5 20 0t20 0M380 284q10-5 20 0t20 0M760 278q10-5 20 0t20 0M1040 286q10-5 20 0t20 0"/></g>
  <g class="bote"><path d="M0 276h46l-6 6h-34z" fill="#6b4a2f" stroke="${INK}" stroke-width="2"/><path d="M20 276v-10" stroke="${INK}" stroke-width="2"/><circle cx="20" cy="262" r="3" fill="#6b4a2f"/></g>
  ${guaca("vuela1", "#e63b2e", "#2a7de1")}${guaca("vuela2", "#2a7de1", "#ffcf33")}
</svg>`;
  }

  /* ========================= MITAD DEL MUNDO ========================= */
  function mitad() {
    return `
<svg class="paisaje" viewBox="0 40 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs><linearGradient id="andesita" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c7856a"/><stop offset="1" stop-color="#9c5f48"/></linearGradient></defs>
  <g class="nube"><ellipse cx="0" cy="110" rx="60" ry="18" fill="#fff" opacity=".9"/><ellipse cx="30" cy="98" rx="34" ry="18" fill="#fff" opacity=".9"/></g>
  <g class="ave"><path class="ala" d="M-28 0q14-14 28 0q14-14 28 0" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>
  <path d="M0 300V190l160-40 180 30 200-60 200 50 200-40 260 40v130z" fill="var(--h1)" stroke="${INK}" stroke-width="3.5"/>
  <!-- Pirámide de 30 m con la esfera terrestre -->
  <path d="M694 250l10-150h32l10 150z" fill="url(#andesita)" stroke="${INK}" stroke-width="3"/>
  <path d="M708 112h24M707 130h26M706 150h28M705 170h30M704 190h32M703 210h34M702 230h36" stroke="#8a4f3a" stroke-width="1.4"/>
  <rect x="712" y="160" width="16" height="22" fill="#4f6fae" stroke="${INK}" stroke-width="1.5"/>
  <g class="globo"><circle cx="720" cy="84" r="17" fill="#d6c6a8" stroke="${INK}" stroke-width="2.5"/>
    <path d="M703 84h34" stroke="#c9a35a" stroke-width="3"/>
    <path d="M712 74q4-4 10-2q3 4-2 6q-6 0-8-4zM724 90q6-2 8 2q-2 5-7 3z" fill="#9c8a6a"/></g>
  <!-- Monolitos de las esquinas y escalinatas -->
  <rect x="640" y="230" width="18" height="22" fill="url(#andesita)" stroke="${INK}" stroke-width="2"/>
  <rect x="782" y="230" width="18" height="22" fill="url(#andesita)" stroke="${INK}" stroke-width="2"/>
  <path d="M630 250h180v8H630zM618 258h204v8H618z" fill="#e6dcc6" stroke="${INK}" stroke-width="2"/>
  <!-- Línea equinoccial -->
  <rect x="0" y="266" width="1200" height="44" fill="#d9cfbb" stroke="${INK}" stroke-width="3"/>
  <path d="M720 266v44" stroke="#ffcf33" stroke-width="6"/>
  <text x="732" y="292" font-family="Nunito, sans-serif" font-weight="800" font-size="12" fill="${INK}">0° 0' 0"</text>
  <g>${["#ffd100","#ed1c24","#034ea2","#1fa96b"].map((c, k) => `<line x1="${560 + k * 18}" y1="266" x2="${560 + k * 18}" y2="232" stroke="${INK}" stroke-width="1.5"/><rect class="ondea" x="${560 + k * 18}" y="232" width="12" height="8" fill="${c}" stroke="${INK}" stroke-width="1" style="transform-origin:${560 + k * 18}px 232px"/>`).join("")}</g>
</svg>`;
  }

  window.ESCENAS = [
    { id: "rotonda", svg: manana, lugar: "Hemiciclo de La Rotonda · Guayaquil",
      dato: "El Hemiciclo de La Rotonda, en el Malecón 2000 de Guayaquil, recuerda la Entrevista de Guayaquil entre Simón Bolívar y José de San Martín, el 26 de julio de 1822. Se inauguró en 1938." },
    { id: "carondelet", svg: tarde, lugar: "Palacio de Carondelet · Quito",
      dato: "El Palacio de Carondelet, sede del Gobierno del Ecuador, se construyó entre 1790 y 1801 frente a la Plaza Grande. Simón Bolívar lo nombró así en honor al Barón de Carondelet." },
    { id: "panecillo", svg: panecillo, lugar: "Virgen de El Panecillo · Quito",
      dato: "La Virgen de El Panecillo mide 41 metros con su base, está hecha con 7 400 piezas de aluminio y se terminó en 1975. Copia a la Virgen de Quito que Bernardo de Legarda talló en 1734: con alas, sobre el globo terrestre y con un dragón encadenado." },
    { id: "galapagos", svg: galapagos, lugar: "Islas Galápagos · Patrimonio Natural",
      dato: "Las Galápagos están a unos 1 000 km del continente y son de origen volcánico. El piquero de patas azules muestra sus patas en su cortejo y las tortugas gigantes pueden vivir más de 100 años." },
    { id: "ingapirca", svg: ingapirca, lugar: "Ingapirca · Cañar",
      dato: "Ingapirca significa «muro del Inca» en kichwa. Fue un centro ceremonial cañari y luego inca; su Templo del Sol, de forma ovalada, está a unos 3 160 metros de altura en la provincia de Cañar." },
    { id: "cuenca", svg: cuenca, lugar: "Catedral de la Inmaculada · Cuenca",
      dato: "La Catedral Nueva de Cuenca se empezó a construir en 1885. Sus cúpulas están cubiertas con azulejo celeste checo y sus torres quedaron más bajas por un error de cálculo en el diseño." },
    { id: "basilica", svg: basilica, lugar: "Basílica del Voto Nacional · Quito",
      dato: "La Basílica del Voto Nacional, el mayor templo neogótico de América, se empezó en 1892. En lugar de gárgolas clásicas, de sus muros salen tortugas, iguanas y otros animales del Ecuador." },
    { id: "sanfrancisco", svg: sanfrancisco, lugar: "Iglesia de San Francisco · Quito",
      dato: "La iglesia y convento de San Francisco, frente a su gran plaza en el Centro Histórico de Quito, es uno de los conjuntos religiosos más grandes de América. Se empezó a construir pocos años después de la fundación española de Quito, en 1534, y su obra tomó más de un siglo." },
    { id: "yasuni", svg: yasuni, lugar: "Parque Nacional Yasuní · Amazonía",
      dato: "El Yasuní es Reserva de la Biosfera de la UNESCO desde 1989 y tiene más de 600 especies de aves. En la consulta popular del 20 de agosto de 2023, cerca del 59 % votó por dejar bajo tierra el petróleo del bloque ITT (bloque 43)." },
    { id: "mitad", svg: mitad, lugar: "Mitad del Mundo · Pichincha",
      dato: "El monumento de la Mitad del Mundo es una pirámide de 30 metros terminada en 1982, con una esfera de piedra que representa a la Tierra. Recuerda a la Misión Geodésica Francesa del siglo XVIII." }
  ];
  /* escena con la que abre la portada según la hora */
  window.ESCENA_INICIAL = { manana: "rotonda", tarde: "carondelet", noche: "panecillo" };
})();
