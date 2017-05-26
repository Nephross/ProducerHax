'use strict';

angular.module('producerhax', [])
.factory('authInterceptor', function(API, auth) {
  request: function(config) {
      return config;
    },

    // If a token was sent back, save it
    response: function(res) {
      return res;
    }
});
