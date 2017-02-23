angular.module("engbooster")
  .directive("ebGrammar", ["Grammars", function(Grammars) {
    return {
      replace: true,
      restrict: "E",
      templateUrl: "templates/directives/eb-grammar.html",
      scope: {
        grammar: "=",
        grammars: "=",
        new: "@"
      },
      controller: function($scope) {
        $scope.addGrammarPoint = function() {
          Grammars.create($scope.grammar)
            .then(function(res) {
              $scope.grammars = $scope.grammars || [];
              $scope.grammars.push(res.data[0]);
              $scope.grammar = {};
            });
        };

        $scope.removeGrammarPoint = function(grammar) {
          Grammars.delete(grammar)
            .then(function(res) {
              $scope.grammars = $scope.grammars || [];
              var index = $scope.grammars.indexOf(grammar);
              if (index > -1) {
                $scope.grammars.splice(index, 1);
              }
            });
        };

        $scope.updateGrammarPoint = function() {
          Grammars.update($scope.grammar);
        };
      },
    };
  }]);
