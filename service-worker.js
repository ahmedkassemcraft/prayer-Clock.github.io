function downloadPWA() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado con éxito:', registration);

        registration.pushManager.subscribe({ userVisibleOnly: true })
          .then(function(subscription) {
            var endpoint = subscription.endpoint;
            console.log('Suscripción a notificaciones:', endpoint);

            // Aquí puedes realizar la lógica para descargar la PWA
            // Puedes redirigir al usuario a un enlace de descarga o mostrar una notificación de descarga
          })
          .catch(function(error) {
            console.log('Error al suscribirse a notificaciones:', error);
          });
      })
      .catch(function(error) {
        console.log('Error al registrar el Service Worker:', error);
      });
  }
}
