'use strict';


foodStampsServices.factory('Posts', 
	function()
	{
		var postsService = {};
		postsService.postCache = new Object();
		postsService.getPosts = function(restaurantId)
		{
			if (postsService.postCache[restaurantId] == null)
			{
				postsService.postCache[restaurantId] = [];
			}
			return postsService.postCache[restaurantId];
		};
		postsService.addPost = function(restaurantId, reviewText)
		{
			var newPost = {};
			newPost.reviewDate = new Date();
			newPost.reviewText = reviewText;
			if (postsService.postCache[restaurantId] == null)
			{
				postsService.postCache[restaurantId] = [];
			}
			postsService.postCache[restaurantId].push(newPost);
			return newPost;
		}
		return postsService;
	});