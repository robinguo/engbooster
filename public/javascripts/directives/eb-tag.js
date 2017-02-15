angular.module("engbooster")
  .directive("ebTag", function() {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "templates/directives/eb-tag.html",
      scope: {
        tag: "=",
        tags: "=",
        new: "@"
      },
      controller: function($scope) {
        $scope.addTag = function() {
          $scope.tags = $scope.tags || [];
          $scope.tags.push($scope.tag);
          $scope.tag = "";
        };

        $scope.removeTag = function() {
          $scope.tags = $scope.tags || [];
          var index = $scope.tags.indexOf($scope.tag);
          if (index > -1) {
            $scope.tags.splice(index, 1);
          }
        }
      },
    };
  });
