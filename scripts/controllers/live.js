angular
  .module('khe')
  .config(['$stateProvider', function ($state) {
    $state
      .state('live', {
        url: '/live',
        templateUrl: '/views/live.html',
        controller: 'LiveCtrl as live'
      });
  }])
  .controller('LiveCtrl', ['Event', 'Message', 'Device', 'About', '$interval', function (Event, Message, Device, About, $interval) {

    var view = this;

    var Models = {
      event: new Event(),
      message: new Message(),
      device: new Device(),
      about: new About()
    };

    view.events = {

      all: [],
      happening: [],
      upNext: [],
      later: [],

      /**
      * Retreive a list of all events
      */
      get: function () {
        var self = this;
        Models.event.list().
        success(function (data) {
          self.all = data.events;
          self.refresh();
          setInterval(function () {
            self.get();
          }, 1000*60 * 5);
        }).
        error(function (data) {
          view.errors = data.errors;
        });
      },

      /**
      * Connect to sockets and listen for changes to the schedule
      */
      listen: function () {
        var self = this;
        // Event created
        Models.event.socket().on('create', function (event) {
          self.all.push(event);
          self.refresh();
        });

        // Event updated
        Models.event.socket().on('update', function (event) {
          self.all = self.all.map(function (e) {
            if (e._id == event._id) e = event;
            return e;
          });
          self.refresh();
        });

        // Event deleted
        Models.event.socket().on('delete', function (event) {
          self.all = self.all.filter(function (e) {
            return e._id != event._id;
          });
          self.refresh();
        });
      },

      /**
      * Reload the lists
      */
      refresh: function () {
        var self = this;
        self.happening = [];
        self.upNext = [];
        self.later = [];
        // sort events
        self.all = self.all.sort(function (a, b) {
          if (a.start > b.start) return 1;
          if (a.start < b.start) return -1;
          return 0;
        });

        // split them up
        var rest = [];
        for (var i = 0; i < self.all.length; i++) {
          var e = self.all[i];
          var now = new Date();
          var start = new Date(e.start);
          var end = new Date(e.end);
          if (start <= now && now <= end) {
            self.happening.push(e);
          } else {
            rest.push(e);
          }
        }

        self.upNext = rest.slice(0, 3);
        self.later = rest.slice(3, 6);
      }

    };

    view.msg = {

      showing: 'few',

      all: [],
      messages: [],

      pushEnabled: false,
      pushPossible: false,

      /**
      * Get a list of all messages
      */
      get: function () {
        var self = this;
        Models.message.list().
        success(function (data) {
          self.all = data.messages;
          self.refresh();
        }).
        error(function (data) {
          self.errors = data.errors;
        });
      },

      /**
      * Listen for changes to messages
      */
      listen: function () {
        var self = this;

        // Message created
        Models.message.socket().on('create', function (message) {
          self.all.push(message);
          self.refresh();
        });

        // Message updated
        Models.message.socket().on('update', function (message) {
          self.all = self.all.map(function (m) {
            if (m._id == message._id) {
              m = message;
            }
            return m;
          });
          self.refresh();
        });

        // Message deleted
        Models.message.socket().on('delete', function (message) {
          self.all = self.all.filter(function (m) {
            return m._id != message._id;
          });
          self.refresh();
        });
      },

      /**
      * Enables notifications
      */
      subscribe: function () {

        navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
          serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
            .then(function (subscription) {

              Models.device.add(subscription.endpoint).
              success(function (data) {
                view.msg.pushEnabled = true;
              }).
              error(function (data) {
                console.log('Had a problem subscribing you to push notifications');
              });

            })
            .catch(function () {
              if (Notification.permission == 'denied') {
                view.msg.pushEnabled = false;
              } else {
                view.msg.pushEnabled = false;
              }
            });
        });
      },

      /**
      * Register push notification service worker
      */
      registerServiceWorker: function () {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register('/service-worker.js')
            .then(this.initializeState);
        }
      },

      /**
      * Register the initial state
      */
      initializeState: function () {

        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
          return;
        }

        if (Notification.permission == 'denied') {
          return;
        }

        if (!('PushManager' in window)) {
          return;
        }

        navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
          serviceWorkerRegistration.pushManager.getSubscription()
            .then(function (subscription) {

              view.msg.pushPossible = true;

              if (!subscription) {
                view.msg.pushEnabled = false;
                return;
              }

              // send the subscription to the server
              Models.device.add(subscription.endpoint).
              success(function (data) {
                view.msg.pushEnabled = true;
              }).
              error(function (data) {
                console.log('Had a problem subscribing you to push notifications');
              });

            });
        });
      },

      /**
      * Turns off push notifications
      */
      unsubscribe: function () {
        navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
          serviceWorkerRegistration.pushManager.getSubscription().then(function (pushSub) {
            if (!pushSub) {
              view.msg.pushEnabled = false;
              return;
            }

            pushSub.unsubscribe().then(function (successful) {

              // remove the registration from the server
              Models.device.remove(pushSub.endpoint).
              success(function (data) {
                view.msg.pushEnabled = false;
              }).
              error(function (data) {
                console.log('Had a problem unsubscribing you from push notifications');
              });

            });
          });
        });
      },

      /**
      * Return true if push is possible
      */
      isPushPossible: function () {
        if ('serviceWorker' in navigator) {
          return true;
        }
        return false;
      },

      /**
      * Show all messages
      */
      showAll: function () {
        this.showing = 'all';
        this.messages = this.all;
      },

      /**
      * Show a few messages
      */
      showFew: function () {
        this.showing = 'few';
        this.messages = [];
        for (var i = 0; i < this.all.length; ++i) {
          this.messages.push(this.all[i]);
          if (i == 2) break;
        }
      },

      /**
      * Refresh the list of messages
      */
      refresh: function () {
        // Sort by date
        this.all = this.all.sort(function (a, b) {
          if (a.created < b.created) return 1;
          return -1;
        });
        if (this.showing == 'all') {
          this.showAll();
        } else if (this.showing == 'few') {
          this.showFew();
        }
      }

    };

    view.about = {

      page: null,
      error: null,

      /**
      * Get the about page
      */
      get: function () {
        var self = this;
        Models.about.get().
        success(function (data) {
          self.errors = null;
          self.page = data;
        }).
        error(function (data) {
          self.errors = data.errors || ['An internal error occurred'];
        });
      },

      /**
      * Listen for updates on the about page
      */
      listen: function () {
        var self = this;
        Models.about.socket().on('create', function (page) {
          self.page = page;
        });

        Models.about.socket().on('update', function (page) {
          self.page = page;
        });
      }

    };

    // Initialize the controller
    view.events.get();
    view.events.listen();
    view.msg.get();
    view.msg.listen();
    view.msg.registerServiceWorker();
    view.about.get();
    view.about.listen();

  }]);
