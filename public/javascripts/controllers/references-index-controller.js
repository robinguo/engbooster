angular.module("engbooster")
  .controller("ReferencesIndexController", ["$scope", "References", "Auth", function($scope, References, Auth) {
    References.all()
      .then(function(res) {
        $scope.references = res.data;
      });

    var token = Auth.getToken();
    console.log(Auth.parseJwt(token));

    $scope.checkUser = function() {
      var token = Auth.getToken();
      var username = Auth.parseJwt(token)._doc.username;
      return username === "s.120@qq.com" || username === "admin";
    };
  }]);
