/* Dicho y Hecho — app */
(() => {
'use strict';
const $ = s => document.querySelector(s);
const R = DATA.refranes, CAT = DATA.categorias;
const porId = id => R.find(r => r.id === id);
const azar = n => Math.floor(Math.random() * n);
const mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = azar(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- guardado local ---------- */
const mem = {
  get(k, d) { try { const v = localStorage.getItem('dyh:' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('dyh:' + k, JSON.stringify(v)); } catch {} }
};
let favs = new Set(mem.get('favs', []));
let frankens = mem.get('frankens', []);
let record = mem.get('record', { puntos: 0, racha: 0 });

/* ---------- íconos ---------- */
const ico = {
  refranes: '<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v12"/>',
  refranadora: '<path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>',
  juego: '<polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"/>',
  dicho: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  vuelta: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/>',
  candado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  abierto: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
  basura: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>',
  sticker: '<path d="M4 4h16v10l-6 6H4z"/><path d="M14 20v-6h6"/>',
  sonido: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/>',
  mudo: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6"/><path d="M22 9l-5 6"/>'
};
const svgIco = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ico[n]}</svg>`;
const avatar = (pose = '') => `<span class="avatar" aria-hidden="true"><img src="img/hornero${pose ? '-' + pose : ''}.jpg" class="${pose}" alt=""></span>`;
const AVES = [[40, 40, 12, 0], [50, 30, 10, -0.6], [32, 26, 11, -1.2], [58, 46, 9, -1.8], [44, 16, 8.5, -2.4], [66, 34, 11, -3], [36, 50, 9, -3.6]];
const V10 = anda => `<div class="v10${anda && !quieto ? ' anda' : ''}" role="img" aria-label="${esc(porId(10).escena)}"><img class="fondo" src="img/v10-fondo.jpg" alt="">` +
  AVES.map(([x, y, w, d]) => `<span class="ave" style="left:${x}%;top:${y}%;width:${w}%;animation-delay:${d}s"><img src="img/v10-pajarito.png" alt=""></span>`).join('') +
  `<span class="flap" aria-hidden="true">¡FLAP FLAP!</span><span class="mano"><img src="img/v10-mano.png" alt=""></span><span class="hornero"><img src="img/v10-hornero.png" alt=""></span></div>`;
const fotoSVG = (id, attrs = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 254" ${attrs}><image href="img/v${id}.jpg" width="342" height="254" preserveAspectRatio="xMidYMid slice"/></svg>`;
const vin = (id, anda = false) => {
  const attrs = `role="img" aria-label="${esc(porId(id).escena)}"`;
  if (id === 10) return V10(anda);
  if (FOTOS.has(id)) return fotoSVG(id, attrs);
  return vineta(ESCENAS[id], { uid: 'x', attrs });
};
const fuenteSticker = id => FOTOS.has(id) ? { img: `img/v${id}.jpg` } : { svg: vineta(ESCENAS[id]) };
let _fk = 0;
function frankenX(a, b, opts = {}) {
  const u = 'k' + (_fk++);
  const mitad = (id, k) => FOTOS.has(id) ? `<image href="img/v${id}.jpg" width="342" height="254" preserveAspectRatio="xMidYMid slice"/>` : interior(ESCENAS[id], k + u);
  const zig = Array.from({ length: 13 }, (_, i) => `${i % 2 ? 177 : 165},${i * 21.2}`).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 254" ${opts.attrs || ''}><defs><clipPath id="L${u}"><polygon points="0,0 ${zig} 0,254"/></clipPath><clipPath id="R${u}"><polygon points="342,0 ${zig} 342,254"/></clipPath></defs>` +
    `<g clip-path="url(#L${u})">${mitad(a, 'a')}</g><g clip-path="url(#R${u})">${mitad(b, 'b')}</g>` +
    `<polyline points="${zig}" fill="none" stroke="#1B1712" stroke-width="7" stroke-linejoin="round"/><polyline points="${zig}" fill="none" stroke="#F2B72E" stroke-width="3" stroke-linejoin="round"/></svg>`;
}

/* ---------- toast ---------- */
let tt;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('ver'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('ver'), 2000); }

/* ---------- navegación ---------- */
const SECCIONES = [['refranes', 'Refranes'], ['refranadora', 'Refranadora'], ['juego', 'Juego'], ['dicho', 'Del dicho al hecho']];
function irA(k) {
  document.querySelectorAll('.pantalla').forEach(s => s.classList.toggle('activa', s.id === 'p-' + k));
  document.querySelectorAll('#nav button').forEach(b => { if (b.dataset.k === k) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  scrollTo({ top: 0 });
  mem.set('tab', k);
}
$('#nav').innerHTML = SECCIONES.map(([k, t]) => `<button data-k="${k}">${svgIco(k, 24)}<span>${t}</span></button>`).join('');
$('#nav').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { SND.play('tap'); irA(b.dataset.k); } });

/* =========================================================
   1. REFRANES
   ========================================================= */
const ref = { filtro: 'todas', lista: R.map(r => r.id), i: 0, indice: false };
function listaFiltrada() {
  if (ref.filtro === 'todas') return R.map(r => r.id);
  if (ref.filtro === 'favs') return R.filter(r => favs.has(r.id)).map(r => r.id);
  return R.filter(r => r.categoria === ref.filtro).map(r => r.id);
}
function pintarRefranes() {
  const el = $('#p-refranes');
  ref.lista = listaFiltrada();
  if (ref.i >= ref.lista.length) ref.i = 0;
  const chips = [['todas', 'Todos'], ['favs', 'Guardados'], ...Object.entries(CAT)]
    .map(([k, t]) => `<button class="chip" data-f="${k}" aria-pressed="${ref.filtro === k}">${t}</button>`).join('');
  let cuerpo;
  if (!ref.lista.length) {
    cuerpo = `<div class="vacio">Todavía no guardaste ningún refrán. Tocá <b>Guardar</b> en una tarjeta y aparece acá.</div>`;
  } else if (ref.indice) {
    cuerpo = `<div class="contador"><span>${ref.lista.length} refranes</span><button class="pill-btn" data-a="tarjetas">Ver tarjetas</button></div>
      <div class="indice">${ref.lista.map((id, k) => `<button data-ir="${k}">${vin(id)}<span>${esc(porId(id).texto)}</span></button>`).join('')}</div>`;
  } else {
    const r = porId(ref.lista[ref.i]);
    const guardado = favs.has(r.id);
    cuerpo = `<div class="contador"><span>${ref.i + 1} de ${ref.lista.length} · ${CAT[r.categoria]}</span><button class="pill-btn" data-a="indice">Ver todos</button></div>
    <div class="escena"><button class="tarjeta" id="tarjeta" aria-label="Dar vuelta la tarjeta">
      <div class="cara frente">${vin(r.id, true)}<p class="refran">${esc(r.texto)}</p><span class="pista">${svgIco('vuelta', 16)} Tocá para ver qué quiere decir</span></div>
      <div class="cara dorso" aria-hidden="true"><p class="zas">¡ZAS!</p>
        <div class="bloque"><h3>Qué quiere decir</h3><p>${esc(r.significado)}</p></div>
        <div class="bloque"><h3>Cuándo se usa</h3><p>${esc(r.cuandoSeUsa)}</p></div>
        <div class="bloque"><h3>De dónde viene</h3><p>${esc(r.origen)}</p></div>
        <div class="etiquetas">${r.etiquetas.map(t => `<span>${esc(t)}</span>`).join('')}</div></div>
    </button></div>
    <div class="hornero-dice">${avatar()}<div class="globo-h">${esc(r.hornero)}</div></div>
    <div class="acciones">
      <button class="btn fuerte crece" data-a="sticker">${svgIco('sticker', 20)} Hacer sticker</button>
      <button class="btn" data-a="fav" aria-pressed="${guardado}">${guardado ? 'Guardado' : 'Guardar'}</button>
      <button class="btn" data-a="azar">Al azar</button>
    </div>
    <div class="nav-flechas"><button class="btn" data-a="ant">Anterior</button><button class="btn" data-a="sig">Siguiente</button></div>`;
  }
  el.innerHTML = `<nav class="chips" aria-label="Categorías">${chips}</nav>${cuerpo}`;
  const t = $('#tarjeta');
  if (t) armarSwipe(t);
  if (t && ref.lista[ref.i] === 10 && !quieto) { SND.play('aterriza'); SND.play('flap'); }
}
function voltear() {
  const t = $('#tarjeta'); if (!t) return;
  const v = t.classList.toggle('volteada');
  SND.play('whoosh');
  t.querySelector('.frente').setAttribute('aria-hidden', v);
  t.querySelector('.dorso').setAttribute('aria-hidden', !v);
}
function mover(d) { SND.play('swish'); ref.i = (ref.i + d + ref.lista.length) % ref.lista.length; pintarRefranes(); }
function armarSwipe(t) {
  let x0 = null, y0 = 0, movido = false;
  t.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; movido = false; });
  t.addEventListener('pointermove', e => { if (x0 !== null && Math.abs(e.clientX - x0) > 12) movido = true; });
  t.addEventListener('pointerup', e => {
    if (x0 === null) return;
    const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { t.dataset.swipe = '1'; mover(dx < 0 ? 1 : -1); }
  });
  t.addEventListener('click', () => { if (t.dataset.swipe) { delete t.dataset.swipe; return; } if (!movido) voltear(); });
}
$('#p-refranes').addEventListener('click', e => {
  const c = e.target.closest('[data-f]'); if (c) { SND.play('tap'); ref.filtro = c.dataset.f; ref.i = 0; pintarRefranes(); return; }
  const ir = e.target.closest('[data-ir]'); if (ir) { ref.i = +ir.dataset.ir; ref.indice = false; pintarRefranes(); scrollTo({ top: 0 }); return; }
  const b = e.target.closest('[data-a]'); if (!b) return;
  const id = ref.lista[ref.i];
  switch (b.dataset.a) {
    case 'sig': mover(1); break;
    case 'ant': mover(-1); break;
    case 'azar': SND.play('slide'); ref.i = azar(ref.lista.length); pintarRefranes(); break;
    case 'indice': ref.indice = true; pintarRefranes(); break;
    case 'tarjetas': ref.indice = false; pintarRefranes(); break;
    case 'fav':
      favs.has(id) ? favs.delete(id) : favs.add(id); mem.set('favs', [...favs]); SND.play('pop');
      toast(favs.has(id) ? 'Guardado en tus refranes' : 'Lo sacaste de guardados');
      if (ref.filtro === 'favs') ref.i = Math.max(0, ref.i - 1);
      pintarRefranes(); break;
    case 'sticker': abrirSticker({ ...fuenteSticker(id), texto: porId(id).texto }); break;
  }
});

/* =========================================================
   2. LA REFRANADORA
   ========================================================= */
const QUIPS_R = ['¿Viste? Filosofía pura, maestro.', '¡Eso no lo dijo ni mi abuela!', 'Guardalo, que este la rompe en el grupo.', 'Mmm, medio flojito. Tirá de nuevo, dale.', 'Esto lo pongo en la puerta de la heladera.', 'No sé qué significa, pero tiene razón.', 'Con este te hacés influencer.', 'Mandaselo a tu tía, a ver qué dice.', 'Hay que decirlo con cara seria para que funcione.'];
const rf = mem.get('rf', { a: 8, b: 1, tiradas: 0, quip: 'Dale, tirá la palanca y vemos qué sale.' });
rf.lockA = false; rf.lockB = false;
const frankTexto = (a, b) => `${porId(a).mitadA} ${porId(b).mitadB}`;
function pintarRefranadora() {
  const el = $('#p-refranadora');
  el.innerHTML = `<h2 class="titulo">LA REFRANADORA</h2><p class="bajada">Mezclá mitades. Inventá sabiduría. Tocá el candado para trabar una mitad.</p>
  <div class="franken" id="frk">${frankenX(rf.a, rf.b, { attrs: 'role="img" aria-label="Viñeta mezclada de dos refranes"' })}</div>
  <div class="rodillos">
    <div class="rodillo a"><div class="txt" id="rA">${esc(porId(rf.a).mitadA)}</div><button class="candado" data-lock="A" aria-pressed="${rf.lockA}" aria-label="Trabar la primera mitad">${svgIco(rf.lockA ? 'candado' : 'abierto')}</button></div>
    <div class="rodillo b"><div class="txt" id="rB">${esc(porId(rf.b).mitadB)}</div><button class="candado" data-lock="B" aria-pressed="${rf.lockB}" aria-label="Trabar la segunda mitad">${svgIco(rf.lockB ? 'candado' : 'abierto')}</button></div>
  </div>
  <div class="resultado"><span class="kachunk" id="kachunk">¡KA-CHUNK!</span><p id="frase">“${esc(frankTexto(rf.a, rf.b))}”</p></div>
  <button class="btn mag grande" data-a="tirar">¡TIRÁ LA PALANCA!</button>
  <div class="hornero-dice">${avatar()}<div class="globo-h" id="rq">${esc(rf.quip)}</div></div>
  <div class="acciones"><button class="btn fuerte crece" data-a="sticker">${svgIco('sticker', 20)} Hacer sticker</button><button class="btn crece" data-a="guardar">Guardar</button></div>
  <h3 class="sub">Tus Frankenrefranes</h3>
  <div class="lista">${frankens.length ? frankens.map((f, k) => `<div class="item">${frankenX(f.a, f.b, { attrs: 'aria-hidden="true"' })}<p>${esc(frankTexto(f.a, f.b))}</p>
    <button class="mini" data-st="${k}" aria-label="Hacer sticker">${svgIco('sticker', 20)}</button><button class="mini" data-del="${k}" aria-label="Borrar">${svgIco('basura', 20)}</button></div>`).join('')
    : `<div class="vacio">Cuando te salga uno bueno, tocá <b>Guardar</b> y queda acá.</div>`}</div>
  <p class="bajada" style="margin-top:14px">Con los 50 refranes hay 2.450 combinaciones. Llevás ${rf.tiradas} tiradas.</p>`;
}
let girando = false;
function tirar() {
  if (girando) return;
  const n = R.length;
  let a = rf.lockA ? rf.a : R[azar(n)].id, b = rf.lockB ? rf.b : R[azar(n)].id;
  if (a === b) { if (!rf.lockB) b = R[(R.findIndex(r => r.id === b) + 1 + azar(n - 1)) % n].id; else if (!rf.lockA) a = R[(R.findIndex(r => r.id === a) + 1 + azar(n - 1)) % n].id; }
  const fin = () => {
    rf.a = a; rf.b = b; rf.tiradas++; rf.quip = QUIPS_R[azar(QUIPS_R.length)];
    mem.set('rf', { a: rf.a, b: rf.b, tiradas: rf.tiradas, quip: rf.quip });
    const y = scrollY; pintarRefranadora(); scrollTo({ top: y });
    $('#kachunk').classList.add('ya'); SND.play('kachunk'); if (navigator.vibrate) navigator.vibrate(30);
    girando = false;
  };
  girando = true;
  SND.play('ratchet');
  if (quieto) return fin();
  let k = 0;
  const iv = setInterval(() => {
    if (!rf.lockA) $('#rA').textContent = R[azar(n)].mitadA;
    if (!rf.lockB) $('#rB').textContent = R[azar(n)].mitadB;
    if (++k > 9) { clearInterval(iv); fin(); }
  }, 65);
}
$('#p-refranadora').addEventListener('click', e => {
  const l = e.target.closest('[data-lock]');
  if (l) { SND.play('tap'); rf['lock' + l.dataset.lock] = !rf['lock' + l.dataset.lock]; const y = scrollY; pintarRefranadora(); scrollTo({ top: y }); return; }
  const d = e.target.closest('[data-del]');
  if (d) { SND.play('swish'); frankens.splice(+d.dataset.del, 1); mem.set('frankens', frankens); pintarRefranadora(); toast('Borrado'); return; }
  const s = e.target.closest('[data-st]');
  if (s) { const f = frankens[+s.dataset.st]; abrirSticker({ svg: frankenX(f.a, f.b), texto: frankTexto(f.a, f.b) }); return; }
  const b = e.target.closest('[data-a]'); if (!b) return;
  if (b.dataset.a === 'tirar') tirar();
  if (b.dataset.a === 'sticker') abrirSticker({ svg: frankenX(rf.a, rf.b), texto: frankTexto(rf.a, rf.b) });
  if (b.dataset.a === 'guardar') {
    if (frankens.some(f => f.a === rf.a && f.b === rf.b)) return toast('Ese ya lo tenías guardado');
    frankens.unshift({ a: rf.a, b: rf.b }); frankens = frankens.slice(0, 40); mem.set('frankens', frankens); pintarRefranadora(); SND.play('pop'); toast('Frankenrefrán guardado');
  }
});

/* =========================================================
   3. JUEGO: COMPLETÁ EL REFRÁN
   ========================================================= */
const BIEN = ['¡Eso, maestro!', 'Sabés más que mi abuela.', '¡Hecho! Seguí así.', 'Esa la sabía hasta el gato.', 'Canchero total.', 'Vos tenés calle, eh.'];
const MAL = ['Uh, le erraste feo.', 'Nah, frío, frío.', 'Tranqui, a cualquiera le pasa. A vos un poco más.', 'Casi. Bueno, no tan casi.', 'Esa te la tengo que explicar yo.', 'Ni cerca, pero con estilo.'];
const TRAMPA_MAL = ['Casi, pero el refrán no se dice así.', 'Te la creíste: quiere decir lo mismo, pero no es la letra.', 'Ojo, la idea es esa, pero con otras palabras no vale.', 'Esa es la trampita. El refrán va tal cual.'];
const J = { modo: 'quiz', fase: 'inicio', mazo: 'todas', preg: [], i: 0, puntos: 0, racha: 0, mejorRacha: 0, resp: null, ops: [] };
function armarOpciones(id) {
  const r = porId(id);
  const trampa = TRAMPAS[id];
  const pool = mezclar(R.filter(x => x.id !== id && x.mitadB !== r.mitadB)).slice(0, trampa ? 2 : 3).map(x => x.mitadB);
  return mezclar([r.mitadB, ...(trampa ? [trampa] : []), ...pool]);
}
const selectorModo = () => `<div class="modos" role="group" aria-label="Elegí el juego">
  <button class="modo" data-modo="quiz" aria-pressed="${J.modo === 'quiz'}">Completá el refrán</button>
  <button class="modo" data-modo="memo" aria-pressed="${J.modo === 'memo'}">Memotest</button></div>`;
function pintarJuego() {
  const el = $('#p-juego');
  if (J.modo === 'memo') return pintarMemo();
  if (J.fase === 'inicio') {
    const mz = [['todas', 'Todos mezclados'], ...Object.entries(CAT)];
    el.innerHTML = `${selectorModo()}<h2 class="titulo">COMPLETÁ EL REFRÁN</h2><p class="bajada">Te doy la primera mitad y la viñeta. Vos elegís cómo termina. Ojo: una de las opciones dice lo mismo con otras palabras, y esa no vale. Diez por ronda.</p>
    <div class="marcador"><div><b>${record.puntos}/10</b><span>Tu mejor ronda</span></div><div><b>${record.racha}</b><span>Tu mejor racha</span></div></div>
    <label class="lbl" id="lblMazo">Elegí el mazo</label>
    <div class="mazos" role="group" aria-labelledby="lblMazo">${mz.map(([k, t]) => `<button class="mazo" data-mz="${k}" aria-pressed="${J.mazo === k}">${t}</button>`).join('')}</div>
    <button class="btn fuerte grande" data-a="jugar">¡A JUGAR!</button>`;
    return;
  }
  if (J.fase === 'final') {
    const p = J.puntos;
    const veredicto = p === 10 ? 'Perfecto. Te ganaste la medalla del Hornero.' : p >= 7 ? 'Muy bien, se nota que tenés calle.' : p >= 4 ? 'Zafaste. Pero hay que repasar, eh.' : 'Andá a leer las tarjetas y volvé, dale.';
    el.innerHTML = `${selectorModo()}<div class="final"><h2 class="titulo">¡RONDA TERMINADA!</h2><div class="nota">${p}/10</div><p class="bajada">Mejor racha de la ronda: ${J.mejorRacha}</p></div>
    <div class="hornero-dice">${avatar(p >= 7 ? 'festejando' : 'pensando')}<div class="globo-h">${veredicto}</div></div>
    <div class="acciones"><button class="btn fuerte crece" data-a="jugar">Otra ronda</button><button class="btn crece" data-a="mazos">Cambiar mazo</button></div>`;
    return;
  }
  const id = J.preg[J.i], r = porId(id);
  const respondida = J.resp !== null;
  el.innerHTML = `${selectorModo()}<div class="marcador"><div><b>${J.i + 1}/${J.preg.length}</b><span>Pregunta</span></div><div><b>${J.puntos}</b><span>Puntos</span></div><div><b>${J.racha}</b><span>Racha</span></div></div>
  <div class="franken">${vin(id, true)}</div>
  <p class="pregunta">${esc(r.mitadA)}…</p>
  <div class="opciones">${J.ops.map((o, k) => {
    let cl = '';
    if (respondida) { if (o === r.mitadB) cl = 'bien'; else if (k === J.resp) cl = 'mal'; }
    return `<button class="opcion ${cl}" data-op="${k}" ${respondida ? 'disabled' : ''}>${esc(o)}</button>`;
  }).join('')}</div>
  ${respondida ? (() => {
    const elegida = J.ops[J.resp], ok = elegida === r.mitadB, cayo = !ok && elegida === TRAMPAS[id];
    const texto = ok ? BIEN[azar(BIEN.length)] : cayo ? `${TRAMPA_MAL[azar(TRAMPA_MAL.length)]} Es «${r.texto}».` : MAL[azar(MAL.length)];
    return `<div class="hornero-dice">${avatar(ok ? 'festejando' : 'pensando')}<div class="globo-h"><span class="sello ${ok ? 'bien' : 'mal'}">${ok ? '¡BIEN AHÍ!' : cayo ? '¡TRAMPITA!' : '¡NAAA!'}</span><br>${esc(texto)}</div></div>`;
  })() + `
  <button class="btn fuerte grande" data-a="sig" style="margin-top:14px">${J.i + 1 < J.preg.length ? 'SIGUIENTE' : 'VER RESULTADO'}</button>` : ''}`;
}
$('#p-juego').addEventListener('click', e => {
  const md = e.target.closest('[data-modo]');
  if (md) { if (J.modo !== md.dataset.modo) { SND.play('slide'); J.modo = md.dataset.modo; J.fase = 'inicio'; M.fase = 'inicio'; pintarJuego(); } return; }
  if (J.modo === 'memo') return clickMemo(e);
  const m = e.target.closest('[data-mz]'); if (m) { SND.play('tap'); J.mazo = m.dataset.mz; pintarJuego(); return; }
  const o = e.target.closest('[data-op]');
  if (o && J.resp === null) {
    J.resp = +o.dataset.op;
    const ok = J.ops[J.resp] === porId(J.preg[J.i]).mitadB;
    if (ok) { J.puntos++; J.racha++; J.mejorRacha = Math.max(J.mejorRacha, J.racha); } else J.racha = 0;
    SND.play(ok ? 'tada' : 'wahwah');
    if (navigator.vibrate) navigator.vibrate(ok ? 25 : [40, 60, 40]);
    pintarJuego(); return;
  }
  const b = e.target.closest('[data-a]'); if (!b) return;
  if (b.dataset.a === 'jugar') {
    SND.play('boing');
    const base = J.mazo === 'todas' ? R : R.filter(r => r.categoria === J.mazo);
    Object.assign(J, { fase: 'juego', preg: mezclar(base.map(r => r.id)).slice(0, 10), i: 0, puntos: 0, racha: 0, mejorRacha: 0, resp: null });
    J.ops = armarOpciones(J.preg[0]); pintarJuego(); scrollTo({ top: 0 });
  }
  if (b.dataset.a === 'sig') {
    if (J.i + 1 < J.preg.length) { J.i++; J.resp = null; J.ops = armarOpciones(J.preg[J.i]); }
    else {
      J.fase = 'final';
      SND.play('estampa');
      const total = J.preg.length, nota = Math.round(J.puntos * 10 / total);
      J.puntos = nota;
      record = { puntos: Math.max(record.puntos, nota), racha: Math.max(record.racha, J.mejorRacha) }; mem.set('record', record);
    }
    if (J.fase !== 'final') SND.play('slide');
    pintarJuego(); scrollTo({ top: 0 });
  }
  if (b.dataset.a === 'mazos') { J.fase = 'inicio'; pintarJuego(); }
});

/* =========================================================
   3b. MEMOTEST
   ========================================================= */
const MEMO_OK = ['¡Esa es!', '¡Pareja encontrada!', '¡Bien ahí, memoria de elefante!', '¡Justo esa!'];
const MEMO_MAL = ['Nah, no eran iguales.', 'Casi. Acordate dónde estaba cada una.', 'Esa no. Mirá bien antes de tocar.', 'Uh, se te mezclaron.'];
const M = { fase: 'inicio', pares: 8, cartas: [], abiertas: [], encontradas: 0, intentos: 0, trabado: false };
let memoRecord = mem.get('memo', {});
const DIFICULTAD = [[6, 'Fácil', '6 pares'], [8, 'Normal', '8 pares'], [10, 'Difícil', '10 pares']];
const caraMemo = id => {
  const attrs = 'preserveAspectRatio="xMidYMid slice" aria-hidden="true"';
  return FOTOS.has(id) ? fotoSVG(id, attrs) : vineta(ESCENAS[id], { uid: 'm', attrs });
};
function pintarMemo() {
  const el = $('#p-juego');
  if (M.fase === 'inicio') {
    const rec = memoRecord[M.pares];
    el.innerHTML = `${selectorModo()}<h2 class="titulo">MEMOTEST</h2><p class="bajada">Dá vuelta las cartas de a dos y encontrá las viñetas iguales. Cada pareja que armás te dice su refrán.</p>
    <div class="marcador"><div><b>${rec ? rec : '—'}</b><span>Tu récord en ${M.pares} pares (menos intentos es mejor)</span></div></div>
    <label class="lbl" id="lblDif">Elegí la dificultad</label>
    <div class="mazos" role="group" aria-labelledby="lblDif">${DIFICULTAD.map(([n, t, d]) => `<button class="mazo" data-pares="${n}" aria-pressed="${M.pares === n}">${t}<br><small>${d}</small></button>`).join('')}</div>
    <button class="btn fuerte grande" data-a="memo-jugar">¡A JUGAR!</button>`;
    return;
  }
  if (M.fase === 'final') {
    const n = M.intentos, minimo = M.pares;
    const veredicto = n <= minimo + 2 ? '¡Qué memoria, maestro! Ni el elefante.' : n <= minimo * 2 ? 'Muy bien. Se nota que prestás atención.' : 'Lo sacaste, que es lo que importa. Dale otra.';
    const nuevo = M.nuevoRecord ? `<p class="bajada" style="text-align:center"><span class="sello bien">¡NUEVO RÉCORD!</span></p>` : '';
    el.innerHTML = `${selectorModo()}<div class="final"><h2 class="titulo">¡COMPLETASTE EL MEMOTEST!</h2><div class="nota">${n}</div><p class="bajada">intentos para ${M.pares} pares</p></div>${nuevo}
    <div class="hornero-dice">${avatar(n <= minimo * 2 ? 'festejando' : 'pensando')}<div class="globo-h">${veredicto}</div></div>
    <div class="acciones"><button class="btn fuerte crece" data-a="memo-jugar">Otra partida</button><button class="btn crece" data-a="memo-inicio">Cambiar dificultad</button></div>`;
    return;
  }
  const cols = M.pares === 6 ? 3 : 4;
  el.innerHTML = `${selectorModo()}<div class="marcador"><div><b id="memoInt">${M.intentos}</b><span>Intentos</span></div><div><b id="memoPar">${M.encontradas}/${M.pares}</b><span>Pares</span></div></div>
  <div class="hornero-dice" style="margin-top:0">${avatar('pensando')}<div class="globo-h" id="memoQuip" aria-live="polite">Dale, dá vuelta dos cartas.</div></div>
  <div class="memo" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${M.cartas.map((c, k) => `<button class="memo-carta" data-mc="${k}" aria-label="Carta ${k + 1}, boca abajo"><span class="memo-in"><span class="memo-dorso" aria-hidden="true">?</span><span class="memo-cara">${caraMemo(c.id)}</span></span></button>`).join('')}</div>
  <div class="acciones"><button class="btn crece" data-a="memo-inicio">Abandonar</button></div>`;
}
function empezarMemo() {
  const ids = mezclar(R.map(r => r.id)).slice(0, M.pares);
  Object.assign(M, { fase: 'juego', cartas: mezclar([...ids, ...ids].map(id => ({ id, ok: false }))), abiertas: [], encontradas: 0, intentos: 0, trabado: false, nuevoRecord: false });
  pintarMemo(); scrollTo({ top: 0 });
}
function darVuelta(k) {
  const c = M.cartas[k], btn = document.querySelector(`[data-mc="${k}"]`);
  if (M.trabado || c.ok || M.abiertas.includes(k)) return;
  btn.classList.add('up'); btn.setAttribute('aria-label', `Carta ${k + 1}: ${porId(c.id).texto}`);
  SND.play('swish');
  M.abiertas.push(k);
  if (M.abiertas.length < 2) return;
  M.intentos++; $('#memoInt').textContent = M.intentos;
  const [a, b] = M.abiertas, iguales = M.cartas[a].id === M.cartas[b].id;
  M.trabado = true;
  if (iguales) {
    setTimeout(() => {
      [a, b].forEach(i => { M.cartas[i].ok = true; document.querySelector(`[data-mc="${i}"]`).classList.add('ok'); });
      M.encontradas++; $('#memoPar').textContent = `${M.encontradas}/${M.pares}`;
      $('#memoQuip').innerHTML = `<b>${MEMO_OK[azar(MEMO_OK.length)]}</b> «${esc(porId(M.cartas[a].id).texto)}»`;
      SND.play('tada'); if (navigator.vibrate) navigator.vibrate(25);
      M.abiertas = []; M.trabado = false;
      if (M.encontradas === M.pares) setTimeout(terminarMemo, 1400);
    }, 350);
  } else {
    setTimeout(() => { $('#memoQuip').textContent = MEMO_MAL[azar(MEMO_MAL.length)]; }, 350);
    setTimeout(() => {
      [a, b].forEach(i => { const el = document.querySelector(`[data-mc="${i}"]`); el.classList.remove('up'); el.setAttribute('aria-label', `Carta ${i + 1}, boca abajo`); });
      SND.play('swish'); M.abiertas = []; M.trabado = false;
    }, 1000);
  }
}
function terminarMemo() {
  const previo = memoRecord[M.pares];
  M.nuevoRecord = !previo || M.intentos < previo;
  if (M.nuevoRecord) { memoRecord[M.pares] = M.intentos; mem.set('memo', memoRecord); }
  M.fase = 'final'; SND.play('estampa'); pintarMemo(); scrollTo({ top: 0 });
}
function clickMemo(e) {
  const c = e.target.closest('[data-mc]'); if (c) return darVuelta(+c.dataset.mc);
  const p = e.target.closest('[data-pares]'); if (p) { SND.play('tap'); M.pares = +p.dataset.pares; pintarMemo(); return; }
  const b = e.target.closest('[data-a]'); if (!b) return;
  if (b.dataset.a === 'memo-jugar') { SND.play('boing'); empezarMemo(); }
  if (b.dataset.a === 'memo-inicio') { SND.play('slide'); M.fase = 'inicio'; pintarMemo(); }
}

/* =========================================================
   4. DEL DICHO AL HECHO
   ========================================================= */
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zñ0-9 ]/g, ' ');
const VACIAS = new Set('el la los las un una unos unas de del al a y o que en con por para mi mis me te se le les lo su sus es son fue era muy mas pero como cuando porque ya no si sin sobre tan este esta eso esa ese hay tengo tiene tenia estoy esta estan algo alguien todo todos nada cosa cosas hace hizo hacer quiero quiere siempre nunca otra otro vez yo vos tu'.split(' '));
const GRUPOS = [
  ['plata', 'dinero', 'guita', 'mango', 'mangos', 'pagar', 'pago', 'deuda', 'deudas', 'debe', 'debo', 'presto', 'preste', 'prestamo', 'prestar', 'cuota', 'cuotas', 'sueldo', 'aumento', 'cobrar', 'gastos', 'cuenta'],
  ['compras', 'comprar', 'compre', 'oferta', 'barato', 'caro', 'rompio', 'roto', 'calidad', 'trucho'],
  ['jefe', 'jefa', 'laburo', 'trabajo', 'oficina', 'empleo', 'encargado', 'gerente', 'autoridad', 'orden'],
  ['despidos', 'despido', 'echaron', 'echan', 'recorte', 'despidieron'],
  ['pareja', 'novio', 'novia', 'ex', 'esposa', 'esposo', 'marido', 'mujer', 'celos', 'cuernos', 'engano', 'enganio', 'amor', 'cita'],
  ['amigos', 'amigo', 'amiga', 'amigas', 'junta', 'juntas', 'grupo', 'compania'],
  ['familia', 'hermano', 'hermana', 'hermanos', 'hijo', 'hija', 'hijos', 'padre', 'madre', 'viejo', 'vieja', 'papa', 'mama', 'suegra', 'cunado', 'primo', 'tio', 'tia', 'abuela', 'abuelo', 'abuelos', 'padres'],
  ['chisme', 'rumor', 'dicen', 'comentan', 'bocon', 'secreto', 'conto', 'conte', 'hablar', 'hablo', 'hable', 'hablan', 'boca'],
  ['paciencia', 'apuro', 'ansioso', 'ansiosa', 'ansiedad', 'rapido', 'esperar', 'espera', 'esperando', 'ansiedad'],
  ['llegar tarde', 'tarde', 'demora', 'demore', 'atrasado', 'impuntual'],
  ['estres', 'estresado', 'estresada', 'muchas tareas', 'mil', 'tareas', 'cosas', 'agenda', 'examen', 'examenes', 'estudio', 'facultad', 'parcial'],
  ['pelea', 'pelear', 'pelee', 'peleamos', 'discusion', 'discuti', 'discutimos', 'gritos', 'grito', 'grita', 'enojo', 'enojado', 'enojada'],
  ['amenaza', 'amenazo', 'amenazar', 'gritos', 'grito'],
  ['traicion', 'traiciono', 'desagradecido', 'desagradecida', 'ayude', 'ayudo', 'favor', 'favores'],
  ['error', 'errores', 'equivoque', 'equivoco', 'equivocarse', 'meti la pata', 'pata', 'falle', 'falla'],
  ['riesgo', 'arriesgar', 'arriesgo', 'apostar', 'aposte', 'inversion', 'invertir', 'oferta', 'propuesta', 'dudo', 'duda', 'decidir', 'decisiones', 'decision'],
  ['promesas', 'prometio', 'prometi', 'promesa', 'cumplir', 'cumple', 'excusas', 'politico', 'politicos', 'mañana', 'manana'],
  ['acomodo', 'contactos', 'palanca', 'padrino', 'tramite', 'tramites', 'fila', 'cola'],
  ['comida', 'comer', 'asado', 'hambre', 'cena', 'almuerzo', 'invitado', 'invitados', 'cayo', 'visita'],
  ['suerte', 'zafar', 'zafe', 'zafo', 'salvo', 'sobrevivir', 'mala suerte'],
  ['consuelo', 'triste', 'mal', 'bajon', 'perdi', 'corto', 'cortamos', 'ruptura', 'dejo', 'dejaron'],
  ['regalo', 'regalaron', 'regale', 'cumpleanos', 'cumple', 'quejarse', 'queja'],
  ['reclamar', 'reclamo', 'pedir', 'pido', 'derechos', 'aumento'],
  ['madrugar', 'temprano', 'manana temprano', 'despertar', 'levantarse', 'dormir', 'dormido', 'sueño', 'sueno'],
  ['atencion', 'colgado', 'distraido', 'oportunidad', 'se me paso', 'dormido'],
  ['experiencia', 'viejo', 'edad', 'mayor', 'sabiduria', 'abuelos'],
  ['sinceridad', 'hablar claro', 'directo', 'vueltas', 'franqueza', 'mentira', 'miente', 'mintio'],
  ['desconfianza', 'desconfio', 'miedo', 'asustado', 'estafa', 'estafaron', 'mala experiencia', 'otra vez'],
  ['opinar', 'opina', 'opinion', 'meterse', 'se mete', 'no sabe', 'experto'],
  ['soltar', 'dejar ir', 'no te metas', 'celos', 'retener', 'ex']
];
const tokens = s => norm(s).split(/\s+/).filter(w => w.length > 2 && !VACIAS.has(w));
const raiz = w => w.length > 5 ? w.slice(0, 5) : w;
const INDICE = R.map(r => {
  const tags = new Set(r.etiquetas.flatMap(t => tokens(t)).map(raiz));
  const texto = new Set(tokens(`${r.significado} ${r.cuandoSeUsa} ${r.texto}`).map(raiz));
  return { id: r.id, tags, texto };
});
function buscar(frase) {
  const base = tokens(frase), q = norm(frase);
  const exp = new Set(base.map(raiz));
  for (const g of GRUPOS) if (g.some(w => w.includes(' ') ? q.includes(w) : base.includes(w))) g.forEach(w => tokens(w).forEach(t => exp.add(raiz(t))));
  return INDICE.map(x => {
    let s = 0;
    exp.forEach(w => { if (x.tags.has(w)) s += 3; if (x.texto.has(w)) s += 1; });
    return { id: x.id, s: s + Math.random() * 0.5 };
  }).sort((a, b) => b.s - a.s);
}
const EJEMPLOS = ['Mi jefe me gritó en la reunión', 'Le presté plata a un amigo y no me la devuelve', 'Tengo mil cosas que hacer y no llego', 'Mi ex me volvió a escribir', 'Me regalaron algo horrible', 'Todos dicen que van a echar gente'];
let dichoRes = null;
function pintarDicho() {
  const el = $('#p-dicho');
  let res = '';
  if (dichoRes) {
    const [top, ...otros] = dichoRes.lista; const r = porId(top);
    res = `<div class="hornero-dice">${avatar()}<div class="globo-h">${esc(dichoRes.intro)}</div></div>
    <article class="match">${vin(top, true)}<p class="refran">${esc(r.texto)}</p><div class="bloque"><h3>Qué quiere decir</h3><p>${esc(r.significado)}</p></div>
      <div class="acciones" style="margin-top:4px"><button class="btn fuerte crece" data-a="sticker" data-id="${top}">${svgIco('sticker', 20)} Hacer sticker</button><button class="btn crece" data-a="ver" data-id="${top}">Ver tarjeta</button></div></article>
    <h3 class="sub">También te sirven</h3>
    <div class="otros">${otros.map(id => `<button data-a="ver" data-id="${id}">${vin(id)}<span>${esc(porId(id).texto)}</span></button>`).join('')}</div>`;
  }
  el.innerHTML = `<h2 class="titulo">DEL DICHO AL HECHO</h2><p class="bajada">Contame qué te pasó y el Hornero te busca el refrán justo.</p>
  <label class="lbl" for="situ">¿Qué te pasó?</label>
  <textarea id="situ" placeholder="Por ejemplo: mi cuñado me pidió plata otra vez">${esc(dichoRes ? dichoRes.frase : '')}</textarea>
  <div class="sugerencias">${EJEMPLOS.map(t => `<button data-ej="${esc(t)}">${esc(t)}</button>`).join('')}</div>
  <button class="btn mag grande" data-a="buscar">BUSCAME UN REFRÁN</button>${res}`;
}
$('#p-dicho').addEventListener('click', e => {
  const ej = e.target.closest('[data-ej]'); if (ej) { $('#situ').value = ej.dataset.ej; hacerBusqueda(); return; }
  const b = e.target.closest('[data-a]'); if (!b) return;
  if (b.dataset.a === 'buscar') hacerBusqueda();
  if (b.dataset.a === 'ver') { SND.play('slide'); ref.filtro = 'todas'; ref.indice = false; ref.i = R.findIndex(r => r.id === +b.dataset.id); pintarRefranes(); irA('refranes'); }
  if (b.dataset.a === 'sticker') { const id = +b.dataset.id; abrirSticker({ ...fuenteSticker(id), texto: porId(id).texto }); }
});
function hacerBusqueda() {
  const frase = $('#situ').value.trim();
  if (!frase) { toast('Escribí qué te pasó, aunque sea cortito'); $('#situ').focus(); return; }
  const res = buscar(frase);
  const hay = res[0].s >= 3;
  const lista = hay ? res.slice(0, 3).map(x => x.id) : mezclar(R.map(r => r.id)).slice(0, 3);
  const intros = hay ? ['Para eso, maestro, hay uno justo:', 'Mirá, esto ya lo dijeron los antiguos:', 'Te lo resumo en un refrán:'] : ['No te entendí del todo, pero este siempre sirve:', 'Mmm, rebuscado lo tuyo. Probá con este:'];
  dichoRes = { frase, lista, intro: intros[azar(intros.length)] };
  SND.play('boing');
  pintarDicho();
  document.querySelector('#p-dicho .match')?.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'start' });
}

/* =========================================================
   STICKERS
   ========================================================= */
let fuenteCSS = null;
async function fuentesEmbebidas() {
  if (fuenteCSS !== null) return fuenteCSS;
  try {
    const b64 = async u => { const buf = await (await fetch(u)).arrayBuffer(); let s = ''; const by = new Uint8Array(buf); for (let i = 0; i < by.length; i += 0x8000) s += String.fromCharCode.apply(null, by.subarray(i, i + 0x8000)); return btoa(s); };
    fuenteCSS = `@font-face{font-family:Bangers;src:url(data:font/woff2;base64,${await b64('fonts/bangers.woff2')}) format("woff2")}`;
  } catch { fuenteCSS = ''; }
  return fuenteCSS;
}
function svgAImagen(svg) {
  return new Promise((ok, mal) => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const img = new Image(); img.onload = () => { URL.revokeObjectURL(url); ok(img); }; img.onerror = mal; img.src = url;
  });
}
function envolver(ctx, texto, maxW, tam) {
  ctx.font = `${tam}px Bangers`;
  const pal = texto.split(' '), lin = []; let l = '';
  for (const p of pal) { const t = l ? l + ' ' + p : p; if (ctx.measureText(t).width > maxW && l) { lin.push(l); l = p; } else l = t; }
  if (l) lin.push(l); return lin;
}
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
async function inlinarImagenes(svg) {
  const hrefs = [...new Set([...svg.matchAll(/href="(img\/[^"]+)"/g)].map(m => m[1]))];
  for (const h of hrefs) {
    const blob = await (await fetch(h)).blob();
    const dato = await new Promise(ok => { const fr = new FileReader(); fr.onload = () => ok(fr.result); fr.readAsDataURL(blob); });
    svg = svg.split(`href="${h}"`).join(`href="${dato}"`);
  }
  return svg;
}
function cargarImagen(src) {
  return new Promise((ok, mal) => { const i = new Image(); i.onload = () => ok(i); i.onerror = mal; i.src = src; });
}
async function crearSticker({ svg, img: src }, texto) {
  let img;
  if (src) img = await cargarImagen(src);
  else {
    const css = await fuentesEmbebidas();
    svg = await inlinarImagenes(svg);
    const svgFull = svg.replace('<svg ', '<svg width="684" height="508" ').replace(/(<svg[^>]*>)/, `$1<style>${css}</style>`);
    img = await svgAImagen(svgFull);
  }
  await document.fonts.load('40px Bangers');
  const S = 512, cv = document.createElement('canvas'); cv.width = S; cv.height = S; const ctx = cv.getContext('2d');
  // borde blanco de sticker + tarjeta oscura
  rr(ctx, 6, 6, S - 12, S - 12, 40); ctx.fillStyle = '#FFFFFF'; ctx.fill();
  rr(ctx, 20, 20, S - 40, S - 40, 26); ctx.fillStyle = '#1B1712'; ctx.fill();
  rr(ctx, 26, 26, S - 52, S - 52, 22); ctx.fillStyle = '#F3E6C8'; ctx.fill();
  const iw = S - 72, ih = iw * 254 / 342, ix = 36, iy = 36;
  ctx.save(); rr(ctx, ix, iy, iw, ih, 8); ctx.clip();
  const esc2 = Math.max(iw / img.width, ih / img.height), dw = img.width * esc2, dh = img.height * esc2;
  ctx.drawImage(img, ix + (iw - dw) / 2, iy + (ih - dh) / 2, dw, dh); ctx.restore();
  rr(ctx, ix, iy, iw, ih, 8); ctx.lineWidth = 5; ctx.strokeStyle = '#1B1712'; ctx.stroke();
  // texto del refrán
  const zona = S - 36 - (iy + ih) - 34;
  let tam = 44, lin;
  do { lin = envolver(ctx, texto, iw - 8, tam); tam -= 2; } while (lin.length * (tam + 8) > zona && tam > 14);
  tam += 2; ctx.font = `${tam}px Bangers`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  let ty = iy + ih + 14 + (zona - lin.length * (tam + 6)) / 2;
  for (const l of lin) { const u = l.toUpperCase(); ctx.fillStyle = '#1B1712'; ctx.fillText(u, S / 2 + 3, ty + 3); ctx.fillStyle = '#C8321F'; ctx.fillText(u, S / 2, ty); ty += tam + 6; }
  ctx.font = '22px Bangers'; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#1F4E9C'; ctx.fillText('DICHO Y HECHO', S - 44, S - 38);
  return new Promise(ok => cv.toBlob(b => ok({ blob: b, url: cv.toDataURL('image/png') }), 'image/png'));
}
async function abrirSticker({ svg, img, texto }) {
  const dlg = $('#dlgSticker'), caja = $('#cajaSticker');
  caja.innerHTML = `<h2>Armando el sticker…</h2>`; dlg.showModal();
  try {
    const { blob, url } = await crearSticker({ svg, img }, texto);
    SND.play('pop');
    const file = new File([blob], 'dicho-y-hecho.png', { type: 'image/png' });
    const puede = navigator.canShare && navigator.canShare({ files: [file] });
    caja.innerHTML = `<h2>¡Tu sticker!</h2><img src="${url}" alt="Sticker: ${esc(texto)}">
      <div class="fila-btn">${puede ? '<button class="btn fuerte" id="stShare">Compartir</button>' : ''}<a class="btn" id="stDown" href="${url}" download="dicho-y-hecho.png">Descargar</a></div>
      <button class="btn" id="stCerrar">Cerrar</button>`;
    $('#stCerrar').onclick = () => dlg.close();
    if (puede) $('#stShare').onclick = async () => { try { await navigator.share({ files: [file], text: texto }); } catch {} };
  } catch (err) {
    caja.innerHTML = `<h2>No se pudo armar el sticker</h2><p>Probá de nuevo en un ratito. Si sigue pasando, recargá la app.</p><button class="btn" id="stCerrar">Cerrar</button>`;
    $('#stCerrar').onclick = () => dlg.close();
  }
}
$('#dlgSticker').addEventListener('click', e => { if (e.target.id === 'dlgSticker') e.target.close(); });

/* =========================================================
   CONOCÉ AL HORNERO
   ========================================================= */
$('#btnHornero').innerHTML = avatar();
$('#btnHornero').addEventListener('click', () => {
  SND.play('boing');
  $('#cajaHornero').innerHTML = `<img src="img/hornero.jpg" alt="El Hornero guiñando el ojo con el pulgar arriba, dibujado como historieta antigua" loading="lazy">
  <h2>EL HORNERO</h2>
  <p>Soy el Hornero, pájaro nacional y vecino de toda la vida. Mi casa es de barro y mi escuela fue la vereda: ahí aprendí todos los refranes que sé.</p>
  <p>Algunos me los enseñó mi abuela, otros los escuché en la cola del banco. Si uno no lo entendés, preguntame a mí, que para eso estoy.</p>
  <p class="bajada" style="margin:0">Personaje creado por Rober. Dibujos, refranes y app: Dicho y Hecho.</p>
  <button class="btn" id="hCerrar">Cerrar</button>`;
  $('#dlgHornero').showModal(); $('#hCerrar').onclick = () => $('#dlgHornero').close();
});
$('#dlgHornero').addEventListener('click', e => { if (e.target.id === 'dlgHornero') e.target.close(); });

/* ---------- sonido ---------- */
function pintarSonido() {
  const b = $('#btnSonido');
  b.innerHTML = svgIco(SND.activo ? 'sonido' : 'mudo', 24);
  b.setAttribute('aria-pressed', SND.activo);
  b.setAttribute('aria-label', SND.activo ? 'Sonido activado. Tocá para silenciar' : 'Sonido silenciado. Tocá para activar');
}
$('#btnSonido').addEventListener('click', () => { SND.set(!SND.activo); pintarSonido(); toast(SND.activo ? 'Sonido activado' : 'Silencio, maestro'); });
pintarSonido();

/* ---------- instalación ---------- */
let promptInst = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); promptInst = e; $('#btnInstalar').hidden = false; });
$('#btnInstalar').addEventListener('click', async () => { if (!promptInst) return; promptInst.prompt(); await promptInst.userChoice; promptInst = null; $('#btnInstalar').hidden = true; });
addEventListener('appinstalled', () => { $('#btnInstalar').hidden = true; toast('¡Instalada! Ya la tenés en el celu'); });
if ('serviceWorker' in navigator && location.protocol !== 'file:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));

/* ---------- intro ---------- */
function intro() {
  if (sessionStorage.getItem('dyh:intro')) return;
  sessionStorage.setItem('dyh:intro', '1');
  const d = document.createElement('button');
  d.className = 'intro'; d.setAttribute('aria-label', 'Saltar la presentación');
  d.innerHTML = `<div class="burbuja"><img src="img/hornero.jpg" alt=""><p class="dicho">Del dicho al hecho hay mucho trecho…</p><div class="hecho">¡HECHO!</div></div>`;
  document.body.appendChild(d);
  const cerrar = () => { d.classList.add('sale'); setTimeout(() => d.remove(), 400); };
  d.addEventListener('click', cerrar);
  setTimeout(() => { d.querySelector('.hecho').classList.add('ya'); SND.play('estampa'); }, quieto ? 0 : 1100);
  setTimeout(cerrar, quieto ? 1200 : 2600);
}

/* ---------- arranque ---------- */
pintarRefranes(); pintarRefranadora(); pintarJuego(); pintarDicho();
irA(mem.get('tab', 'refranes'));
intro();
})();
