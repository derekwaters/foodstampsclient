'use strict';


// Declare app level module which depends on filters, and services
var foodstampsModule = angular.module('foodstamps', ['foodstamps.filters', 'foodstamps.services', 'foodstamps.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeController'});
    $routeProvider.when('/restaurants', {templateUrl: 'partials/restaurants.html', controller: 'RestaurantsController'});
    $routeProvider.when('/lists', {templateUrl: 'partials/lists.html', controller: 'ListsController'});
    $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'ProfileController'});
    $routeProvider.when('/editstamps', {templateUrl: 'partials/editstamps.html', controller: 'EditStampsController'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
