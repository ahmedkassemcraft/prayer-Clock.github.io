self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('prayer-clock-v1').then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'icon.png',
        'icon-512x512.png',
        'notification.png',
        'fondo.jpg',
        'https://www.youtube.com/embed/hrnT2IFqyro'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
