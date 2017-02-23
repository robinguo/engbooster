angular.module("engbooster")
  .controller("TemplatesCreateController", ["$scope", "$state", "$stateParams", "Templates", "References", function($scope, $state, $stateParams, Templates, References) {
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
        Templates.update($scope.template);
        // $location.path("/");
        $state.go("templatesIndex");
      } else {
        Templates.create($scope.template)
          .then(function() {
            $scope.template = {};
          });
      }
    };


    // $scope.$watch("template.variables", function(newVal) {

    // }, true);
    $scope.addReferenceOld = function() {
      $scope.template.reference.push($scope.addedReference);
    }

    $scope.removeReferenceOld = function(reference) {
      var index = $scope.template.reference.indexOf(reference);
      if (index > -1) {
        $scope.template.reference.splice(index, 1);
      }
    }

    $scope.addReference = function() {
      $scope.template.references = $scope.template.references || [];
      $scope.template.references.push({textbook: $scope.addedTextbook.textbook, chapter: $scope.addedChapter});
    }

    $scope.removeReference = function(reference) {
      var index = $scope.template.references.indexOf(reference);
      if (index > -1) {
        $scope.template.references.splice(index, 1);
      }
    }
  }]);
