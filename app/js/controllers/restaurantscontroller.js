'use strict';

/* Controllers */

foodstampsModule.controller('RestaurantsController',[
	'$scope', '$routeParams', 'Restaurants', 'Lists',
	function($scope, $routeParams, Restaurants, Lists)
	{
		if ($routeParams.id)
		{
			$scope.theRestaurant = Restaurants.get($routeParams.id);
			$scope.inLists = [];
			var allLists = Lists.query();
			for (var i = 0; i < allLists.length; i++)
			{
				if (allLists[i].restaurants.indexOf($scope.theRestaurant.id) >= 0)
				{
					$scope.inLists.push(allLists[i]);
				}
			}
		}
		else
		{
			$scope.allRestaurants = Restaurants.query();
		}
	}
]);
