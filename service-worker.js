self.addEventListener('push', function (event) {

  event.waitUntil(
    fetch(config.api + '/messages').then(function (response) {
      return response.json().then(function (data) {
        console.log(data);
        var title = data.notification.title;
        var message = data.notification.message;
        var icon = '/img/logo-short-square-black.png';
        var tag = 'simple-push-demo-notification-tag';

        return self.registration.showNotification(title, {
          body: message,
          icon: icon,
          tag: tag
        });
      });
    }).catch(function (err) {
      console.log('An error occurred', err);
    })
  );

});

self.addEventListener('notificationclick', function (event) {
  console.log('notification clicked', event);
  event.notification.close();

  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function (clientList) {
  }));
});