angular
  .module('khe')
  .factory('Device', ['$http', function ($http) {

    /**
    * Returns a registration id from a given endpoint
    */
    function parseRegId(endpoint) {
      var parts = endpoint.split('/');
      return parts[parts.length - 1];
    }

    var Device = function () {

      var self = this;

      /**
      * Add a device
      * @param endpoint A registration endpoint
      * @return An $http promise
      */
      self.add = function (endpoint) {
        var req = {
          method: 'POST',
          url: config.api + '/devices',
          data: {
            id: parseRegId(endpoint)
          }
        };
        return $http(req);
      };

      /**
      * Unregister a device
      * @param endpoint A registration endpoint
      * @return An $http promise
      */
      self.remove = function (endpoint) {
        var req = {
          method: 'DELETE',
          url: config.api + '/devices/' + parseRegId(endpoint)
        };
        return $http(req);
      };

    };

    return Device;

  }]);