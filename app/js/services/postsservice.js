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
		postsService.getPost = function(restaurantId, postId)
		{
			if (postsService.postCache[restaurantId] != null)
			{
				for (var i = 0; i < postsService.postCache[restaurantId].length; i++)
				{
					if (postsService.postCache[restaurantId][i].id == postId)
					{
						return postsService.postCache[restaurantId][i];
					}
				}
			}
			return undefined;
		}
		postsService.addPost = function(restaurantId, reviewDate, reviewMealType, reviewScore, reviewText)
		{
			var newPost = {};
			newPost.id = Math.floor(Math.random() * 1000000);
			newPost.reviewedBy = Users.getCurrentUser().id;
			newPost.visitedOn = reviewDate;
			newPost.content = reviewText;
			newPost.mealType = reviewMealType;
			newPost.score = reviewScore;
			newPost.reviewedOn = new Date();
			newPost.restaurantId = restaurantId;

			if (postsService.postCache[restaurantId] === undefined)
			{
				postsService.postCache[restaurantId] = [];
			}
			postsService.postCache[restaurantId].push(newPost);

			return newPost;
		}
		postsService.addComment = function(restaurantId, postId, commentText)
		{
			var storedPost = this.getPost(restaurantId, postId);
			var newComment = {};
			newComment.commentBy = Users.getCurrentUser().id;
			newComment.content = commentText;
			newComment.commentedOn = new Date();
			if (storedPost.comments === undefined)
			{
				storedPost.comments = [];
			}
			storedPost.comments.push(newComment);
			return newComment;
		}
		return postsService;
	});