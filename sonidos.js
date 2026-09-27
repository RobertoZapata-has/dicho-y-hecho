/* Dicho y Hecho — sonidos de historieta.
   Se generan en el momento con el sintetizador del navegador (Web Audio):
   no hay archivos de audio, así que también funcionan sin internet. */
const SND = (() => {
  let ctx = null, master = null, ruido = null;
  let activo = true;
  try { activo = localStorage.getItem('dyh:sonido') !== '0'; } catch {}

  function arrancar() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return ctx; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.55; master.connect(ctx.destination);
    // un segundo de ruido blanco, reutilizable
    ruido = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = ruido.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }
  // los navegadores exigen un toque del usuario antes de sonar
  ['pointerdown', 'keydown'].forEach(ev => addEventListener(ev, () => { if (activo) arrancar(); }, { passive: true }));

  /* ---------- piezas ---------- */
  function env(g, t, a, d, pico) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(pico, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }
  function tono({ tipo = 'sine', f0, f1 = f0, t = 0, dur = 0.2, vol = 0.3, ataque = 0.005, curva = 'exp', filtro = null }) {
    const c = ctx, t0 = c.currentTime + t;
    const o = c.createOscillator(), g = c.createGain();
    o.type = tipo;
    o.frequency.setValueAtTime(f0, t0);
    if (f1 !== f0) curva === 'lin' ? o.frequency.linearRampToValueAtTime(f1, t0 + dur) : o.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
    env(g, t0, ataque, dur, vol);
    let fin = g;
    if (filtro) { const fl = c.createBiquadFilter(); fl.type = filtro.tipo; fl.frequency.value = filtro.f; fl.Q.value = filtro.q || 1; o.connect(fl); fl.connect(g); } else o.connect(g);
    fin.connect(master);
    o.start(t0); o.stop(t0 + ataque + dur + 0.05);
    return o;
  }
  function soplido({ t = 0, dur = 0.25, vol = 0.3, tipo = 'bandpass', f0 = 400, f1 = 2400, q = 1.2, ataque = 0.01 }) {
    const c = ctx, t0 = c.currentTime + t;
    const s = c.createBufferSource(); s.buffer = ruido;
    const fl = c.createBiquadFilter(); fl.type = tipo; fl.Q.value = q;
    fl.frequency.setValueAtTime(f0, t0); fl.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
    const g = c.createGain(); env(g, t0, ataque, dur, vol);
    s.connect(fl); fl.connect(g); g.connect(master);
    s.start(t0, Math.random() * 0.5); s.stop(t0 + ataque + dur + 0.05);
  }
  function resorte(t, f0, f1, dur, vol) {
    const o = tono({ tipo: 'sine', f0, f1, t, dur, vol, curva: 'lin' });
    const lfo = ctx.createOscillator(), prof = ctx.createGain();
    lfo.frequency.value = 14; prof.gain.value = f0 * 0.35;
    lfo.connect(prof); prof.connect(o.frequency);
    const t0 = ctx.currentTime + t; lfo.start(t0); lfo.stop(t0 + dur + 0.05);
  }

  /* ---------- catálogo ---------- */
  const S = {
    tap: () => tono({ tipo: 'triangle', f0: 1100, f1: 700, dur: 0.05, vol: 0.12 }),
    pop: () => { tono({ tipo: 'sine', f0: 380, f1: 1100, dur: 0.07, vol: 0.35 }); tono({ tipo: 'sine', f0: 1400, f1: 900, t: 0.06, dur: 0.05, vol: 0.12 }); },
    whoosh: () => soplido({ dur: 0.28, vol: 0.35, f0: 300, f1: 2600 }),
    swish: () => soplido({ dur: 0.18, vol: 0.28, f0: 2400, f1: 500, q: 2 }),
    slide: () => tono({ tipo: 'sine', f0: 420, f1: 1500, dur: 0.28, vol: 0.22, curva: 'lin' }),
    boing: () => resorte(0, 140, 320, 0.5, 0.4),
    ratchet: () => { for (let i = 0; i < 9; i++) soplido({ t: i * 0.065, dur: 0.018, vol: 0.28, tipo: 'highpass', f0: 2500, f1: 2600, ataque: 0.002 }); },
    kachunk: () => {
      soplido({ dur: 0.06, vol: 0.5, tipo: 'lowpass', f0: 1800, f1: 400, ataque: 0.002 });
      tono({ tipo: 'square', f0: 190, f1: 120, dur: 0.07, vol: 0.18, filtro: { tipo: 'lowpass', f: 900 } });
      tono({ tipo: 'sine', f0: 130, f1: 45, t: 0.08, dur: 0.22, vol: 0.6 });
      soplido({ t: 0.08, dur: 0.1, vol: 0.3, tipo: 'lowpass', f0: 900, f1: 200, ataque: 0.002 });
    },
    estampa: () => { tono({ tipo: 'sine', f0: 160, f1: 50, dur: 0.25, vol: 0.6 }); soplido({ dur: 0.08, vol: 0.35, tipo: 'lowpass', f0: 1200, f1: 300, ataque: 0.002 }); },
    tada: () => {
      [[659, 0], [880, 0.1], [1319, 0.2]].forEach(([f, t]) => { tono({ tipo: 'triangle', f0: f, t, dur: 0.35, vol: 0.28 }); tono({ tipo: 'sine', f0: f * 2, t, dur: 0.2, vol: 0.06 }); });
    },
    wahwah: () => {
      const notas = [392, 370, 349, 330];
      notas.forEach((f, k) => {
        const largo = k === 3 ? 0.75 : 0.26;
        const o = tono({ tipo: 'sawtooth', f0: f, f1: k === 3 ? f * 0.94 : f, t: k * 0.3, dur: largo, vol: 0.2, ataque: 0.03, filtro: { tipo: 'lowpass', f: 1100, q: 4 } });
        if (k === 3) { const l = ctx.createOscillator(), p = ctx.createGain(); l.frequency.value = 6; p.gain.value = 9; l.connect(p); p.connect(o.frequency); const t0 = ctx.currentTime + 0.9; l.start(t0); l.stop(t0 + 0.8); }
      });
    },
    flap: () => { for (let i = 0; i < 6; i++) soplido({ t: 0.9 + i * 0.12, dur: 0.05, vol: 0.2, f0: 700, f1: 1500, q: 0.8, ataque: 0.004 }); },
    aterriza: () => { resorte(0.5, 900, 300, 0.35, 0.12); tono({ tipo: 'sine', f0: 220, f1: 110, t: 1.1, dur: 0.12, vol: 0.3 }); }
  };

  return {
    get activo() { return activo; },
    set(v) {
      activo = !!v;
      try { localStorage.setItem('dyh:sonido', activo ? '1' : '0'); } catch {}
      if (activo) { arrancar(); S.pop(); } else if (ctx) ctx.suspend();
    },
    play(n) {
      if (!activo || !S[n]) return;
      if (!arrancar()) return;
      try { S[n](); } catch {}
    }
  };
})();
