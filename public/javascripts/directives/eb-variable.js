angular.module("engbooster")
  .directive("ebVariable", function() {
    return {
      restrict: "E",
      templateUrl: "templates/directives/eb-variable.html",
      scope: {
        variable: "="
      },
      controller: function($scope) {
        this.addSubstitution = function(substitution) {
          $scope.variable.subs.push(substitution);
        };

        this.removeSubstitution = function(substitution) {
          var index = $scope.variable.subs.indexOf(substitution);
          if (index > -1) {
            $scope.variable.subs.splice(index, 1);
          }
        };
      }
    };
  });
