angular.module("engbooster")
  .factory("References", ["$http", function TemplatesFactory($http) {
    return {
      all: function() {
        return $http.get("/api/references");
      },
      find: function(id) {
        return $http.get("/api/references/" + id);
      },
      create: function(reference) {
        return $http.post("/api/references", reference);
      },
      update: function(reference) {
        return $http.put("/api/references/" + reference._id, reference);
      },
      delete: function(reference) {
        return $http.delete("/api/references/" + reference._id);
      }
    }
  }]);
