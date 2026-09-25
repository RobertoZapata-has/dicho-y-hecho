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
  sticker: '<path d="M4 4h16v10l-6 6H4z"/><path d="M14 20v-6h6"/>'
};
const svgIco = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ico[n]}</svg>`;
const horneroSVG = (w = 58) => `<svg width="${w}" height="${w}" viewBox="-100 -200 200 200" aria-hidden="true">${P.hornero()}</svg>`;
const vin = (id, attrs = '') => vineta(ESCENAS[id], { uid: 'x', attrs: `role="img" aria-label="${esc(porId(id).escena)}" ${attrs}` });

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
$('#nav').addEventListener('click', e => { const b = e.target.closest('button'); if (b) irA(b.dataset.k); });

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
      <div class="cara frente">${vin(r.id)}<p class="refran">${esc(r.texto)}</p><span class="pista">${svgIco('vuelta', 16)} Tocá para ver qué quiere decir</span></div>
      <div class="cara dorso" aria-hidden="true"><p class="zas">¡ZAS!</p>
        <div class="bloque"><h3>Qué quiere decir</h3><p>${esc(r.significado)}</p></div>
        <div class="bloque"><h3>Cuándo se usa</h3><p>${esc(r.cuandoSeUsa)}</p></div>
        <div class="bloque"><h3>De dónde viene</h3><p>${esc(r.origen)}</p></div>
        <div class="etiquetas">${r.etiquetas.map(t => `<span>${esc(t)}</span>`).join('')}</div></div>
    </button></div>
    <div class="hornero-dice">${horneroSVG()}<div class="globo-h">${esc(r.hornero)}</div></div>
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
}
function voltear() {
  const t = $('#tarjeta'); if (!t) return;
  const v = t.classList.toggle('volteada');
  t.querySelector('.frente').setAttribute('aria-hidden', v);
  t.querySelector('.dorso').setAttribute('aria-hidden', !v);
}
function mover(d) { ref.i = (ref.i + d + ref.lista.length) % ref.lista.length; pintarRefranes(); }
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
  const c = e.target.closest('[data-f]'); if (c) { ref.filtro = c.dataset.f; ref.i = 0; pintarRefranes(); return; }
  const ir = e.target.closest('[data-ir]'); if (ir) { ref.i = +ir.dataset.ir; ref.indice = false; pintarRefranes(); scrollTo({ top: 0 }); return; }
  const b = e.target.closest('[data-a]'); if (!b) return;
  const id = ref.lista[ref.i];
  switch (b.dataset.a) {
    case 'sig': mover(1); break;
    case 'ant': mover(-1); break;
    case 'azar': ref.i = azar(ref.lista.length); pintarRefranes(); break;
    case 'indice': ref.indice = true; pintarRefranes(); break;
    case 'tarjetas': ref.indice = false; pintarRefranes(); break;
    case 'fav':
      favs.has(id) ? favs.delete(id) : favs.add(id); mem.set('favs', [...favs]);
      toast(favs.has(id) ? 'Guardado en tus refranes' : 'Lo sacaste de guardados');
      if (ref.filtro === 'favs') ref.i = Math.max(0, ref.i - 1);
      pintarRefranes(); break;
    case 'sticker': abrirSticker({ svg: vineta(ESCENAS[id]), texto: porId(id).texto }); break;
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
  <div class="franken" id="frk">${franken(ESCENAS[rf.a], ESCENAS[rf.b], { attrs: 'role="img" aria-label="Viñeta mezclada de dos refranes"' })}</div>
  <div class="rodillos">
    <div class="rodillo a"><div class="txt" id="rA">${esc(porId(rf.a).mitadA)}</div><button class="candado" data-lock="A" aria-pressed="${rf.lockA}" aria-label="Trabar la primera mitad">${svgIco(rf.lockA ? 'candado' : 'abierto')}</button></div>
    <div class="rodillo b"><div class="txt" id="rB">${esc(porId(rf.b).mitadB)}</div><button class="candado" data-lock="B" aria-pressed="${rf.lockB}" aria-label="Trabar la segunda mitad">${svgIco(rf.lockB ? 'candado' : 'abierto')}</button></div>
  </div>
  <div class="resultado"><span class="kachunk" id="kachunk">¡KA-CHUNK!</span><p id="frase">“${esc(frankTexto(rf.a, rf.b))}”</p></div>
  <button class="btn mag grande" data-a="tirar">¡TIRÁ LA PALANCA!</button>
  <div class="hornero-dice">${horneroSVG()}<div class="globo-h" id="rq">${esc(rf.quip)}</div></div>
  <div class="acciones"><button class="btn fuerte crece" data-a="sticker">${svgIco('sticker', 20)} Hacer sticker</button><button class="btn crece" data-a="guardar">Guardar</button></div>
  <h3 class="sub">Tus Frankenrefranes</h3>
  <div class="lista">${frankens.length ? frankens.map((f, k) => `<div class="item">${franken(ESCENAS[f.a], ESCENAS[f.b], { attrs: 'aria-hidden="true"' })}<p>${esc(frankTexto(f.a, f.b))}</p>
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
    $('#kachunk').classList.add('ya'); if (navigator.vibrate) navigator.vibrate(30);
    girando = false;
  };
  girando = true;
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
  if (l) { rf['lock' + l.dataset.lock] = !rf['lock' + l.dataset.lock]; const y = scrollY; pintarRefranadora(); scrollTo({ top: y }); return; }
  const d = e.target.closest('[data-del]');
  if (d) { frankens.splice(+d.dataset.del, 1); mem.set('frankens', frankens); pintarRefranadora(); toast('Borrado'); return; }
  const s = e.target.closest('[data-st]');
  if (s) { const f = frankens[+s.dataset.st]; abrirSticker({ svg: franken(ESCENAS[f.a], ESCENAS[f.b]), texto: frankTexto(f.a, f.b) }); return; }
  const b = e.target.closest('[data-a]'); if (!b) return;
  if (b.dataset.a === 'tirar') tirar();
  if (b.dataset.a === 'sticker') abrirSticker({ svg: franken(ESCENAS[rf.a], ESCENAS[rf.b]), texto: frankTexto(rf.a, rf.b) });
  if (b.dataset.a === 'guardar') {
    if (frankens.some(f => f.a === rf.a && f.b === rf.b)) return toast('Ese ya lo tenías guardado');
    frankens.unshift({ a: rf.a, b: rf.b }); frankens = frankens.slice(0, 40); mem.set('frankens', frankens); pintarRefranadora(); toast('Frankenrefrán guardado');
  }
});

/* =========================================================
   3. JUEGO: COMPLETÁ EL REFRÁN
   ========================================================= */
const BIEN = ['¡Eso, maestro!', 'Sabés más que mi abuela.', '¡Hecho! Seguí así.', 'Esa la sabía hasta el gato.', 'Canchero total.', 'Vos tenés calle, eh.'];
const MAL = ['Uh, le erraste feo.', 'Nah, frío, frío.', 'Tranqui, a cualquiera le pasa. A vos un poco más.', 'Casi. Bueno, no tan casi.', 'Esa te la tengo que explicar yo.', 'Ni cerca, pero con estilo.'];
const J = { fase: 'inicio', mazo: 'todas', preg: [], i: 0, puntos: 0, racha: 0, mejorRacha: 0, resp: null, ops: [] };
function armarOpciones(id) {
  const r = porId(id);
  const pool = mezclar(R.filter(x => x.id !== id && x.mitadB !== r.mitadB)).slice(0, 3).map(x => x.mitadB);
  return mezclar([r.mitadB, ...pool]);
}
function pintarJuego() {
  const el = $('#p-juego');
  if (J.fase === 'inicio') {
    const mz = [['todas', 'Todos mezclados'], ...Object.entries(CAT)];
    el.innerHTML = `<h2 class="titulo">COMPLETÁ EL REFRÁN</h2><p class="bajada">Te doy la primera mitad y la viñeta. Vos elegís cómo termina. Diez por ronda.</p>
    <div class="marcador"><div><b>${record.puntos}/10</b><span>Tu mejor ronda</span></div><div><b>${record.racha}</b><span>Tu mejor racha</span></div></div>
    <label class="lbl" id="lblMazo">Elegí el mazo</label>
    <div class="mazos" role="group" aria-labelledby="lblMazo">${mz.map(([k, t]) => `<button class="mazo" data-mz="${k}" aria-pressed="${J.mazo === k}">${t}</button>`).join('')}</div>
    <button class="btn fuerte grande" data-a="jugar">¡A JUGAR!</button>`;
    return;
  }
  if (J.fase === 'final') {
    const p = J.puntos;
    const veredicto = p === 10 ? 'Perfecto. Te doy la cresta de honor.' : p >= 7 ? 'Muy bien, se nota que tenés calle.' : p >= 4 ? 'Zafaste. Pero hay que repasar, eh.' : 'Andá a leer las tarjetas y volvé, dale.';
    el.innerHTML = `<div class="final"><h2 class="titulo">¡RONDA TERMINADA!</h2><div class="nota">${p}/10</div><p class="bajada">Mejor racha de la ronda: ${J.mejorRacha}</p></div>
    <div class="hornero-dice">${horneroSVG()}<div class="globo-h">${veredicto}</div></div>
    <div class="acciones"><button class="btn fuerte crece" data-a="jugar">Otra ronda</button><button class="btn crece" data-a="mazos">Cambiar mazo</button></div>`;
    return;
  }
  const id = J.preg[J.i], r = porId(id);
  const respondida = J.resp !== null;
  el.innerHTML = `<div class="marcador"><div><b>${J.i + 1}/${J.preg.length}</b><span>Pregunta</span></div><div><b>${J.puntos}</b><span>Puntos</span></div><div><b>${J.racha}</b><span>Racha</span></div></div>
  <div class="franken">${vin(id)}</div>
  <p class="pregunta">${esc(r.mitadA)}…</p>
  <div class="opciones">${J.ops.map((o, k) => {
    let cl = '';
    if (respondida) { if (o === r.mitadB) cl = 'bien'; else if (k === J.resp) cl = 'mal'; }
    return `<button class="opcion ${cl}" data-op="${k}" ${respondida ? 'disabled' : ''}>${esc(o)}</button>`;
  }).join('')}</div>
  ${respondida ? `<div class="hornero-dice">${horneroSVG()}<div class="globo-h">${esc(J.ops[J.resp] === r.mitadB ? BIEN[azar(BIEN.length)] : MAL[azar(MAL.length)])}</div></div>
  <button class="btn fuerte grande" data-a="sig" style="margin-top:14px">${J.i + 1 < J.preg.length ? 'SIGUIENTE' : 'VER RESULTADO'}</button>` : ''}`;
}
$('#p-juego').addEventListener('click', e => {
  const m = e.target.closest('[data-mz]'); if (m) { J.mazo = m.dataset.mz; pintarJuego(); return; }
  const o = e.target.closest('[data-op]');
  if (o && J.resp === null) {
    J.resp = +o.dataset.op;
    const ok = J.ops[J.resp] === porId(J.preg[J.i]).mitadB;
    if (ok) { J.puntos++; J.racha++; J.mejorRacha = Math.max(J.mejorRacha, J.racha); } else J.racha = 0;
    if (navigator.vibrate) navigator.vibrate(ok ? 25 : [40, 60, 40]);
    pintarJuego(); return;
  }
  const b = e.target.closest('[data-a]'); if (!b) return;
  if (b.dataset.a === 'jugar') {
    const base = J.mazo === 'todas' ? R : R.filter(r => r.categoria === J.mazo);
    Object.assign(J, { fase: 'juego', preg: mezclar(base.map(r => r.id)).slice(0, 10), i: 0, puntos: 0, racha: 0, mejorRacha: 0, resp: null });
    J.ops = armarOpciones(J.preg[0]); pintarJuego(); scrollTo({ top: 0 });
  }
  if (b.dataset.a === 'sig') {
    if (J.i + 1 < J.preg.length) { J.i++; J.resp = null; J.ops = armarOpciones(J.preg[J.i]); }
    else {
      J.fase = 'final';
      const total = J.preg.length, nota = Math.round(J.puntos * 10 / total);
      J.puntos = nota;
      record = { puntos: Math.max(record.puntos, nota), racha: Math.max(record.racha, J.mejorRacha) }; mem.set('record', record);
    }
    pintarJuego(); scrollTo({ top: 0 });
  }
  if (b.dataset.a === 'mazos') { J.fase = 'inicio'; pintarJuego(); }
});

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
    res = `<div class="hornero-dice">${horneroSVG()}<div class="globo-h">${esc(dichoRes.intro)}</div></div>
    <article class="match">${vin(top)}<p class="refran">${esc(r.texto)}</p><div class="bloque"><h3>Qué quiere decir</h3><p>${esc(r.significado)}</p></div>
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
  if (b.dataset.a === 'ver') { ref.filtro = 'todas'; ref.indice = false; ref.i = R.findIndex(r => r.id === +b.dataset.id); pintarRefranes(); irA('refranes'); }
  if (b.dataset.a === 'sticker') { const id = +b.dataset.id; abrirSticker({ svg: vineta(ESCENAS[id]), texto: porId(id).texto }); }
});
function hacerBusqueda() {
  const frase = $('#situ').value.trim();
  if (!frase) { toast('Escribí qué te pasó, aunque sea cortito'); $('#situ').focus(); return; }
  const res = buscar(frase);
  const hay = res[0].s >= 3;
  const lista = hay ? res.slice(0, 3).map(x => x.id) : mezclar(R.map(r => r.id)).slice(0, 3);
  const intros = hay ? ['Para eso, maestro, hay uno justo:', 'Mirá, esto ya lo dijeron los antiguos:', 'Te lo resumo en un refrán:'] : ['No te entendí del todo, pero este siempre sirve:', 'Mmm, rebuscado lo tuyo. Probá con este:'];
  dichoRes = { frase, lista, intro: intros[azar(intros.length)] };
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
  ctx.font = `${tam}px Bungee`;
  const pal = texto.split(' '), lin = []; let l = '';
  for (const p of pal) { const t = l ? l + ' ' + p : p; if (ctx.measureText(t).width > maxW && l) { lin.push(l); l = p; } else l = t; }
  if (l) lin.push(l); return lin;
}
function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
async function crearSticker(svg, texto) {
  const css = await fuentesEmbebidas();
  const svgFull = svg.replace('<svg ', '<svg width="684" height="508" ').replace(/(<svg[^>]*>)/, `$1<style>${css}</style>`);
  const img = await svgAImagen(svgFull);
  await Promise.all([document.fonts.load('40px Bungee'), document.fonts.load('20px Bangers')]);
  const S = 512, cv = document.createElement('canvas'); cv.width = S; cv.height = S; const ctx = cv.getContext('2d');
  // borde blanco de sticker + tarjeta oscura
  rr(ctx, 6, 6, S - 12, S - 12, 56); ctx.fillStyle = '#FFF6E9'; ctx.fill();
  rr(ctx, 22, 22, S - 44, S - 44, 42); ctx.fillStyle = '#12091F'; ctx.fill();
  const iw = S - 72, ih = iw * 254 / 342, ix = 36, iy = 36;
  ctx.save(); rr(ctx, ix, iy, iw, ih, 22); ctx.clip(); ctx.drawImage(img, ix, iy, iw, ih); ctx.restore();
  rr(ctx, ix, iy, iw, ih, 22); ctx.lineWidth = 5; ctx.strokeStyle = '#12091F'; ctx.stroke();
  // texto del refrán
  const zona = S - 36 - (iy + ih) - 34;
  let tam = 30, lin;
  do { lin = envolver(ctx, texto, iw - 8, tam); tam -= 2; } while (lin.length * (tam + 8) > zona && tam > 14);
  tam += 2; ctx.font = `${tam}px Bungee`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  let ty = iy + ih + 14 + (zona - lin.length * (tam + 6)) / 2;
  for (const l of lin) { ctx.fillStyle = '#FF3EA5'; ctx.fillText(l, S / 2 + 3, ty + 3); ctx.fillStyle = '#D7FF3A'; ctx.fillText(l, S / 2, ty); ty += tam + 6; }
  ctx.font = '20px Bangers'; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#2EE6F0'; ctx.fillText('DICHO Y HECHO', S - 44, S - 38);
  return new Promise(ok => cv.toBlob(b => ok({ blob: b, url: cv.toDataURL('image/png') }), 'image/png'));
}
async function abrirSticker({ svg, texto }) {
  const dlg = $('#dlgSticker'), caja = $('#cajaSticker');
  caja.innerHTML = `<h2>Armando el sticker…</h2>`; dlg.showModal();
  try {
    const { blob, url } = await crearSticker(svg, texto);
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
$('#btnHornero').innerHTML = horneroSVG(40);
$('#btnHornero').addEventListener('click', () => {
  $('#cajaHornero').innerHTML = `<img src="hornero-punk.jpg" alt="El Hornero Punk en una calle de neón, con campera de cuero, antiparras y botas" loading="lazy">
  <h2>EL HORNERO PUNK</h2>
  <p>Me dicen el Hornero Punk. Soy del país del asado y de las casas de barro, y el horno lo llevo en la espalda: ahí cargo energía y refranes.</p>
  <p>Escarbadientes siempre, pucho nunca. Si un refrán no lo entendés, preguntame a mí, que yo de la calle sé.</p>
  <p class="bajada" style="margin:0">Personaje creado por Rober. Dibujos, refranes y app: Dicho y Hecho.</p>
  <button class="btn" id="hCerrar">Cerrar</button>`;
  $('#dlgHornero').showModal(); $('#hCerrar').onclick = () => $('#dlgHornero').close();
});
$('#dlgHornero').addEventListener('click', e => { if (e.target.id === 'dlgHornero') e.target.close(); });

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
  d.innerHTML = `<div>${horneroSVG(150)}<p class="dicho">Del dicho al hecho hay mucho trecho…</p><div class="hecho">¡HECHO!</div></div>`;
  document.body.appendChild(d);
  const cerrar = () => { d.classList.add('sale'); setTimeout(() => d.remove(), 400); };
  d.addEventListener('click', cerrar);
  setTimeout(() => d.querySelector('.hecho').classList.add('ya'), quieto ? 0 : 1100);
  setTimeout(cerrar, quieto ? 1200 : 2600);
}

/* ---------- arranque ---------- */
pintarRefranes(); pintarRefranadora(); pintarJuego(); pintarDicho();
irA(mem.get('tab', 'refranes'));
intro();
})();
