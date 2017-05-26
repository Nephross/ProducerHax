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
  'ngFileUpload'
]).constant('API', 'http://127.0.0.1:8080/api')
.config(function($urlRouterProvider, $stateProvider, $mdThemingProvider, $locationProvider, $sceDelegateProvider) {
    // hmtl5 mode to remove #
  $locationProvider.html5Mode(true);
    // MD TABS THEMEING
  $sceDelegateProvider.resourceUrlWhitelist(['**']);
    // -------------STATES Starts here --------------------//
    // Setting up redirects for plain URLs and default
  $urlRouterProvider
        .when('/about', '/about')
        .when('/blog', '/blog')
        .when('/podcast', '/podcast')
        .when('/user', '/user')
        .when('/login', '/login')
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
        .state('podcast', {
          url: '/podcast',
          controller: 'PodcastCtrl',
          templateUrl: 'views/podcast.html'
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
