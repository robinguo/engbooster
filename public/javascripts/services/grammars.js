angular.module("engbooster")
  .factory("Grammars", ["$http", function GrammarsFactory($http) {
    return {
      all: function() {
        return $http.get("/api/grammars");
      },
      find: function(id) {
        return $http.get("/api/grammars/" + id);
      },
      create: function(grammar) {
        return $http.post("/api/grammars", grammar);
      },
      update: function(grammar) {
        return $http.put("/api/grammars/" + grammar._id, grammar);
      },
      delete: function(grammar) {
        return $http.delete("/api/grammars/" + grammar._id);
      }
    }
  }]);
