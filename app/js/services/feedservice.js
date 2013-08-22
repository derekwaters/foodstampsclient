'use strict';

var dummyFeedData = { '1' : [ { itemtype : 'follows_you', otheruser : 3, ondate : '09-Apr-2013' },
				 	  		  { itemtype : 'follows_you', otheruser : 2, ondate : '11-Apr-2013' },
				 	  		  { itemtype : 'you_visited', reviewref : 1, ondate : '13-Apr-2013' },
				 	  		  { itemtype : 'you_joined', listref : 1, ondate : '24-Apr-2013' },
				 	  		  { itemtype : 'you_achieved', achievementref : 1, reviewref : 1, ondate : '22-May-2013' } ] };

foodStampsServices.factory('Feed',
	function()
	{
		var feedService = {};
		feedService.getFeed = function(forUser)
		{
			if (dummyFeedData[forUser.id] !== undefined)
			{
				return dummyFeedData[forUser.id];
			}
			return null;
		}

		return feedService;
	});

