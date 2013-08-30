'use strict';

/* Controllers */

foodStampsModule.controller('HomeController',[
	'$scope', 'Feed', 'Users', 'Lists', 'Restaurants', 'Posts', 'Stamps',
	function($scope, Feed, Users, Lists, Restaurants, Posts, Stamps)
	{
		var theFeed = Feed.getFeed(Users.getCurrentUser());
		$scope.feedItems = [];

		for (var i = 0; i < theFeed.length && i < 100; i++)
		{
			var feedItem = theFeed[i];
			if (feedItem.otheruser !== undefined)
			{
				feedItem.otheruser = Users.get(feedItem.otheruser);
				feedItem.otheruser.url = Users.getUserUrl(feedItem.otheruser.id);
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
			$scope.feedItems.push(feedItem);
		}
	}
]);
