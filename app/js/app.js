'use strict';


// Declare app level module which depends on filters, and services
var foodStampsModule = angular.module('foodStamps',
        ['foodStamps.filters',
         'foodStamps.services',
         'foodStamps.directives',
         'angular-hovercard',
         'directive.g+signin',
         'google-maps',
         'ui.date',
         'infinite-scroll']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeController'});
    $routeProvider.when('/restaurants', {templateUrl: 'partials/restaurants.html', controller: 'RestaurantsController'});
    $routeProvider.when('/restaurants/:id', {templateUrl: 'partials/restaurant.html', controller: 'RestaurantsController'});
    $routeProvider.when('/lists', {templateUrl: 'partials/lists.html', controller: 'ListsController'});
    $routeProvider.when('/lists/:id', {templateUrl: 'partials/list.html', controller: 'ListsController'});
    $routeProvider.when('/profile/', {templateUrl: 'partials/profile.html', controller: 'ProfileController'});
    $routeProvider.when('/profile/:id', {templateUrl: 'partials/profile.html', controller: 'ProfileController'});
    $routeProvider.when('/editstamps', {templateUrl: 'partials/editstamps.html', controller: 'EditStampsController'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
