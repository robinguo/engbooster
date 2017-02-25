angular.module("engbooster")
  .factory("Subjects", ["$http", function SubjectsFactory($http) {
    return {
      all: function(level) {
        return $http.get("/api/subjects" + (level ? "?level=" + level : ""));
      },
      find: function(id) {
        return $http.get("/api/subjects/" + id);
      },
      create: function(subject) {
        return $http.post("/api/subjects", subject);
      },
      update: function(subject) {
        return $http.put("/api/subjects/" + subject._id, subject);
      },
      delete: function(subject) {
        return $http.delete("/api/subjects/" + subject._id);
      }
    }
  }]);
