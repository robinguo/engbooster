angular.module("engbooster")
  .factory("authInterceptor", ["$q", "$location", "Auth", function($q, $location, Auth) {
    return {
      request: function(config) {
        var token = Auth.getToken();
        if (token) {
          // config.headers.Authorization = 'Bearer ' + token;
          config.headers['x-access-token'] = token;
        }
        return config;
      },
      response: function(res) {
        if (res.data.token) {
          Auth.saveToken(res.data.token);
        }
        return res;
      },
      responseError: function(rejection) {
        console.log("responseError");
        if (rejection.status == 401 || rejection.status == 403) {
          console.log("go to login page");
          $location.path("/manager/login");
        }
        return $q.reject(rejection);
      }
    }
  }]);
