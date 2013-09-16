'use strict';

/* Controllers */

foodStampsModule.controller('RestaurantsController',[
	'$scope', '$routeParams', 'Restaurants', 'Lists', 'Posts',
	function($scope, $routeParams, Restaurants, Lists, Posts)
	{
		if ($routeParams.id)
		{
			$scope.theRestaurant = Restaurants.get($routeParams.id);
			$scope.map = {};
			$scope.map.center = $scope.theRestaurant.location;
			$scope.map.zoom = 15;
			$scope.map.markers = [];
			var restaurantMarker = {};
			restaurantMarker.latitude = $scope.map.center.latitude;
			restaurantMarker.longitude = $scope.map.center.longitude;
			$scope.map.markers.push(restaurantMarker);

			$scope.inLists = [];
			var allLists = Lists.query();
			for (var i = 0; i < allLists.length; i++)
			{
				if (allLists[i].restaurants.indexOf($scope.theRestaurant.id) >= 0)
				{
					$scope.inLists.push(allLists[i]);
				}
			}

			$scope.dateOptions = {
        		changeYear: true,
        		changeMonth: true,
        		yearRange: '1900:-0'
    		};

			$scope.feed = {};
			$scope.feed.addReviewText = null;
			$scope.feed.posts = Posts.getPosts($scope.theRestaurant.id);
			$scope.feed.addReviewMealType = 'dinner';
			$scope.feed.addReviewScore = 0;
			$scope.feed.addReviewDate = null;

			$scope.feed.addPost = function()
			{
				// Add a new post
				//
				Posts.addPost($scope.theRestaurant.id,
							  $scope.feed.addReviewDate,
							  $scope.feed.addReviewMealType,
							  $scope.feed.addReviewScore,
							  $scope.feed.addReviewText);
				$scope.feed.posts = Posts.getPosts($scope.theRestaurant.id);
				$scope.feed.addReviewText = null;
				$scope.feed.addReviewDate = null;
				$scope.feed.addReviewScore = 0;
				$scope.feed.addReviewMealType = 'dinner';
			}

			$scope.feed.addComment = function(toPost)
			{
				// Add a new comment
				//
				Posts.addComment($scope.theRestaurant.id,
								 toPost.id,
								 toPost.addComment);
				$scope.feed.posts = Posts.getPosts($scope.theRestaurant.id);
				toPost.reviewText = null;
			}
		}
		else
		{
			$scope.searchRestaurants = {};
			$scope.searchRestaurants.isSearching = false;
			$scope.searchRestaurants.list = [];

			$scope.onRestaurantSearch = function()
			{
				if ($scope.search.length > 0)
				{
					$scope.searchRestaurants.isSearching = true;
					Restaurants.query($scope.search, function(newList)
	                    {
	                        $scope.searchRestaurants.list = newList;
	                        $scope.searchRestaurants.isSearching = false;
	                    });
				}
				else
				{
					$scope.searchRestaurants.list = [];
				}
			}
		}
	}
]);
