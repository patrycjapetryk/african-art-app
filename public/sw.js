const CACHE_NAME = 'african-art-pwa-v2';
const STATIC_CACHE = 'african-art-static-v2';

// Offline fallback
const OFFLINE_URL = '/~offline';
const FALLBACK_IMAGE = '/fallback.png';
const FALLBACK_JSON = '/fallback.json';

// Instalacja
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll([OFFLINE_URL, FALLBACK_IMAGE, FALLBACK_JSON]);
    }),
  );
});

// Aktywacja – czyszczenie starych cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // 🔹 1️⃣ HTML – ZAWSZE z network (CRUCIAL for Next 15 + i18n)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
    return;
  }

  // 🔹 2️⃣ API – NetworkFirst
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
        .catch(() => caches.match(request).then((res) => res || caches.match(FALLBACK_JSON))),
    );
    return;
  }

  // 🔹 3️⃣ Next static assets (_next)
  if (request.url.includes('/_next/')) {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((networkResponse) => {
            const copy = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, copy);
            });
            return networkResponse;
          })
        );
      }),
    );
    return;
  }

  // 🔹 4️⃣ Images – CacheFirst with fallback
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request)
            .then((networkResponse) => {
              const copy = networkResponse.clone();
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, copy);
              });
              return networkResponse;
            })
            .catch(() => caches.match(FALLBACK_IMAGE))
        );
      }),
    );
    return;
  }

  // 🔹 5️⃣ Other static files (fonts, css, js)
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      }),
    );
  }
});
