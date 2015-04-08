angular
  .module('khe')
  .config(['$routeProvider', function ($router) {
    $router
      .when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl'
      });
  }])
  .controller('HomeCtrl', ['User', '$location', function (User, $location) {

    var self = this;
    var user = new User();
    self.user = user.getMe();

    if (!self.user || self.user.role == 'attendee') {
      $location.path('/login');
    }

    self.logout = function () {
      user.removeMe();
      $location.path('/login');
    };

  }]);
