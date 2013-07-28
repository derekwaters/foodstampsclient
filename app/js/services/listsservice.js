'use strict';

var dummyListData = [
				{ id: 1, name: 'Top 100 Restaurants', restaurants: [1, 2, 3] }
];

foodStampsServices.factory('Lists', 
	function()
	{
		var listService = {};
		listService.query = function()
		{
			return dummyListData;
		};
		listService.get = function(id)
		{
			var searchData = listService.query();
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
		return listService;
	});

