'use strict';


var dummyStampsData = [
				{ id: 1,
				  name: 'Treble Chef',
				  description: 'Eat at three great restaurants',
				  achievementtype: 'list_count',
				  icon: null,
				  belongstolist: 1,
				  listcount: 3 },
				{ id: 2,
				  name: 'Perry Winkle',
				  description: 'Eat at the pony-tailed ones restaurants',
				  achievementtype: 'list_type',
				  restaurants: [ 1, 3] }
			];


foodStampsServices.factory('Stamps',
	function()
	{
		var stampsService = {};
		stampsService.query = function()
		{
			return dummyStampsData;
		};
		stampsService.get = function(id)
		{
			var	searchData = stampsService.query();
			if (id > 0)
			{
				for (var i = 0; i < searchData.length; i++)
				{
					if (searchData[i].id == id)
					{
						return searchData[i];
					}
				}
			}
			return undefined;
		};
		return stampsService;
	});

