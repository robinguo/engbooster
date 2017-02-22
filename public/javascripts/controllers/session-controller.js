angular.module("engbooster")
  .controller("SessionController", ["$scope", "$state", "User", "Auth", function($scope, $state, User, Auth) {
    var self = this;

    function handleRequest(res) {
      var token = res.data ? res.data.token : null;
      if (token) { console.log('JWT:', token); }
      self.message = res.data.message;
    }

    $scope.login = function() {
      console.log("login");
      User.login($scope.username, $scope.password)
        .then(handleRequest, handleRequest)
        .then(function() {
          // $location.path("/templates");
          $state.go("templatesIndex");
        });
    }

    self.register = function() {
      User.register(self.username, self.password)
        .then(handleRequest, handleRequest).
        then(function() {
          // $location.path("/login");
          $state.go("managerLogin");
        })
    }

    self.getQuote = function() {
      User.getQuote()
        .then(handleRequest, handleRequest);
    }

    self.logout = function() {
      Auth.logout && Auth.logout();
    };

    self.isAuthed = function() {
      return Auth.isAuthed ? Auth.isAuthed() : false;
    };
  }]);
