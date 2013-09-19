'use strict';

/* Controllers */

foodStampsModule.controller('HomeController',[
	'$scope', 'Feed', 'Users', 'Lists', 'Restaurants', 'Posts', 'Stamps',
	function($scope, Feed, Users, Lists, Restaurants, Posts, Stamps)
	{
		$scope.feed = {};
		$scope.feed.busy = false;
		$scope.feed.items = [];
		$scope.feed.lastId = null;

		$scope.feed.nextPage = function()
		{
			if ($scope.feed.busy)
				return;
			$scope.feed.busy = true;

			var newItems = Feed.getFeed(Users.getCurrentUser(), $scope.feed.lastId);

			for (var i = 0; i < newItems.length && i < 100; i++)
			{
				var feedItem = newItems[i];
				if (feedItem.otheruser !== undefined)
				{
					feedItem.other = Users.get(feedItem.otheruser);
					feedItem.other.url = Users.getUserUrl(feedItem.otheruser);
				}
				if (feedItem.restaurantref !== undefined)
				{
					feedItem.restaurant = Restaurants.get(feedItem.restaurantref);
					feedItem.restaurant.url = Restaurants.getRestaurantUrl(feedItem.restaurantRef);
				}
				if (feedItem.reviewref !== undefined)
				{
					feedItem.review = Posts.get(feedItem.reviewref);
					// TODO: DEBUG ONLY!
					if (feedItem.review === undefined)
					{
						feedItem.review = {};
					}
					feedItem.review.url = Posts.getPostUrl(feedItem.reviewref);
				}
				if (feedItem.listref !== undefined)
				{
					feedItem.list = Lists.get(feedItem.listref);
					feedItem.list.url = Lists.getListUrl(feedItem.listref);
				}
				if (feedItem.achievementref !== undefined)
				{
					feedItem.achievement = Stamps.get(feedItem.achievementref);
				}
				$scope.feed.items.push(feedItem);
				$scope.feed.lastId = feedItem.id;
			}

			$scope.feed.busy = false;
		};
	}
]);
