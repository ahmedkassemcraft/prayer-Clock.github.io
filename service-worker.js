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
  // Intercepta las solicitudes de descarga de la PWA
  if (event.request.url.endsWith('/download')) {
    event.respondWith(handleDownloadRequest(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

async function handleDownloadRequest(request) {
  // Obtiene el archivo de la PWA para descargar
  const response = await fetch('/path-to-your-pwa-file');
  const fileBlob = await response.blob();

  // Crea una respuesta personalizada con el archivo para descargar
  const headers = { 'Content-Disposition': 'attachment; filename="pwa-file.extension"' };
  const customizedResponse = new Response(fileBlob, { headers });

  return customizedResponse;
}
