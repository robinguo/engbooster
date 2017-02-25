angular.module("engbooster")
  .controller("TemplatesCreateController", ["$scope", "$state", "$stateParams", "Templates", "References", "Grammars", "Subjects", function($scope, $state, $stateParams, Templates, References, Grammars, Subjects) {
    if ($stateParams.id) {
      Templates.find($stateParams.id)
        .then(function(res) {
          if ("string" !== typeof($scope.template)) {
            $scope.template = res.data;
            console.log($scope.template);
          } else {
            $scope.template = {};
          }
        });
    } else {
      $scope.template = {};
    }

    References.all()
      .then(function(res) {
        $scope.references = res.data;
      });

    Grammars.all()
      .then(function(res) {
        $scope.grammars = res.data;
      })

    Subjects.all(2)
      .then(function(res) {
        $scope.subjects = res.data;
      });

    $scope.tempVariables = [];

    $scope.parse = function() {
      var problem = $scope.template.problem;
      var vars = parseVars(problem);
      updateVars(vars);
    }

    function parseVars(text) {
      var re = /{[^{}]+}/gi,
        result,
        vars = [];
      while (result = re.exec(text)) {
        vars.push(result[0].slice(1, -1));
      }
      return vars;
    }

    function findVarInVariables(v, variables) {
      return variables.map(function(item) {
          return item.name;
        })
        .indexOf(v);
    }

    function findVariableInVars(variable, vars) {
      return vars.indexOf(variable.name);
    }

    function updateVars(vars) {
      var variables = $scope.template.variables || ($scope.template.variables = []);
      var tempVariables = $scope.tempVariables;
      var newVars = [];
      var oldVars = [];
      var i = -1;
      var j = -1;
      for (var v of vars) {
        if ((i = findVarInVariables(v, variables)) < 0) {
          if ((j = findVarInVariables(v, tempVariables)) > -1) {
            variables.push(tempVariables[j]);
            tempVariables.splice(j, 1);
          } else {
            variables.push({ name: v, subs: [] });
          }
        }
      }

      i = variables.length;
      while (i--) {
        if (findVariableInVars(variables[i], vars) < 0) {
          tempVariables.push(variables[i]);
          variables.splice(i, 1);
        }
      }
    }

    $scope.saveTemplate = function() {
      console.log($scope.template);
      if ($scope.template._id !== undefined) {
        Templates.update($scope.template)
          .then(function(res) {
            $state.go("templatesIndex");
          });
      } else {
        Templates.create($scope.template)
          .then(function() {
            $scope.template = {};
          });
      }
    };

    $scope.addReference = function() {
      $scope.template.references = $scope.template.references || [];
      $scope.template.references.push($scope.addedReference);
      $scope.addedReference = {};
    };

    $scope.removeReference = function(reference) {
      var index = $scope.template.references.indexOf(reference);
      if (index > -1) {
        $scope.template.references.splice(index, 1);
      }
    };

    $scope.addGrammarPoint = function() {
      $scope.template.grammarPoints = $scope.template.grammarPoints || [];
      if ($scope.grammars.map(function(x) {
          return x.grammarPoint
        })
        .indexOf($scope.addedGrammarPoint) > -1) {
        $scope.template.grammarPoints.push($scope.addedGrammarPoint);
        $scope.addedGrammarPoint = "";
      }
    };

    $scope.removeGrammarPoint = function(grammar) {
      var index = $scope.template.grammarPoints.indexOf(grammar);
      if (index > -1) {
        $scope.template.grammarPoints.splice(index, 1);
      }
    };

    $scope.removeSubject = function(scope) {
      var index = $scope.template.subjects.indexOf(scope.subject);
      if (index > -1) {
        $scope.template.subjects.splice(index, 1);
      }
    };

    $scope.addSubject = function(scope) {
      console.log($scope.firstLevel);
      console.log($scope.secondLevel);
      if ($scope.firstLevel && $scope.secondLevel) {
        $scope.template.subjects.push([$scope.firstLevel.title, $scope.secondLevel.title]);
        $scope.firstLevel = "";
        $scope.secondLevel = "";
      }
    };

    $scope.isFirstLevel = function(value, index, array) {
      if (value.path.split('#')
        .length == 2) {
        return true;
      }
      return false;
    };

    $scope.isSecondLevel = function(value, index, array) {
      if ($scope.firstLevel && (value.path.indexOf($scope.firstLevel._id + "#") > -1)) {
        return true;
      }
      return false;
    };
  }]);
