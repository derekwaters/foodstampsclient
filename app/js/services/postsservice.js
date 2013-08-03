'use strict';


foodStampsServices.factory('Posts',
	function(Users)
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
		postsService.addPost = function(restaurantId, reviewDate, reviewMealType, reviewScore, reviewText)
		{
			var newPost = {};
			newPost.reviewedBy = Users.getCurrentUser().id;
			newPost.reviewDate = reviewDate;
			newPost.reviewText = reviewText;
			newPost.reviewMealType = reviewMealType;
			newPost.reviewScore = reviewScore;
			if (postsService.postCache[restaurantId] == null)
			{
				postsService.postCache[restaurantId] = [];
			}
			postsService.postCache[restaurantId].push(newPost);
			return newPost;
		}
		return postsService;
	});