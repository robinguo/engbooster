angular.module("engbooster")
  .directive("ebReference", function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "templates/directives/eb-reference.html",
      scope: {
        ref: "=",
        reference: "=",
        new: "@"
      },
      controller: function($scope) {
        $scope.addReference = function() {
          $scope.reference = $scope.reference || [];
          $scope.reference.push($scope.ref);
          $scope.ref = {};
        };

        $scope.removeReference = function() {
          $scope.reference = $scope.reference || [];
          var index = $scope.reference.indexOf($scope.ref);
          if (index > -1) {
            $scope.reference.splice(index, 1);
          }
        }
      },
    };
  });
