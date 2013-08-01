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

			$scope.feed = {};
			$scope.feed.addReviewText = null;
			$scope.feed.posts = Posts.getPosts($scope.theRestaurant.id);
			$scope.feed.addReviewMealType = 'dinner';
			$scope.feed.addReviewScore = 0;

			$scope.feed.addPost = function()
			{
				// Add a new post
				//
				Posts.addPost($scope.theRestaurant.id, $scope.feed.addReviewText);
				$scope.feed.posts = Posts.getPosts($scope.theRestaurant.id);
				$scope.feed.addReviewText = null;
			}
		}
		else
		{
			$scope.allRestaurants = Restaurants.query();
		}
	}
]);
