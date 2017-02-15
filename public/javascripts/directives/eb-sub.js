angular.module("engbooster")
  .directive("ebSub", function() {
    return {
      replace: true,
      restrict: "E",
      require: "^ebVariable",
      templateUrl: "templates/directives/eb-sub.html",
      link: function(scope, element, attrs, ebVariableCtrl) {
        scope.removeSubstitution = function() {
          ebVariableCtrl.removeSubstitution(scope.sub);
        };

        scope.addSubstitution = function() {
          ebVariableCtrl.addSubstitution(scope.sub);
          scope.sub = {};
        };
      },
      scope: {
        sub: "=",
        new: "@"
      }
    };
  });
