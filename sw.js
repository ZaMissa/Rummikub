/* Rummikub Table — service worker
 * Network-first for the shell (page + assets) so a new deploy lands on the next
 * load; cache-first for the rest; falls back to the cache when offline. The
 * listed CORE entries are precached at install (each on its own, so a missing one
 * — e.g. the single-file build — can't abort the rest). */
const VERSION = 'rummikub-0.41.20';
const CORE = [
  './',
  './index.html',
  './assets/app.js',
  './assets/app.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', (e) => {
  // Deliberately do NOT skipWaiting(): a new deploy is staged rather than taking
  // over mid-session, so an update can never interrupt a pending/provisional
  // move. It activates on the next launch (all tabs closed); the network-first
  // fetch below still serves fresh assets meanwhile.
  // Cache each entry on its own, so one 404 (e.g. the single-file build) can't
  // stop the rest of the shell from being cached for offline use.
  e.waitUntil(caches.open(VERSION).then((c) =>
    Promise.allSettled(CORE.map((u) => c.add(u)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// A staged worker only takes over when the page asks it to (FUNC-15): the in-app
// prompt posts this at a safe boundary, then the page reloads from controllerchange.
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
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
