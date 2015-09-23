var api = 'https://api.khe.io/v1.0';
var img = 'https://khe.io/img/logo-short-square-black.png';
var tag = 'simple-push-demo-notification-tag';

self.addEventListener('push', function (event) {

  event.waitUntil(
    fetch(api + '/messages').then(function (response) {
      return response.json().then(function (data) {

        if (data.messages.length > 0) {

          data.messages = data.messages.sort(function (a, b) {
            if (a.created < b.created) return 1;
            if (a.created > b.created) return -1;
            return 0;
          });

          var title = 'KHE Update';
          var message = data.messages[0].text;

          return self.registration.showNotification(title, {
            body: message,
            icon: img,
            tag: tag
          });

        } else {

          return self.registration.showNotification('KHE Update', {
            body: 'Check out khe.io/live for more info!',
            icon: img,
            tag: tag
          });

        }

      });
    })
  );

});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function (clientList) {
  }));
});