/* Dicho y Hecho — service worker: todo queda guardado en el celu para usarse sin internet. */
importScripts('vinetas.js');
const CACHE = 'dyh-v5';
const ARCHIVOS = [
  './', 'index.html', 'app.js', 'kit.js', 'escenas.js', 'datos.js', 'sonidos.js', 'vinetas.js', 'trampas.js', 'manifest.webmanifest',
  'fonts/bangers.woff2', 'fonts/archivo-400.woff2', 'fonts/archivo-600.woff2', 'fonts/archivo-800.woff2',
  'img/hornero.jpg', 'img/hornero-pensando.jpg', 'img/hornero-festejando.jpg',
  'img/v10-fondo.jpg', 'img/v10-hornero.png', 'img/v10-mano.png', 'img/v10-pajarito.png', 
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'
].concat([...FOTOS].map(id => `img/v${id}.jpg`));
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request).then(res => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const copia = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copia));
      }
      return res;
    }).catch(() => e.request.mode === 'navigate' ? caches.match('index.html') : undefined))
  );
});
