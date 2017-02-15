(function() {
  angular.module("engbooster", ["ngRoute"])
    .config(function($locationProvider) {
      $locationProvider.html5Mode(true);
    });
})();
