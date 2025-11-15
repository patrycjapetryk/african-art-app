const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = ['/', '/fallback.json', '/fallback.png', '/~offline'];

// Instalacja SW i cache'owanie podstawowych zasobów
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// Aktywacja SW i usuwanie starych cache'y
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        }),
      ),
    ),
  );
  self.clients.claim();
});

// Obsługa fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // 1️⃣ NetworkFirst dla API (CMS)
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
          });
          return response;
        })
        .catch(() =>
          caches.match(request).then((response) => {
            return response || caches.match('/fallback.json');
          }),
        ),
    );
    return;
  }

  // 2️⃣ CacheFirst dla pozostałych GET (HTML, obrazki)
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).catch(() => {
            if (request.headers.get('accept')?.includes('text/html')) {
              return caches.match('/~offline');
            }
            if (request.headers.get('accept')?.includes('image')) {
              return caches.match('/fallback.png');
            }
            return undefined;
          })
        );
      }),
    );
  }
});
