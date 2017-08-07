'use strict';

angular.module('producerhax', [
  'ngCookies',
  'ngAnimate',
  'ngAria',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngMaterial',
  'ui.router',
  'ngFileUpload',
  'angular-jwt'
]).constant('API', 'http://127.0.0.1:8443/api')
.config(function($urlRouterProvider, $stateProvider, $mdThemingProvider, $locationProvider, $sceDelegateProvider, $httpProvider, jwtOptionsProvider) {
    // hmtl5 mode to remove #
  $locationProvider.html5Mode(true);
    // MD TABS THEMEING
  $sceDelegateProvider.resourceUrlWhitelist(['**']);

  // -------------- JWT SETUP ------------------- //

  jwtOptionsProvider.config({
      tokenGetter: ['myService', function(myService) {
        myService.doSomething();

        // not sending jwt with requests for static public content.
        // will never send a javascript file from the api
        if (options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }

        if (options.url.substr(options.url.length - 4) == '.png') {
          return null;
        }

        if (options.url.substr(options.url.length - 4) == '.jpg') {
          return null;
        }

        if (options.url.substr(options.url.length - 3) == '.js') {
          return null;
        }

        return localStorage.getItem('id_token');
      }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
  })
    // -------------STATES Starts here --------------------//
    // Setting up redirects for plain URLs and default
  $urlRouterProvider
        .when('/about', '/about')
        .when('/blog', '/blog')
        .when('/user', '/user')
        .when('/login', '/login')
        .when('/register', '/register')
        .otherwise('/');

    // apilink?

    // setting up states
  $stateProvider
    // Home Page State
        .state('home', {
          url: '/',
          controller: 'HomeCtrl',
          templateUrl: 'views/home.html'
        })
        .state('about', {
          url: '/about',
          controller: 'AboutCtrl',
          templateUrl: 'views/about.html'
        })
        .state('blog', {
          url: '/blog',
          controller: 'BlogCtrl',
          templateUrl: 'views/blog.html'
        })
        .state('login', {
          url: '/login',
          controller: 'UserCtrl',
          templateUrl: 'views/login.html'
        })
        .state('register', {
          url: '/register',
          controller: 'UserCtrl',
          templateUrl: 'views/register.html'
        })
        .state('user', {
          url: '/user',
          controller: 'UserCtrl',
          templateUrl: 'views/user.html'
        });
// End
}).run(function($anchorScroll, $window, $rootScope, $stateParams, $location) {
  $rootScope.$on('$stateChangeSuccess', function(event, currentState, previousState) {
    // $window.scrollTo(0, 0);
  });
});
