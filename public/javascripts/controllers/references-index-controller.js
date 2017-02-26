angular.module("engbooster")
  .controller("ReferencesIndexController", ["$scope", "References", "Grammars", "Auth", function($scope, References, Grammars, Auth) {
    References.all()
      .then(function(res) {
        $scope.references = res.data;
      });
      
    Grammars.all()
      .then(function(res) {
        $scope.grammars = res.data;
      });

    $scope.checkUser = function() {
      var token = Auth.getToken();
      var username = Auth.parseJwt(token)
        ._doc.username;
      return username === "s.120@qq.com" || username === "admin";
      // return true;
    };
  }]);
