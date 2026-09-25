/* Dicho y Hecho — kit de piezas para las viñetas.
   Cada pieza es una función que devuelve SVG en coordenadas locales:
   el origen (0,0) está en los pies / la base del objeto. */
const C = {
  bg: '#12091F', surf: '#1E1233', panel: '#2A1747', suelo: '#2B1B4D',
  mag: '#FF3EA5', cya: '#2EE6F0', lim: '#D7FF3A', ora: '#FF8A2A', cre: '#FFF6E9',
  mut: '#CBB8E6', piel: '#F2B48A', cuero: '#5A3322', met: '#3A3350', acero: '#9C98B0',
  madera: '#A0662F', barro: '#C4561A', verde: '#3DBA5A', rojo: '#E5334B', oro: '#FFD23F', rosa: '#FF9CC8'
};
const O = `stroke="${C.bg}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const O3 = `stroke="${C.bg}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const FONT = 'Bangers, Impact, sans-serif';
const limb = (d, c, w = 8) =>
  `<path d="${d}" fill="none" stroke="${C.bg}" stroke-width="${w + 5}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const ln = (d, c = C.bg, w = 3) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const txt = (x, y, t, s = 20, c = C.bg, extra = '') =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="${FONT}" font-size="${s}" fill="${c}" ${extra}>${t}</text>`;
function starPts(ro, ri, n) {
  const p = [];
  for (let k = 0; k < 2 * n; k++) {
    const r = k % 2 ? ri : ro, a = Math.PI * k / n - Math.PI / 2;
    p.push(`${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`);
  }
  return p.join(' ');
}

/* ---------- caras (centro de la cabeza en 0,-90) ---------- */
function cara(c) {
  const ojos = `<circle cx="-7" cy="-92" r="2.8" fill="${C.bg}"/><circle cx="7" cy="-92" r="2.8" fill="${C.bg}"/>`;
  const cerr = ln('M-11 -92 Q-7 -96 -3 -92') + ln('M3 -92 Q7 -96 11 -92');
  switch (c) {
    case 'triste': return ojos + ln('M-7 -78 Q0 -85 7 -78');
    case 'llora': return cerr + `<ellipse cx="0" cy="-80" rx="6" ry="5" fill="${C.bg}"/>` + ln('M-8 -89 L-10 -66', C.cya, 4) + ln('M8 -89 L10 -66', C.cya, 4);
    case 'enojado': return ojos + ln('M-12 -100 L-3 -96') + ln('M12 -100 L3 -96') + ln('M-7 -79 Q0 -85 7 -79');
    case 'dormido': return ln('M-11 -91 Q-7 -88 -3 -91') + ln('M3 -91 Q7 -88 11 -91') + ln('M-4 -80 L4 -80');
    case 'guino': return `<circle cx="-7" cy="-92" r="2.8" fill="${C.bg}"/>` + ln('M3 -92 Q7 -96 11 -92') + ln('M11 -99 L3 -97') + ln('M-5 -82 Q3 -78 9 -85');
    case 'susto': return `<circle cx="-8" cy="-93" r="5.5" fill="${C.cre}" ${O3}/><circle cx="8" cy="-93" r="5.5" fill="${C.cre}" ${O3}/><circle cx="-8" cy="-93" r="2" fill="${C.bg}"/><circle cx="8" cy="-93" r="2" fill="${C.bg}"/><ellipse cx="0" cy="-79" rx="4" ry="5.5" fill="${C.bg}"/>`;
    case 'venda': return `<rect x="-21" y="-99" width="42" height="11" rx="3" fill="${C.mag}" ${O3}/>` + ln('M-8 -82 Q0 -75 8 -82');
    case 'dientes': return ojos + `<rect x="-10" y="-87" width="20" height="10" rx="3" fill="${C.cre}" ${O3}/>` + ln('M-3 -87 L-3 -77', C.bg, 2) + ln('M3 -87 L3 -77', C.bg, 2);
    case 'desdentado': return ojos + ln('M-8 -82 Q0 -76 8 -82') + `<rect x="-2" y="-83" width="4" height="4" fill="${C.cre}"/>`;
    case 'canta': return cerr + `<ellipse cx="0" cy="-80" rx="5" ry="6" fill="${C.bg}"/>`;
    case 'come': return cerr + `<circle cx="-12" cy="-82" r="5" fill="${C.rosa}"/><circle cx="12" cy="-82" r="5" fill="${C.rosa}"/>` + ln('M-5 -80 Q0 -77 5 -80');
    default: return ojos + ln('M-7 -83 Q0 -76 7 -83');
  }
}

const P = {};

/* ---------- personas ---------- */
P.tipo = (o = {}) => {
  const cam = o.camisa || C.mag, pan = o.pantalon || C.met, piel = o.piel || C.piel, acc = o.acc || [];
  const has = a => acc.includes(a);
  const pelo = has('abuelo') ? C.cre : (o.pelo || '#3A2A20');
  const A = {
    abajo: ['M-18 -60 L-28 -32', 'M18 -60 L28 -32'],
    arriba: ['M-18 -62 L-34 -100', 'M18 -62 L34 -100'],
    adelante: ['M-16 -60 L12 -50 L32 -58', 'M16 -60 L30 -46 L40 -58'],
    oidos: ['M-18 -60 L-34 -74 L-23 -90', 'M18 -60 L34 -74 L23 -90'],
    uno: ['M-18 -60 L-28 -32', 'M18 -62 L36 -98'],
    cintura: ['M-18 -60 L-33 -46 L-21 -38', 'M18 -60 L33 -46 L21 -38'],
    ofrece: ['M-18 -60 L-28 -32', 'M18 -60 L46 -58']
  }[o.brazos || 'abajo'];
  const end = d => d.trim().split(' ').slice(-2).map(v => +v.replace('L', ''));
  let s = '';
  s += `<rect x="-15" y="-30" width="12" height="28" rx="3" fill="${pan}" ${O}/><rect x="3" y="-30" width="12" height="28" rx="3" fill="${pan}" ${O}/>`;
  s += `<ellipse cx="-10" cy="-3" rx="10" ry="5" fill="${C.bg}"/><ellipse cx="10" cy="-3" rx="10" ry="5" fill="${C.bg}"/>`;
  s += `<rect x="-23" y="-72" width="46" height="48" rx="15" fill="${has('medico') ? C.cre : cam}" ${O}/>`;
  if (has('pijama')) s += [-14, -4, 6, 16].map(x => ln(`M${x} -68 L${x} -28`, C.cre, 2.5)).join('');
  if (has('campera')) s += `<path d="M-23 -60 Q-23 -72 -8 -72 L0 -50 L8 -72 Q23 -72 23 -60 L23 -36 Q23 -24 10 -24 L-10 -24 Q-23 -24 -23 -36 Z" fill="${C.cuero}" ${O}/>` + ln('M-8 -72 L0 -50 L8 -72', C.cya, 2.5) + ln('M-20 -30 L20 -30', C.mag, 3);
  if (has('delantal')) s += `<rect x="-16" y="-62" width="32" height="38" rx="5" fill="#7A4526" ${O3}/>`;
  if (has('corbata')) s += `<polygon points="0,-70 -5,-62 0,-42 5,-62" fill="${C.lim}" ${O3}/>`;
  if (has('estetoscopio')) s += ln('M-12 -72 Q-14 -52 0 -52 Q14 -52 12 -72', C.acero, 3) + `<circle cx="0" cy="-50" r="4" fill="${C.acero}" ${O3}/>`;
  const [a1, a2] = A;
  s += limb(a1, cam === C.cre ? C.cre : cam, 9) + limb(a2, has('medico') ? C.cre : cam, 9);
  for (const d of [a1, a2]) {
    const [x, y] = end(d);
    s += has('guantes') ? `<circle cx="${x}" cy="${y}" r="10" fill="${C.rojo}" ${O}/>` : `<circle cx="${x}" cy="${y}" r="6" fill="${piel}" ${O3}/>`;
  }
  s += `<circle cx="0" cy="-90" r="20" fill="${piel}" ${O}/>`;
  const sinPelo = ['pelado', 'casco', 'sombrero', 'capitan', 'peluca', 'cresta', 'gorra', 'pirata'].some(has);
  if (has('abuelo')) s += `<path d="M-20 -94 Q-24 -104 -14 -106 L-14 -96 Z" fill="${C.cre}" ${O3}/><path d="M20 -94 Q24 -104 14 -106 L14 -96 Z" fill="${C.cre}" ${O3}/>`;
  else if (!sinPelo) s += `<path d="M-20 -92 Q-19 -114 0 -113 Q19 -114 20 -92 Q12 -104 0 -102 Q-12 -104 -20 -92 Z" fill="${pelo}" ${O3}/>`;
  if (has('pelado')) s += ln('M-10 -106 Q0 -110 10 -106', C.cre, 3);
  s += cara(o.cara || 'feliz');
  if (has('barba')) s += `<path d="M-19 -88 Q-18 -60 0 -60 Q18 -60 19 -88 Q10 -76 0 -79 Q-10 -76 -19 -88 Z" fill="#6B3A1E" ${O3}/>`;
  if (has('abuelo') || has('anteojos')) s += `<circle cx="-8" cy="-92" r="7" fill="none" ${O3}/><circle cx="8" cy="-92" r="7" fill="none" ${O3}/>` + ln('M-1 -92 L1 -92');
  if (has('casco')) s += `<path d="M-23 -94 A23 23 0 0 1 23 -94 Z" fill="${C.lim}" ${O}/>` + ln('M-27 -94 L27 -94', C.bg, 5);
  if (has('gorra')) s += `<path d="M-17 -104 Q0 -120 17 -104 Z" fill="${C.cre}" ${O3}/>` + ln('M-20 -104 L20 -104', C.cya, 4);
  if (has('capitan')) s += `<rect x="-19" y="-122" width="38" height="16" rx="4" fill="${C.cre}" ${O3}/><path d="M-20 -106 L20 -106 L14 -100 L-14 -100 Z" fill="${C.bg}"/><circle cx="0" cy="-114" r="4" fill="${C.oro}"/>`;
  if (has('sombrero')) s += `<rect x="-14" y="-124" width="28" height="20" rx="6" fill="#7A4526" ${O3}/><ellipse cx="0" cy="-104" rx="32" ry="6" fill="#7A4526" ${O3}/>`;
  if (has('peluca')) s += [[-20, -104], [-24, -90], [-22, -76], [20, -104], [24, -90], [22, -76], [-10, -112], [0, -114], [10, -112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${C.cre}" ${O3}/>`).join('');
  if (has('pirata')) s += `<path d="M-20 -96 Q0 -118 20 -96 Z" fill="${C.rojo}" ${O3}/>` + ln('M-20 -98 L22 -92', C.bg, 2) + `<circle cx="7" cy="-92" r="5.5" fill="${C.bg}"/>`;
  if (has('cresta')) s += `<polygon points="-6,-106 -10,-128 -2,-112 0,-134 4,-111 12,-126 7,-106" fill="${C.mag}" ${O3}/>`;
  return s;
};

P.bebe = (o = {}) =>
  `<ellipse cx="0" cy="-20" rx="18" ry="19" fill="${C.cre}" ${O}/>` + ln('M-18 -24 L18 -24', C.cya, 3) +
  limb(o.cara === 'llora' ? 'M-14 -30 L-26 -50' : 'M-14 -28 L-22 -14', C.piel, 7) + limb(o.cara === 'llora' ? 'M14 -30 L26 -50' : 'M14 -28 L22 -14', C.piel, 7) +
  `<g transform="translate(0,32)"><circle cx="0" cy="-90" r="22" fill="${C.piel}" ${O}/>` + ln('M-2 -112 Q4 -118 2 -108') + cara(o.cara || 'feliz') + `</g>`;

P.piernas = () => `<rect x="-14" y="-40" width="12" height="40" rx="3" fill="${C.met}" ${O} transform="rotate(-12)"/><rect x="4" y="-40" width="12" height="40" rx="3" fill="${C.met}" ${O} transform="rotate(14)"/>` +
  `<ellipse cx="-18" cy="-42" rx="11" ry="6" fill="${C.bg}"/><ellipse cx="18" cy="-42" rx="11" ry="6" fill="${C.bg}"/>`;

P.mano = () => `<g transform="translate(-138,-200)"><g ${O}><path d="M40 260 L110 196 L150 232 L96 270 Z" fill="${C.piel}"/><ellipse cx="138" cy="200" rx="46" ry="30" fill="${C.piel}"/></g>` +
  ln('M112 206 Q138 214 170 204', C.bg, 4) + ln('M118 218 Q140 226 166 216', C.bg, 4) + `</g>`;

/* ---------- el hornero punk ---------- */
P.hornero = () => {
  const J = C.cuero, F = '#B8612B', MET = C.met;
  return `<g transform="translate(-100,-194)">
<g stroke="${C.acero}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M94 150 L84 168 L92 180"/><path d="M114 150 L124 166 L118 180"/></g>
<circle cx="84" cy="168" r="4" fill="${C.cya}"/><circle cx="124" cy="166" r="4" fill="${C.cya}"/>
<g stroke="${C.bg}" stroke-width="4" stroke-linejoin="round">
<path d="M80 178 L96 178 L106 187 L106 194 L76 194 L76 184 Z" fill="#7A4526"/><path d="M110 178 L126 178 L136 187 L136 194 L106 194 L106 184 Z" fill="#7A4526"/>
<polygon points="62,120 12,150 20,162 72,138" fill="${F}"/><circle cx="66" cy="100" r="22" fill="${MET}"/></g>
<circle cx="66" cy="100" r="16" fill="${C.ora}" opacity="0.35"/><circle cx="66" cy="100" r="9" fill="#FFB347" stroke="${C.bg}" stroke-width="3"/>
<g stroke="${C.bg}" stroke-width="5" stroke-linejoin="round"><ellipse cx="104" cy="118" rx="48" ry="40" fill="${J}"/><path d="M122 94 Q148 112 140 150 Q128 158 118 148 Q126 118 114 98 Z" fill="#FFD9A8"/></g>
<path d="M114 98 Q126 118 118 148" fill="none" stroke="${C.cya}" stroke-width="3" stroke-linecap="round"/>
<path d="M62 134 Q100 162 136 150" fill="none" stroke="${C.mag}" stroke-width="4" stroke-linecap="round"/>
<g transform="translate(76,88) rotate(-8)"><rect x="0" y="0" width="32" height="16" rx="4" fill="${C.lim}" stroke="${C.bg}" stroke-width="3"/><text x="16" y="12.5" text-anchor="middle" font-family="${FONT}" font-size="12" fill="${C.bg}">PUNK</text></g>
<g stroke="${C.bg}" stroke-width="4" stroke-linejoin="round"><path d="M70 110 Q100 102 122 126 Q100 142 66 130 Z" fill="#8A4A22"/><polygon points="80,142 94,142 87,152" fill="${C.ora}"/></g>
<g stroke="${C.cya}" stroke-width="2.5" stroke-linecap="round" fill="none"><path d="M78 116 L110 126"/><path d="M74 124 L104 132"/></g>
<g stroke="${C.bg}" stroke-width="5" stroke-linejoin="round"><polygon points="119,66 109,55 124,59 114,40 130,53 127,33 138,50 142,30 146,50 155,38 154,53 165,44 159,57" fill="#3A2A20"/>
<circle cx="142" cy="74" r="28" fill="#D9803F"/><polygon points="166,70 198,80 166,88" fill="#4A4458"/></g>
<ellipse cx="150" cy="92" rx="11" ry="7" fill="#FFD9A8"/>
<path d="M116 66 Q138 57 158 63" fill="none" stroke="${MET}" stroke-width="7" stroke-linecap="round"/>
<circle cx="152" cy="71" r="17" fill="${C.ora}" opacity="0.3"/><circle cx="152" cy="71" r="10" fill="${C.ora}" stroke="${MET}" stroke-width="4"/><circle cx="155" cy="69" r="3.5" fill="#FFE9A8"/>
<path d="M140 64 L164 62" fill="none" stroke="${C.bg}" stroke-width="5" stroke-linecap="round"/>
<line x1="170" y1="86" x2="196" y2="100" stroke="#F2D08A" stroke-width="3.5" stroke-linecap="round"/>
<g stroke="${C.bg}" stroke-width="3" stroke-linejoin="round"><polygon points="118,98 122,82 136,96" fill="${J}"/></g><path d="M122 82 L136 96" stroke="${C.cya}" stroke-width="2" fill="none"/>
</g>`;
};

/* ---------- animales ---------- */
P.vaca = () => [-40, -24, 16, 30].map(x => `<rect x="${x}" y="-30" width="11" height="30" rx="3" fill="${C.cre}" ${O}/>`).join('') +
  ln('M-46 -48 Q-62 -32 -56 -18', C.bg, 3) +
  `<ellipse cx="0" cy="-42" rx="50" ry="27" fill="${C.cre}" ${O}/><ellipse cx="-18" cy="-48" rx="11" ry="8" fill="${C.bg}"/><ellipse cx="14" cy="-34" rx="9" ry="6" fill="${C.bg}"/><ellipse cx="30" cy="-52" rx="6" ry="5" fill="${C.bg}"/>` +
  `<ellipse cx="4" cy="-16" rx="9" ry="6" fill="${C.rosa}" ${O3}/>` +
  limb('M42 -80 L36 -92', C.cre, 5) + limb('M64 -80 L70 -92', C.cre, 5) +
  `<ellipse cx="53" cy="-62" rx="19" ry="21" fill="${C.cre}" ${O}/><ellipse cx="57" cy="-48" rx="15" ry="10" fill="${C.rosa}" ${O3}/><circle cx="52" cy="-48" r="2" fill="${C.bg}"/><circle cx="62" cy="-48" r="2" fill="${C.bg}"/><circle cx="47" cy="-67" r="3" fill="${C.bg}"/><circle cx="60" cy="-67" r="3" fill="${C.bg}"/>`;

P.chancho = (o = {}) => {
  const rx = o.flaco ? 28 : 44, ry = o.flaco ? 19 : 28;
  let s = [-rx * 0.6, -rx * 0.25, rx * 0.2, rx * 0.55].map(x => `<rect x="${x.toFixed(0)}" y="-24" width="9" height="24" rx="3" fill="${C.rosa}" ${O}/>`).join('');
  s += ln(`M${-rx} -34 q-10 -6 -6 -14 q6 -2 4 6`, C.bg, 3);
  s += `<ellipse cx="0" cy="-34" rx="${rx}" ry="${ry}" fill="${C.rosa}" ${O}/>`;
  if (o.sucio) s += `<ellipse cx="-14" cy="-24" rx="12" ry="7" fill="#7A4526"/><ellipse cx="16" cy="-40" rx="9" ry="6" fill="#7A4526"/><ellipse cx="-4" cy="-50" rx="6" ry="4" fill="#7A4526"/>`;
  const hx = rx + 8;
  s += `<polygon points="${hx - 12},-60 ${hx - 16},-78 ${hx - 2},-64" fill="${C.rosa}" ${O3}/><circle cx="${hx}" cy="-46" r="18" fill="${C.rosa}" ${O}/><ellipse cx="${hx + 15}" cy="-42" rx="7" ry="9" fill="#FF7FB8" ${O3}/><circle cx="${hx + 14}" cy="-44" r="1.6" fill="${C.bg}"/><circle cx="${hx + 16}" cy="-39" r="1.6" fill="${C.bg}"/><circle cx="${hx + 2}" cy="-52" r="2.6" fill="${C.bg}"/>`;
  s += o.sucio ? ln(`M${hx - 6} -38 Q${hx} -34 ${hx + 6} -38`) : '';
  return s;
};

P.pollo = () => ln('M-6 -14 L-8 0 M6 -14 L8 0', C.ora, 3) + `<ellipse cx="0" cy="-24" rx="18" ry="18" fill="${C.cre}" ${O}/><path d="M6 -56 L10 -64 L14 -56 L18 -62 L18 -52 Z" fill="${C.rojo}" ${O3}/><circle cx="12" cy="-44" r="12" fill="${C.cre}" ${O}/><polygon points="22,-46 32,-42 22,-38" fill="${C.ora}" ${O3}/><circle cx="15" cy="-47" r="2" fill="${C.bg}"/>`;

P.perro = (o = {}) => [-14, -4, 8, 16].map(x => `<rect x="${x}" y="-16" width="7" height="16" rx="3" fill="#C98B4F" ${O3}/>`).join('') +
  ln('M-20 -26 Q-30 -40 -24 -46', C.bg, 4) +
  `<ellipse cx="0" cy="-22" rx="22" ry="13" fill="#C98B4F" ${O}/><circle cx="22" cy="-38" r="14" fill="#C98B4F" ${O}/><ellipse cx="15" cy="-44" rx="6" ry="11" fill="#7A4526" ${O3} transform="rotate(20 15 -44)"/><circle cx="25" cy="-42" r="2.6" fill="${C.bg}"/><circle cx="36" cy="-36" r="3.5" fill="${C.bg}"/>` +
  (o.ladra ? `<path d="M26 -30 L38 -28 L30 -22 Z" fill="${C.bg}"/>` : ln('M28 -30 Q32 -28 35 -31'));

P.gato = () => ln('M-26 -20 Q-44 -30 -38 -50', '#6B4FA0', 6) + `<ellipse cx="0" cy="-20" rx="26" ry="16" fill="#6B4FA0" ${O}/><polygon points="14,-52 16,-68 26,-56" fill="#6B4FA0" ${O3}/><polygon points="32,-54 40,-68 42,-50" fill="#6B4FA0" ${O3}/><circle cx="28" cy="-40" r="15" fill="#6B4FA0" ${O}/><ellipse cx="23" cy="-42" rx="3.5" ry="2" fill="${C.lim}"/><ellipse cx="34" cy="-42" rx="3.5" ry="2" fill="${C.lim}"/>` + ln('M22 -46 L27 -44 M36 -46 L31 -44', C.bg, 2) + ln('M26 -33 Q29 -31 32 -33', C.bg, 2);

P.yaguarete = () => [-34, -18, 16, 32].map(x => `<rect x="${x}" y="-24" width="10" height="24" rx="4" fill="#F4B63A" ${O}/>`).join('') +
  ln('M-44 -36 Q-66 -40 -62 -64', '#F4B63A', 7) +
  `<ellipse cx="0" cy="-34" rx="46" ry="22" fill="#F4B63A" ${O}/>` + [[-26, -38], [-8, -26], [8, -42], [24, -30], [-20, -22], [30, -44], [-2, -48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="${C.bg}" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="1.6" fill="${C.bg}"/>`).join('') +
  `<circle cx="36" cy="-66" r="6" fill="#F4B63A" ${O3}/><circle cx="62" cy="-66" r="6" fill="#F4B63A" ${O3}/><circle cx="50" cy="-50" r="20" fill="#F4B63A" ${O}/><ellipse cx="54" cy="-42" rx="9" ry="6" fill="${C.cre}" ${O3}/><circle cx="54" cy="-45" r="2.5" fill="${C.bg}"/>` +
  `<circle cx="43" cy="-54" r="2.6" fill="${C.bg}"/><circle cx="57" cy="-54" r="2.6" fill="${C.bg}"/>` + ln('M38 -60 L47 -57 M62 -60 L53 -57');

P.liebre = (o = {}) => `<ellipse cx="0" cy="-22" rx="22" ry="19" fill="#C9B79C" ${O}/><ellipse cx="10" cy="-80" rx="6" ry="20" fill="#C9B79C" ${O3} transform="rotate(-10 10 -80)"/><ellipse cx="24" cy="-78" rx="6" ry="20" fill="#C9B79C" ${O3} transform="rotate(12 24 -78)"/><circle cx="18" cy="-50" r="14" fill="#C9B79C" ${O}/>` +
  ln('M11 -52 Q15 -55 19 -52') + `<circle cx="25" cy="-52" r="2.4" fill="${C.bg}"/>` + (o.lengua ? `<path d="M24 -42 Q30 -42 28 -34 Q24 -32 22 -40 Z" fill="${C.rosa}" ${O3}/>` : '') + `<circle cx="-22" cy="-22" r="6" fill="${C.cre}" ${O3}/>`;

P.oso = () => `<rect x="-24" y="-24" width="18" height="24" rx="6" fill="#7A4526" ${O}/><rect x="6" y="-24" width="18" height="24" rx="6" fill="#7A4526" ${O}/><ellipse cx="0" cy="-58" rx="32" ry="40" fill="#7A4526" ${O}/><ellipse cx="0" cy="-52" rx="18" ry="24" fill="#C98B4F"/>` +
  limb('M-26 -76 L-40 -52', '#7A4526', 14) + limb('M26 -80 L46 -112', '#7A4526', 14) +
  `<circle cx="-18" cy="-118" r="8" fill="#7A4526" ${O3}/><circle cx="18" cy="-118" r="8" fill="#7A4526" ${O3}/><circle cx="0" cy="-104" r="22" fill="#7A4526" ${O}/><ellipse cx="0" cy="-96" rx="10" ry="8" fill="#C98B4F" ${O3}/><circle cx="0" cy="-99" r="3" fill="${C.bg}"/><circle cx="-8" cy="-110" r="2.6" fill="${C.bg}"/><circle cx="8" cy="-110" r="2.6" fill="${C.bg}"/>`;

P.caballo = (o = {}) => {
  const col = o.color || '#C98B4F';
  let s = [-34, -20, 18, 32].map(x => `<rect x="${x}" y="-40" width="10" height="40" rx="3" fill="${col}" ${O}/>`).join('');
  s += ln('M-44 -58 Q-60 -52 -58 -30', '#3A2A20', 7);
  s += `<ellipse cx="0" cy="-56" rx="46" ry="22" fill="${col}" ${O}/><polygon points="26,-68 44,-104 60,-96 44,-56" fill="${col}" ${O}/>`;
  s += `<ellipse cx="62" cy="-92" rx="12" ry="24" fill="${col}" ${O} transform="rotate(62 62 -92)"/><polygon points="46,-112 50,-124 56,-110" fill="${col}" ${O3}/>`;
  s += ln('M28 -70 L44 -108', '#3A2A20', 6) + `<circle cx="58" cy="-102" r="2.6" fill="${C.bg}"/>`;
  if (o.dientes) s += `<rect x="72" y="-86" width="10" height="8" rx="2" fill="${C.cre}" ${O3}/>`;
  if (o.mono) s += `<path d="M30 -76 L20 -88 L20 -66 Z M30 -76 L40 -88 L40 -66 Z" fill="${C.mag}" ${O3}/><circle cx="30" cy="-76" r="4" fill="${C.mag}" ${O3}/>`;
  return s;
};

P.cuervo = () => ln('M-4 -12 L-6 0 M6 -12 L8 0', C.acero, 3) + `<polygon points="-20,-24 -40,-14 -18,-12" fill="#2B2140" ${O3}/><ellipse cx="0" cy="-24" rx="20" ry="16" fill="#2B2140" stroke="${C.mut}" stroke-width="2"/><circle cx="14" cy="-42" r="12" fill="#2B2140" stroke="${C.mut}" stroke-width="2"/><polygon points="24,-44 38,-40 24,-36" fill="${C.acero}" ${O3}/><circle cx="17" cy="-44" r="4" fill="${C.lim}"/>` + ln('M11 -48 L22 -45', C.mut, 2.5);

P.pez = (o = {}) => `<polygon points="-30,-30 -54,-48 -54,-12" fill="${C.cya}" ${O}/><ellipse cx="0" cy="-30" rx="34" ry="22" fill="${C.cya}" ${O}/>` + ln('M-10 -48 Q-4 -30 -10 -12', C.bg, 2.5) +
  `<circle cx="14" cy="-38" r="6" fill="${C.cre}" ${O3}/><circle cx="16" cy="-38" r="2.4" fill="${C.bg}"/>` + (o.boca ? `<ellipse cx="32" cy="-24" rx="9" ry="8" fill="${C.bg}"/><ellipse cx="34" cy="-22" rx="4" ry="3" fill="${C.rojo}"/>` : '');

P.caracol = (o = {}) => `<path d="M-30 0 L40 0 Q50 0 50 -10 L50 -26" fill="#9EE06B" ${O}/><path d="M-30 0 Q-34 -10 -20 -12 L40 -12 Q48 -12 50 -26" fill="#9EE06B" ${O}/>` +
  ln('M44 -26 L40 -44', C.bg, 3) + ln('M50 -26 L56 -42', C.bg, 3) + `<circle cx="40" cy="-46" r="3.5" fill="${C.bg}"/><circle cx="56" cy="-44" r="3.5" fill="${C.bg}"/>` +
  `<circle cx="0" cy="-32" r="26" fill="${C.ora}" ${O}/>` + ln('M0 -32 m-4 0 a4 4 0 1 1 8 0 a8 8 0 1 1 -16 0 a13 13 0 1 1 26 0', C.bg, 3) +
  (o.gorrito ? `<polygon points="44,-50 52,-74 60,-50" fill="${C.mag}" ${O3}/><circle cx="52" cy="-76" r="4" fill="${C.lim}"/>` : '');

P.camaron = (o = {}) => `<path d="M-40 -10 Q-44 -40 -10 -46 Q24 -50 34 -26 Q20 -30 10 -24 Q-10 -18 -18 -6 Z" fill="#FF7F6B" ${O}/>` +
  [-24, -12, 0, 12].map(x => ln(`M${x} -44 Q${x + 4} -32 ${x - 2} -20`, C.bg, 2)).join('') + `<polygon points="-40,-10 -54,-2 -46,-18" fill="#FF7F6B" ${O3}/>` +
  ln('M30 -32 Q44 -54 60 -56', C.bg, 2) + ln('M28 -30 Q46 -46 62 -44', C.bg, 2) +
  (o.antifaz ? `<rect x="14" y="-42" width="20" height="9" rx="4" fill="${C.mag}" ${O3}/>` : `<circle cx="24" cy="-38" r="3" fill="${C.bg}"/>`);

P.diablito = (o = {}) => {
  let s = ln('M-14 -30 Q-34 -26 -34 -44', C.rojo, 4) + `<polygon points="-34,-44 -40,-54 -28,-50" fill="${C.rojo}" ${O3}/>`;
  s += `<rect x="-10" y="-20" width="8" height="20" rx="3" fill="${C.rojo}" ${O3}/><rect x="2" y="-20" width="8" height="20" rx="3" fill="${C.rojo}" ${O3}/>`;
  s += `<ellipse cx="0" cy="-34" rx="17" ry="18" fill="${C.rojo}" ${O}/>` + limb('M12 -40 L26 -52', C.rojo, 6) + limb('M-12 -40 L-24 -30', C.rojo, 6);
  s += `<polygon points="-12,-72 -18,-88 -4,-76" fill="${C.cre}" ${O3}/><polygon points="12,-72 18,-88 4,-76" fill="${C.cre}" ${O3}/><circle cx="0" cy="-62" r="17" fill="${C.rojo}" ${O}/>`;
  s += `<circle cx="-6" cy="-64" r="2.6" fill="${C.bg}"/><circle cx="6" cy="-64" r="2.6" fill="${C.bg}"/>` + ln('M-6 -55 Q0 -51 7 -56');
  if (o.viejo) s += `<path d="M-12 -56 Q-10 -36 0 -34 Q10 -36 12 -56 Q0 -50 -12 -56 Z" fill="${C.cre}" ${O3}/><circle cx="-6" cy="-64" r="6" fill="none" ${O3}/><circle cx="6" cy="-64" r="6" fill="none" ${O3}/>` + ln('M-24 -30 L-26 0', C.madera, 4);
  return s;
};

/* ---------- objetos ---------- */
P.taza = (o = {}) => `<path d="M-14 -26 L14 -26 L11 0 L-11 0 Z" fill="${C.cre}" ${O}/><path d="M13 -20 Q24 -18 12 -6" fill="none" ${O}/><rect x="-12" y="-26" width="24" height="5" fill="${C.cre}"/>` +
  (o.humo ? ln('M-6 -32 Q-12 -40 -6 -48 Q0 -56 -6 -62', C.mut, 3) + ln('M6 -32 Q0 -40 6 -48 Q12 -56 6 -62', C.mut, 3) : '');
P.parrilla = (o = {}) => {
  let s = ln('M-40 0 L-30 -44 M40 0 L30 -44', C.acero, 5);
  if (o.fuego) s += P.fuego({ s: o.incendio ? 1.6 : 1 }).replace('<g>', `<g transform="translate(0,-40)">`);
  s += `<rect x="-46" y="-50" width="92" height="10" rx="3" fill="${C.met}" ${O}/>`;
  s += `<ellipse cx="-20" cy="-54" rx="14" ry="6" fill="#B8452F" ${O3}/><ellipse cx="8" cy="-55" rx="12" ry="6" fill="#B8452F" ${O3}/><rect x="22" y="-60" width="18" height="8" rx="4" fill="#8A3A1E" ${O3}/>`;
  if (o.humo || o.incendio) s += ln('M-20 -64 Q-28 -76 -20 -88 Q-12 -100 -20 -112', C.mut, 4) + ln('M10 -64 Q2 -78 12 -92 Q22 -104 12 -118', C.mut, 4);
  return s;
};
P.fuego = (o = {}) => `<g><g transform="scale(${o.s || 1})"><path d="M-34 0 Q-40 -30 -22 -44 Q-20 -26 -10 -24 Q-14 -50 4 -62 Q4 -38 16 -34 Q18 -50 30 -52 Q40 -26 34 0 Z" fill="${C.ora}" ${O}/><path d="M-16 0 Q-18 -18 -6 -26 Q-4 -12 4 -12 Q6 -26 16 -28 Q22 -12 18 0 Z" fill="${C.lim}"/></g></g>`;
P.mate = () => `<path d="M-14 -6 Q-18 -30 -10 -34 L10 -34 Q18 -30 14 -6 Q10 2 0 2 Q-10 2 -14 -6 Z" fill="#8A5A2B" ${O}/><ellipse cx="0" cy="-34" rx="11" ry="4" fill="#5C8A2E" ${O3}/>` + ln('M4 -34 L14 -58', C.acero, 4);
P.pan = () => `<ellipse cx="0" cy="-10" rx="30" ry="11" fill="#E0A45A" ${O}/>` + ln('M-16 -16 L-10 -6 M-4 -18 L2 -6 M8 -16 L14 -6', '#A0662F', 2.5);
P.panera = (o = {}) => (o.vacia ? '' : `<ellipse cx="-14" cy="-22" rx="16" ry="9" fill="#E0A45A" ${O3}/><ellipse cx="14" cy="-24" rx="16" ry="9" fill="#E0A45A" ${O3}/><ellipse cx="0" cy="-30" rx="16" ry="9" fill="#E0A45A" ${O3}/>`) +
  `<path d="M-32 -20 L32 -20 L24 0 L-24 0 Z" fill="${C.madera}" ${O}/>` + ln('M-26 -10 L26 -10', '#7A4526', 2.5);
P.pizza = () => `<circle cx="0" cy="-24" r="36" fill="${C.oro}" ${O}/><circle cx="0" cy="-24" r="30" fill="#FFB347"/>` +
  [[-12, -40], [10, -36], [-16, -18], [14, -12], [0, -26], [20, -30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${C.rojo}"/>`).join('') +
  ln('M0 -24 L0 -60 M0 -24 L-10 -58 M0 -24 L-20 -54 M0 -24 L-28 -47', C.bg, 3);
P.sandia = () => `<circle cx="0" cy="-18" r="18" fill="${C.verde}" ${O}/>` + ln('M-8 -34 Q-12 -18 -8 -2 M0 -36 L0 0 M8 -34 Q12 -18 8 -2', '#1E7A38', 3);
P.cartel = (o = {}) => { const w = o.w || 90; return `<rect x="-4" y="-60" width="8" height="60" fill="${C.madera}" ${O3}/><rect x="${-w / 2}" y="-92" width="${w}" height="36" rx="6" fill="${C.cre}" ${O}/>` + txt(0, -66, o.t || '', o.s || 20); };
P.chapa = (o = {}) => { const w = o.w || 60; return `<rect x="${-w / 2}" y="-24" width="${w}" height="24" rx="5" fill="${C.cre}" ${O}/>` + txt(0, -6, o.t || '', o.s || 16); };
P.globo = (o = {}) => {
  const w = o.w || 110, h = o.h || 44, lado = o.cola === 'der' ? 1 : -1;
  return `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="16" fill="${C.cre}" ${O}/><polygon points="${lado * w * 0.15},-6 ${lado * w * 0.42},16 ${lado * w * 0.3},-6" fill="${C.cre}" ${O}/><rect x="${-w / 2 + 3}" y="${-h + 3}" width="${w - 6}" height="${h - 8}" rx="13" fill="${C.cre}"/>` +
    txt(0, -h / 2 + 7, o.t || '', o.s || 18);
};
P.burst = (o = {}) => `<polygon points="${starPts(o.r || 46, (o.r || 46) * 0.78, 12)}" fill="${o.c || C.lim}" ${O} transform="translate(0,${-(o.r || 46)})"/>` + txt(0, -(o.r || 46) + 7, o.t || '', o.s || 20);
P.texto = (o = {}) => `<g transform="rotate(${o.rot || 0})">` + txt(0, 0, o.t || '', o.s || 30, o.c || C.lim, `stroke="${C.bg}" stroke-width="${o.sw || 2}" paint-order="stroke"`) + `</g>`;
P.moneda = () => `<circle cx="0" cy="-12" r="12" fill="${C.oro}" ${O3}/><circle cx="0" cy="-12" r="7" fill="none" stroke="#C99A1A" stroke-width="2.5"/>`;
P.billete = () => `<rect x="-22" y="-26" width="44" height="24" rx="3" fill="#6BD68A" ${O3}/><circle cx="0" cy="-14" r="6" fill="none" stroke="#1E7A38" stroke-width="2.5"/>`;
P.paraguas = (o = {}) => o.roto
  ? ln('M0 0 L0 -40', C.bg, 4) + `<path d="M-40 -74 Q-30 -40 0 -40 Q30 -40 40 -74 Q20 -60 10 -66 Q0 -58 -10 -66 Q-20 -60 -40 -74 Z" fill="${C.mag}" ${O}/>` + ln('M0 -40 L-12 -64 M0 -40 L12 -64', C.bg, 2.5) + ln('M18 -56 L26 -48 M22 -58 L28 -52', C.cre, 2)
  : ln('M0 0 L0 -44 Q0 -48 -6 -46', C.bg, 4) + `<path d="M-42 -44 Q-40 -84 0 -84 Q40 -84 42 -44 Q32 -52 21 -44 Q10 -52 0 -44 Q-10 -52 -21 -44 Q-32 -52 -42 -44 Z" fill="${C.mag}" ${O}/>`;
P.cantaro = (o = {}) => `<path d="M-14 -70 L14 -70 L12 -58 Q34 -44 26 -16 Q20 0 0 0 Q-20 0 -26 -16 Q-34 -44 -12 -58 Z" fill="#D9803F" ${O}/>` +
  `<circle cx="-7" cy="-38" r="2.6" fill="${C.bg}"/><circle cx="7" cy="-38" r="2.6" fill="${C.bg}"/>` + ln('M-6 -28 Q0 -32 6 -28') +
  (o.curitas ? [[-16, -18, 30], [16, -48, -25], [14, -12, 10]].map(([x, y, r]) => `<g transform="translate(${x},${y}) rotate(${r})"><rect x="-10" y="-4" width="20" height="8" rx="3" fill="${C.cre}" ${O3}/><rect x="-3" y="-4" width="6" height="8" fill="#F2D08A"/></g>`).join('') : '') +
  ln('M-10 0 L-12 10 M10 0 L12 10', C.bg, 4);
P.fuente = () => `<rect x="-8" y="-40" width="16" height="40" fill="${C.acero}" ${O}/><ellipse cx="0" cy="-40" rx="40" ry="10" fill="${C.acero}" ${O}/><ellipse cx="0" cy="-42" rx="32" ry="6" fill="${C.cya}"/>` + ln('M0 -44 Q-10 -80 -26 -50', C.cya, 4) + ln('M0 -44 Q10 -80 26 -50', C.cya, 4);
P.olla = () => `<path d="M-40 -30 L40 -30 Q36 0 0 0 Q-36 0 -40 -30 Z" fill="${C.cre}" ${O}/>` + [[-20, -34], [-6, -38], [8, -35], [22, -33], [-12, -30], [14, -29]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="#F2D08A" ${O3}/>`).join('') + `<ellipse cx="0" cy="-32" rx="10" ry="4" fill="${C.rojo}"/>`;
P.tijera = (o = {}) => `<g transform="rotate(${o.rot ?? 20})"><path d="M-6 0 L-46 -70 L-30 -74 Z" fill="${C.acero}" ${O}/><path d="M6 0 L46 -70 L30 -74 Z" fill="${C.acero}" ${O}/><circle cx="-14" cy="20" r="12" fill="none" stroke="${C.mag}" stroke-width="7"/><circle cx="14" cy="20" r="12" fill="none" stroke="${C.mag}" stroke-width="7"/><circle cx="0" cy="0" r="4" fill="${C.bg}"/></g>`;
P.palangana = () => `<path d="M-34 -18 L34 -18 L26 0 L-26 0 Z" fill="${C.acero}" ${O}/><ellipse cx="0" cy="-18" rx="34" ry="6" fill="${C.cya}" ${O3}/>`;
P.sol = (o = {}) => Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return ln(`M${(40 * Math.cos(a)).toFixed(1)} ${(-40 + 40 * Math.sin(a)).toFixed(1)} L${(54 * Math.cos(a)).toFixed(1)} ${(-40 + 54 * Math.sin(a)).toFixed(1)}`, C.oro, 5); }).join('') +
  `<circle cx="0" cy="-40" r="32" fill="${C.oro}" ${O}/>` + (o.cara ? ln('M-14 -46 Q-10 -50 -6 -46') + ln('M6 -46 Q10 -50 14 -46') + ln('M-8 -34 Q0 -28 8 -34') : '');
P.suelo = () => `<rect x="-10" y="0" width="362" height="40" fill="${C.suelo}"/>` + ln('M-10 0 L352 0', C.mag, 3);
P.escoba = () => `<g transform="rotate(-30)">` + ln('M0 0 L0 -70', C.madera, 5) + `<path d="M-12 0 L12 0 L18 26 L-18 26 Z" fill="${C.ora}" ${O}/>` + ln('M-8 6 L-10 24 M0 6 L0 24 M8 6 L10 24', '#B8612B', 2) + `</g>`;
P.anzuelo = (o = {}) => ln(`M0 0 L0 ${o.l || 120}`, C.mut, 2) + `<path d="M0 ${o.l || 120} L0 ${(o.l || 120) + 16} Q0 ${(o.l || 120) + 28} -10 ${(o.l || 120) + 22}" fill="none" stroke="${C.acero}" stroke-width="4" stroke-linecap="round"/>`;
P.megafono = () => `<g transform="rotate(-18)"><rect x="-22" y="-10" width="16" height="20" rx="3" fill="${C.met}" ${O3}/><path d="M-6 -8 L30 -24 L30 24 L-6 8 Z" fill="${C.mag}" ${O}/></g>`;
P.calculadora = () => `<rect x="-30" y="-80" width="60" height="80" rx="8" fill="${C.met}" ${O}/><rect x="-22" y="-72" width="44" height="18" rx="3" fill="${C.lim}"/>` + txt(8, -58, '50/50', 13, C.bg) +
  [0, 1, 2].flatMap(r => [0, 1, 2].map(c => `<rect x="${-22 + c * 16}" y="${-48 + r * 15}" width="12" height="10" rx="2" fill="${C.cre}"/>`)).join('');
P.mesa = (o = {}) => { const w = o.w || 140; return `<rect x="${-w / 2 + 10}" y="-44" width="8" height="44" fill="#7A4526" ${O3}/><rect x="${w / 2 - 18}" y="-44" width="8" height="44" fill="#7A4526" ${O3}/><rect x="${-w / 2}" y="-52" width="${w}" height="10" rx="3" fill="${C.madera}" ${O}/>`; };
P.charco = (o = {}) => `<ellipse cx="0" cy="-4" rx="${o.rx || 50}" ry="${o.ry || 10}" fill="${o.c || C.cya}" ${O3}/>` + (o.c ? '' : ln('M-30 -6 Q-20 -10 -10 -6', C.cre, 2));
P.pozo = () => `<ellipse cx="0" cy="-6" rx="52" ry="14" fill="${C.bg}" stroke="${C.acero}" stroke-width="4"/>`;
P.timon = () => { let s = `<circle cx="0" cy="-60" r="34" fill="none" stroke="${C.bg}" stroke-width="13"/><circle cx="0" cy="-60" r="34" fill="none" stroke="${C.madera}" stroke-width="8"/>`; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; s += ln(`M0 -60 L${(46 * Math.cos(a)).toFixed(1)} ${(-60 + 46 * Math.sin(a)).toFixed(1)}`, C.madera, 5); } return s + `<circle cx="0" cy="-60" r="8" fill="${C.oro}" ${O3}/>` + ln('M0 -26 L0 0', C.madera, 6); };
P.cuchillo = (o = {}) => `<g transform="rotate(-25)"><rect x="-4" y="-12" width="8" height="20" rx="2" fill="${C.bg}"/><path d="M-6 -12 L6 -12 L4 -54 Q-6 -46 -6 -12 Z" fill="${o.palo ? C.madera : C.acero}" ${O3}/></g>`;
P.carne = () => `<path d="M-30 -10 Q-34 -30 -10 -32 Q20 -36 30 -20 Q34 -4 10 -2 Q-24 2 -30 -10 Z" fill="#B8452F" ${O}/>` + ln('M-16 -18 Q0 -26 16 -16', C.cre, 3);
P.yunque = () => `<path d="M-40 -44 L30 -44 Q44 -44 52 -52 Q46 -32 24 -32 L14 -32 L14 -16 L26 0 L-26 0 L-14 -16 L-14 -32 L-40 -32 Z" fill="${C.met}" ${O}/>`;
P.silbato = () => `<rect x="-30" y="-34" width="50" height="26" rx="12" fill="${C.lim}" ${O}/><rect x="16" y="-30" width="18" height="12" rx="3" fill="${C.lim}" ${O}/><circle cx="-18" cy="-26" r="3" fill="${C.bg}"/><circle cx="-4" cy="-26" r="3" fill="${C.bg}"/>` +
  ln('M-24 -33 L-14 -30 M2 -33 L-8 -30') + ln('M-16 -16 Q-10 -20 -4 -16') + `<path d="M-38 -44 q-4 6 0 8 q4 -2 0 -8" fill="${C.cya}"/><path d="M28 -46 q-4 6 0 8 q4 -2 0 -8" fill="${C.cya}"/>` + ln('M-20 -8 L-24 0 M8 -8 L12 0', C.bg, 4);
P.corneta = () => `<path d="M-30 -6 L10 -6 L34 -22 L34 18 L10 2 L-30 2 Z" fill="${C.oro}" ${O}/><rect x="-16" y="-14" width="6" height="10" fill="${C.oro}" ${O3}/><rect x="-4" y="-14" width="6" height="10" fill="${C.oro}" ${O3}/>`;
P.espejo = () => `<ellipse cx="0" cy="-60" rx="46" ry="58" fill="${C.ora}" ${O}/><ellipse cx="0" cy="-60" rx="38" ry="50" fill="#3B2B5E"/>` + `<g transform="translate(0,-60) scale(0.9)">${P.corneta()}</g>` + ln('M-24 -94 L-12 -104', C.cre, 3) + `<rect x="-6" y="-4" width="12" height="4" fill="${C.ora}"/>`;
P.yuyo = () => `<path d="M0 0 Q-4 -30 0 -60" fill="none" stroke="${C.verde}" stroke-width="6" stroke-linecap="round"/>` +
  [[-1, -18], [1, -32], [-1, -46]].map(([d, y]) => `<ellipse cx="${d * 16}" cy="${y}" rx="16" ry="7" fill="${C.lim}" ${O3} transform="rotate(${d * -25} ${d * 16} ${y})"/>`).join('') +
  `<circle cx="0" cy="-70" r="14" fill="${C.lim}" ${O}/><circle cx="-5" cy="-72" r="2.4" fill="${C.bg}"/>` + ln('M2 -72 Q6 -75 9 -72') + ln('M-6 -64 Q0 -60 7 -65');
P.balde = (o = {}) => `<path d="M-24 -44 L24 -44 L18 0 L-18 0 Z" fill="${C.acero}" ${O}/><path d="M-24 -44 Q0 -80 24 -44" fill="none" ${O}/><rect x="-18" y="-32" width="36" height="16" fill="${C.lim}" ${O3}/>` + txt(0, -19, o.t || '', 11);
P.banadera = () => `<path d="M-60 -44 L60 -44 L54 -10 Q50 0 36 0 L-36 0 Q-50 0 -54 -10 Z" fill="${C.cre}" ${O}/>` + ln('M-40 0 L-44 10 M40 0 L44 10', C.bg, 5) +
  [[-40, -50], [-26, -56], [30, -52], [44, -58], [0, -54]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${C.cya}" opacity="0.8" ${O3}/>`).join('') +
  `<ellipse cx="46" cy="-52" rx="9" ry="7" fill="${C.oro}" ${O3}/><circle cx="52" cy="-60" r="5" fill="${C.oro}" ${O3}/>`;
P.nido = () => `<path d="M-50 0 Q-50 -76 0 -76 Q50 -76 50 0 Z" fill="${C.barro}" ${O}/><ellipse cx="18" cy="-26" rx="12" ry="16" fill="${C.bg}"/>` + ln('M-36 -40 Q-20 -46 -6 -40 M-30 -18 Q-16 -22 -2 -18', '#8A3A1E', 3);
P.martillo = () => `<g transform="rotate(-30)">` + ln('M0 0 L0 -40', C.madera, 5) + `<rect x="-16" y="-52" width="32" height="14" rx="4" fill="#7A4526" ${O}/></g>`;
P.cartas = () => [-18, 0, 18].map(r => `<g transform="rotate(${r}) translate(0,-4)"><rect x="-12" y="-36" width="24" height="34" rx="3" fill="${C.cre}" ${O3}/><circle cx="0" cy="-19" r="5" fill="${C.rojo}"/></g>`).join('');
P.ladrillo = () => `<rect x="-26" y="-18" width="52" height="18" rx="2" fill="${C.barro}" ${O}/>` + ln('M-8 -18 L-8 0 M10 -18 L10 0', '#8A3A1E', 2);
P.camino = () => ln('M0 0 Q60 -20 120 0 T220 -4', C.mut, 3).replace('fill="none"', 'fill="none" stroke-dasharray="8 8"');
P.piedra = () => `<path d="M-14 0 Q-18 -14 -4 -18 Q14 -20 16 -6 Q16 2 0 2 Q-12 2 -14 0 Z" fill="${C.acero}" ${O3}/>`;
P.flotador = () => `<ellipse cx="0" cy="0" rx="34" ry="12" fill="${C.mag}" ${O}/><ellipse cx="0" cy="-2" rx="20" ry="5" fill="${C.bg}"/>` + ln('M-26 -6 L-22 8 M22 -6 L26 8', C.cre, 5);
P.colchon = () => `<rect x="-70" y="-20" width="140" height="22" rx="11" fill="${C.mag}" ${O}/>` + ln('M-40 -18 L-40 0 M-10 -18 L-10 0 M20 -18 L20 0 M48 -18 L48 0', C.bg, 2);
P.arbol = () => `<rect x="-5" y="-40" width="10" height="40" fill="#7A4526" ${O3}/><ellipse cx="0" cy="-100" rx="22" ry="66" fill="${C.verde}" ${O}/>` + ln('M-6 -140 Q-10 -100 -6 -60', '#1E7A38', 3);
P.red = () => `<g transform="rotate(70)">` + ln('M0 0 L0 -60', C.madera, 5) + `<ellipse cx="0" cy="-84" rx="20" ry="26" fill="${C.cre}" fill-opacity="0.25" ${O}/>` + ln('M-14 -100 L14 -70 M14 -100 L-14 -70 M0 -110 L0 -58', C.cre, 1.5) + `</g>`;
P.zapato = () => `<path d="M-30 0 L-30 -22 Q-30 -30 -20 -30 L0 -30 Q4 -16 20 -14 Q34 -12 34 0 Z" fill="#7A4526" ${O}/>` + ln('M-30 -4 L34 -4', C.bg, 4);
P.guirnalda = () => ln('M-170 0 Q0 30 170 0', C.mut, 2) + Array.from({ length: 11 }, (_, i) => { const x = -150 + i * 30, y = 30 * (1 - Math.pow(x / 170, 2)) * 0.9; return `<polygon points="${x - 9},${y.toFixed(0)} ${x + 9},${y.toFixed(0)} ${x},${(y + 16).toFixed(0)}" fill="${[C.mag, C.cya, C.lim][i % 3]}" ${O3}/>`; }).join('');
P.reposera = () => ln('M-34 0 L10 -50 M30 0 L-10 -30', C.acero, 4) + `<path d="M-30 -8 L6 -48 L22 -36 L-12 -4 Z" fill="${C.cya}" ${O3}/>` + ln('M-22 -14 L10 -42 M-14 -8 L16 -38', C.cre, 3);
P.banco = () => `<rect x="-90" y="-36" width="180" height="10" rx="3" fill="${C.madera}" ${O}/><rect x="-90" y="-60" width="180" height="10" rx="3" fill="${C.madera}" ${O}/>` + ln('M-80 -26 L-80 0 M80 -26 L80 0', C.met, 5);
P.maceta = () => `<path d="M-14 -24 L14 -24 L10 0 L-10 0 Z" fill="${C.barro}" ${O}/>` + `<ellipse cx="-8" cy="-34" rx="9" ry="5" fill="${C.lim}" ${O3} transform="rotate(-30 -8 -34)"/><ellipse cx="8" cy="-36" rx="9" ry="5" fill="${C.lim}" ${O3} transform="rotate(30 8 -36)"/>` + `<circle cx="-4" cy="-30" r="1.5" fill="${C.bg}"/><circle cx="4" cy="-30" r="1.5" fill="${C.bg}"/>`;
P.zapallo = () => `<ellipse cx="0" cy="-20" rx="28" ry="20" fill="${C.ora}" ${O}/>` + ln('M-10 -38 Q-16 -20 -10 -2 M10 -38 Q16 -20 10 -2', '#B8612B', 3) + `<rect x="-3" y="-46" width="6" height="10" fill="${C.verde}" ${O3}/>`;
P.notas = () => `<g fill="${C.lim}" ${O3}><ellipse cx="-12" cy="-4" rx="7" ry="5"/><rect x="-7" y="-34" width="3" height="30"/><ellipse cx="14" cy="-14" rx="7" ry="5"/><rect x="19" y="-44" width="3" height="30"/></g>` + ln('M-5 -34 L21 -44', C.lim, 4);
P.puerta = () => `<rect x="-36" y="-130" width="72" height="130" rx="4" fill="${C.surf}" ${O}/><rect x="-28" y="-122" width="56" height="122" fill="${C.mag}" opacity="0.35"/><path d="M-50 0 L50 0 L40 14 L-40 14 Z" fill="${C.rojo}"/>` +
  `<rect x="-26" y="-156" width="52" height="22" rx="4" fill="${C.lim}" ${O3}/>` + txt(0, -139, 'VIP', 18);
P.viento = () => ln('M0 0 Q40 -10 80 0 Q100 6 96 -10', C.mut, 3) + ln('M10 22 Q50 12 90 22', C.mut, 3) + ln('M-10 -24 Q30 -34 70 -24', C.mut, 3);
P.almanaque = (o = {}) => `<rect x="-34" y="-70" width="68" height="70" rx="5" fill="${C.cre}" ${O}/><rect x="-34" y="-70" width="68" height="18" rx="5" fill="${C.rojo}" ${O3}/>` + txt(0, -56, o.t || '', 14, C.cre) + txt(0, -16, '0', 36, C.bg) + ln('M-22 -40 L22 -8', C.rojo, 3);
P.bocaza = () => `<path d="M-80 -60 Q0 -110 80 -60 Q0 0 -80 -60 Z" fill="${C.mag}" ${O}/><path d="M-60 -60 Q0 -84 60 -60 Q0 -24 -60 -60 Z" fill="${C.bg}"/><rect x="-30" y="-78" width="60" height="12" rx="3" fill="${C.cre}"/>` +
  `<g transform="translate(48,-86) rotate(30)"><rect x="-22" y="-7" width="44" height="14" rx="5" fill="${C.cre}" ${O3}/><rect x="-6" y="-7" width="12" height="14" fill="#F2D08A"/></g>`;
P.botella = () => `<path d="M-12 0 L-12 -44 Q-12 -54 -4 -58 L-4 -76 L4 -76 L4 -58 Q12 -54 12 -44 L12 0 Z" fill="#5B1E3C" ${O}/><rect x="-10" y="-38" width="20" height="18" fill="${C.cre}"/>` + txt(0, -25, 'VINO', 8);
P.baston = (o = {}) => ln(`M0 0 L0 ${-(o.h || 40)} Q0 ${-(o.h || 40) - 10} 10 ${-(o.h || 40) - 8}`, C.madera, 5);
P.pajaro = () => ln('M-12 0 Q-6 -9 0 0 Q6 -9 12 0', C.cya, 3.5);
P.gotas = () => ln('M0 0 L-4 10', C.cya, 3);

/* ---------- fondos ---------- */
const FONDOS = {
  noche: u => `<rect width="342" height="254" fill="${C.panel}"/><rect width="342" height="254" fill="url(#d${u})"/>`,
  suelo: u => FONDOS.noche(u) + `<rect y="224" width="342" height="30" fill="${C.suelo}"/>` + ln('M0 224 L342 224', C.mag, 3),
  campo: u => FONDOS.noche(u) + `<path d="M0 196 Q80 176 170 196 T342 190 L342 254 L0 254 Z" fill="#241A45"/>` + `<rect y="224" width="342" height="30" fill="${C.suelo}"/>` + ln('M0 224 L342 224', C.lim, 3),
  interior: u => `<rect width="342" height="254" fill="#241440"/><rect width="342" height="254" fill="url(#d${u})"/><rect x="236" y="30" width="70" height="60" rx="4" fill="${C.panel}" ${O3}/>` + ln('M271 30 L271 90 M236 60 L306 60', C.bg, 3) + `<rect y="224" width="342" height="30" fill="#33204F"/>` + ln('M0 224 L342 224', C.cya, 3),
  calle: u => FONDOS.noche(u) + `<rect x="20" y="70" width="60" height="154" fill="#231538"/><rect x="262" y="40" width="70" height="184" fill="#231538"/>` + [[34, 90], [56, 90], [34, 130], [56, 130], [276, 64], [304, 64], [276, 110], [304, 110]].map(([x, y]) => `<rect x="${x}" y="${y}" width="12" height="16" fill="${C.oro}" opacity="0.5"/>`).join('') +
    `<rect y="224" width="342" height="30" fill="#2F2A3F"/>` + ln('M0 240 L342 240', C.lim, 3).replace('fill="none"', 'fill="none" stroke-dasharray="18 14"') + ln('M0 224 L342 224', C.mag, 3),
  rio: u => FONDOS.noche(u) + `<rect y="150" width="342" height="60" fill="${C.cya}" opacity="0.9"/>` + ln('M10 170 Q30 164 50 170 M120 186 Q140 180 160 186 M230 168 Q250 162 270 168 M60 196 Q80 190 100 196', C.bg, 2.5) + `<rect y="206" width="342" height="48" fill="${C.suelo}"/>` + ln('M0 206 L342 206', C.lim, 3),
  agua: u => `<rect width="342" height="254" fill="#16305C"/><rect width="342" height="254" fill="url(#d${u})"/>` + [[40, 60], [300, 90], [80, 200], [260, 210], [150, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="none" stroke="${C.cya}" stroke-width="2"/>`).join('') + `<path d="M0 230 Q60 220 120 232 T240 228 T342 230 L342 254 L0 254 Z" fill="#C9B79C"/>`,
  mar: u => FONDOS.noche(u) + `<rect y="176" width="342" height="78" fill="#1D4E89"/>` + ln('M0 182 Q20 176 40 182 T80 182 T120 182 T160 182 T200 182 T240 182 T280 182 T320 182 T360 182', C.cya, 3) + `<rect y="224" width="342" height="30" fill="#7A4526"/>` + ln('M0 224 L342 224', C.bg, 4),
  cordillera: u => FONDOS.noche(u) + `<polygon points="0,200 60,90 110,160 170,60 240,170 290,100 342,180 342,254 0,254" fill="#3A2A5E"/><polygon points="60,90 48,112 74,114" fill="${C.cre}"/><polygon points="170,60 154,90 190,92" fill="${C.cre}"/><polygon points="290,100 278,120 304,122" fill="${C.cre}"/>` + `<rect y="224" width="342" height="30" fill="${C.suelo}"/>` + ln('M0 224 L342 224', C.ora, 3),
  vinedo: u => FONDOS.noche(u) + [40, 110, 180, 250, 320].map(x => ln(`M${x} 224 L${x} 150`, C.madera, 4) + `<ellipse cx="${x}" cy="150" rx="28" ry="14" fill="${C.verde}" ${O3}/>` + [[-10, 162], [0, 166], [10, 162], [-5, 172], [5, 172]].map(([dx, y]) => `<circle cx="${x + dx}" cy="${y}" r="4" fill="${C.mag}"/>`).join('')).join('') + `<rect y="224" width="342" height="30" fill="${C.suelo}"/>` + ln('M0 224 L342 224', C.lim, 3),
  acequia: u => FONDOS.noche(u) + `<g transform="translate(40,206) scale(0.9)">${P.arbol()}</g><g transform="translate(300,206) scale(1)">${P.arbol()}</g><g transform="translate(250,206) scale(0.7)">${P.arbol()}</g>` +
    `<rect y="204" width="342" height="50" fill="${C.suelo}"/><rect y="226" width="342" height="14" fill="${C.cya}" ${O3}/>` + ln('M30 233 Q40 229 50 233 M150 233 Q160 229 170 233 M260 233 Q270 229 280 233', C.bg, 2),
  horizonte: u => FONDOS.noche(u) + `<rect y="224" width="342" height="30" fill="${C.suelo}"/>` + ln('M0 224 L342 224', C.mag, 3),
  lluvia: u => FONDOS.noche(u) + Array.from({ length: 36 }, (_, i) => { const x = (i * 47) % 342, y = (i * 73) % 200; return ln(`M${x} ${y} L${x - 6} ${y + 16}`, C.cya, 2.5); }).join('') + `<rect y="224" width="342" height="30" fill="${C.suelo}"/>` + ln('M0 224 L342 224', C.cya, 3)
};

let _uid = 0;
/* Contenido interno de una viñeta (sin la etiqueta <svg>), para poder combinar escenas. */
function interior(def, u) {
  let s = `<defs><pattern id="d${u}" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2" fill="${C.mag}" opacity="0.22"/></pattern></defs>`;
  s += (FONDOS[def.f] || FONDOS.noche)(u);
  for (const it of def.p) {
    const [n, x, y, sc = 1, o = {}, flip = false] = it;
    if (!P[n]) continue;
    s += `<g transform="translate(${x},${y}) scale(${flip ? -sc : sc},${sc})">${P[n](o)}</g>`;
  }
  return s;
}
function vineta(def, opts = {}) {
  const u = (opts.uid || 'v') + (_uid++);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 254" ${opts.attrs || ''}>${interior(def, u)}</svg>`;
}
/* Frankenviñeta: mitad izquierda de una escena + mitad derecha de otra. */
function franken(defA, defB, opts = {}) {
  const u = (opts.uid || 'f') + (_uid++);
  const zig = Array.from({ length: 13 }, (_, i) => `${i % 2 ? 177 : 165},${i * 21.2}`).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 254" ${opts.attrs || ''}><defs><clipPath id="L${u}"><polygon points="0,0 ${zig} 0,254"/></clipPath><clipPath id="R${u}"><polygon points="342,0 ${zig} 342,254"/></clipPath></defs>` +
    `<g clip-path="url(#L${u})">${interior(defA, 'a' + u)}</g><g clip-path="url(#R${u})">${interior(defB, 'b' + u)}</g>` +
    `<polyline points="${zig}" fill="none" stroke="${C.bg}" stroke-width="7" stroke-linejoin="round"/><polyline points="${zig}" fill="none" stroke="${C.lim}" stroke-width="3" stroke-linejoin="round"/></svg>`;
}

if (typeof module !== 'undefined') module.exports = { C, P, FONDOS, vineta, franken, interior };
