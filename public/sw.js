const CACHE = 'inventory-shell-v1';
self.addEventListener('install', (event) =>
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(['/', '/index.html']))),
);
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches
      .match(event.request)
      .then((cached) => cached || fetch(event.request).catch(() => caches.match('/index.html'))),
  );
});
