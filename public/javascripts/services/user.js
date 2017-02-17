angular.module("engbooster")
  .service("User", ["$http", "Auth", function($http, Auth) {
    var self = this;

    self.register = function(username, password) {
      return $http.post('/api/users/register', {
        username: username,
        password: password
      })
    };

    self.login = function(username, password) {
      return $http.post('/api/users/login', {
        username: username,
        password: password
      })
    };
  }]);
