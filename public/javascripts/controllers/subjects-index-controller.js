angular.module("engbooster")
  .controller("SubjectsIndexController", ["$scope", "Subjects", "Auth", function($scope, Subjects, Auth) {
    Subjects.all()
      .then(function(res) {
        $scope.subjects = res.data;
      });

    $scope.treeOptions = {
      dropped: function(event) {
        var subject = event.source.nodeScope.$modelValue;
        var srcParentId = event.source.nodesScope.$parent.$modelValue._id;
        var destParentId = event.dest.nodesScope.$parent.$modelValue._id;
        if (srcParentId != destParentId) {
          subject.parent = destParentId;
          Subjects.update(subject);
        }
      }
    };

    $scope.removeSubject = function(scope) {
      Subjects.delete(scope.$modelValue)
        .then(function() {
          scope.remove();
        });
    };

    $scope.toggle = function(scope) {
      scope.toggle();
    };

    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.children = nodeData.children || [];
      var newSubject = {
        id: nodeData.id * 10 + nodeData.children.length,
        title: nodeData.title + '.' + (nodeData.children.length + 1),
        parent: nodeData._id,
        children: []
      };
      Subjects.create(newSubject)
        .then(function(res) {
          nodeData.children.push(res.data);
        });
    };

    $scope.editSubject = function(scope) {
      Subjects.update(scope.$modelValue);
    }

    $scope.checkUser = function() {
      var token = Auth.getToken();
      var username = Auth.parseJwt(token)
        ._doc.username;
      return username === "s.120@qq.com" || username === "admin";
      // return true;
    };
  }]);
