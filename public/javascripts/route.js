angular.module("engbooster")
  .config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/pages/templates/index.html",
        controller: "TemplatesIndexController"
      })
      .when("/login", {
        templateUrl: "templates/pages/templates/login.html",
        controller: "SessionController"
      })
      .when("/templates", {
        templateUrl: "templates/pages/templates/index.html",
        controller: "TemplatesIndexController"
      })
      .when("/templates/new", {
        templateUrl: "templates/pages/templates/edit.html",
        controller: "TemplatesCreateController"
      })
      .when("/templates/:id/edit", {
        templateUrl: "templates/pages/templates/edit.html",
        controller: "TemplatesCreateController"
      })
      .otherwise({ redirectTo: "/" });
  });
