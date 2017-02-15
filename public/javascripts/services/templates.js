angular.module("engbooster")
  .factory("Templates", ["$http", function TemplatesFactory($http) {
    return {
      all: function() {
        return $http.get("/api/templates");
      },
      find: function(id) {
        return $http.get("/api/templates/" + id);
      },
      create: function(template) {
        return $http.post("/api/templates", template);
      },
      update: function(template) {
        return $http.put("/api/templates/" + template._id, template);
      },
      delete: function(template) {
        return $http.delete("/api/templates/" + template._id);
      }
    }
  }]);
