'use strict';

/* Controllers */

foodstampsModule.controller('RestaurantsController',[
	'$scope', '$routeParams', 'Restaurants', 'Lists', 'Posts',
	function($scope, $routeParams, Restaurants, Lists, Posts)
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

			$scope.addReviewText = null;
			$scope.posts = Posts.getPosts($scope.theRestaurant.id);

			$scope.addPost = function()
			{
				// Add a new project
				// 
				Posts.addPost($scope.theRestaurant.id, $scope.addReviewText);
				$scope.posts = Posts.getPosts($scope.theRestaurant.id);
				$scope.addReviewText = null;
			}
		}
		else
		{
			$scope.allRestaurants = Restaurants.query();
		}
	}
]);
