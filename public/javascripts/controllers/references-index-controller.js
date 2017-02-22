angular.module("engbooster")
  .controller("ReferencesIndexController", ["$scope", "References", function($scope, References) {
    References.all()
      .then(function(res) {
        $scope.references = res.data;
      });
  }]);
