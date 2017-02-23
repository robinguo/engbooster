angular.module("engbooster")
  .controller("GrammarsIndexController", ["$scope", "Grammars", "Auth", function($scope, Grammars, Auth) {
    Grammars.all()
      .then(function(res) {
        $scope.grammars = res.data;
      });

    $scope.checkUser = function() {
      var token = Auth.getToken();
      var username = Auth.parseJwt(token)._doc.username;
      return username === "s.120@qq.com" || username === "admin";
      // return true;
    };
  }]);
