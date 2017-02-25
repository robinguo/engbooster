(function() {
  angular.module("engbooster", ["ui.router", "ui.tree"])
    .config(function($locationProvider) {
      $locationProvider.html5Mode(true);
    })
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });
})();
