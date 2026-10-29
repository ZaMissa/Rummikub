/* Rummikub Table — service worker
 * Cache-first offline shell. The whole game is one HTML file, so caching it
 * plus the manifest/icons makes the app open and play offline (online play
 * still needs a network for the peer/relay transport). */
const VERSION = 'rummikub-0.26.0';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const doc = req.mode === 'navigate' || req.destination === 'document';
  const asset = req.destination === 'script' || req.destination === 'style';
  // Network-first for the shell + its scripts/styles, so a new deploy is picked
  // up on the next load; offline falls back to the cache.
  if (doc || asset) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
