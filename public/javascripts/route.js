angular.module("engbooster")
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state({
        name: "managerIndex",
        url: "/manager/",
        templateUrl: "../templates/pages/templates/index.html",
        redirectTo: "templatesIndex"
      })
      .state({
        name: "managerLogin",
        url: "/manager/login",
        templateUrl: "../templates/pages/templates/login.html",
        controller: "SessionController"
      })
      .state({
        name: "templatesIndex",
        url: "/manager/templates",
        templateUrl: "../templates/pages/templates/index.html",
        controller: "TemplatesIndexController"
      })
      .state({
        name: "newTemplate",
        url: "/manager/templates/new",
        templateUrl: "../templates/pages/templates/edit.html",
        controller: "TemplatesCreateController"
      })
      .state({
        name: "editTemplate",
        url: "/manager/templates/:id/edit",
        templateUrl: "../templates/pages/templates/edit.html",
        controller: "TemplatesCreateController"
      })
      .state({
        name: "managerStats",
        url: "/manager/stats",
        templateUrl: "../templates/pages/stats/index.html",
        controller: "StatsIndexController"
      })
      .state({
        name: "managerReferences",
        url: "/manager/references",
        templateUrl: "../templates/pages/references/index.html",
        controller: "ReferencesIndexController"
      })
  })
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, { location: 'replace' })
      }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      console.log('$stateChangeStart to ' + toState.name + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
    });
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      console.log('$stateChangeError - fired when an error occurs during transition.');
      console.log(arguments);
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
    });
    $rootScope.$on('$viewContentLoading', function(event, viewConfig) {
      console.log('$viewContentLoading - view begins loading - dom not rendered', viewConfig);
    });

    /* $rootScope.$on('$viewContentLoaded',function(event){
         // runs on individual scopes, so putting it in "run" doesn't work.
         console.log('$viewContentLoaded - fired after dom rendered',event);
       }); */

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
      console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
      console.log(unfoundState, fromState, fromParams);
    });
  }]);
