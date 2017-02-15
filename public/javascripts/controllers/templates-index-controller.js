angular.module("engbooster")
  .controller("TemplatesIndexController", ["$scope", "Templates", function($scope, Templates) {
    Templates.all()
      .then(function(res) {
        $scope.templates = res.data;
      });

    $scope.removeTemplate = function(template) {
      $scope.templates.splice($scope.templates.indexOf(template), 1);
      Templates.delete(template);
    };
  }]);
