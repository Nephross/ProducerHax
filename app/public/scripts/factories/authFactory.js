angular.module('producerhax')
  .factory('authFactory', function Controller(jwtHelper) {

    var tokenPayload = jwtHelper.decodeToken(expToken);
  });
