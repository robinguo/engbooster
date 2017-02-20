angular.module("engbooster")
  .controller("StatsIndexController", ["$scope", "Templates", function($scope, Templates) {
    Templates.stats().then(function(res) {
      $scope.stats = res.data;
      console.log($scope.stats);
    });
  }]);
