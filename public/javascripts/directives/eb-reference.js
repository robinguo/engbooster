angular.module("engbooster")
  .directive("ebReference", ["References", function(References, Grammars) {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "templates/directives/eb-reference.html",
      scope: {
        ref: "=",
        references: "=",
        grammars: "=",
        new: "@"
      },
      controller: function($scope) {
        // Grammars.all()
        //   .then(function(res) {
        //     $scope.grammars = res.data;
        //   });

        $scope.addReference = function() {
          References.create($scope.ref)
            .then(function(res) {
              $scope.references = $scope.references || [];
              $scope.references.push(res.data[0]);
              $scope.ref = {};
            });
        };

        $scope.removeReference = function(ref) {
          References.delete(ref)
            .then(function(res) {
              $scope.references = $scope.references || [];
              var index = $scope.references.indexOf(ref);
              if (index > -1) {
                $scope.references.splice(index, 1);
              }
            });
        };

        $scope.updateReference = function() {
          References.update($scope.ref);
        };
      },
    };
  }]);
