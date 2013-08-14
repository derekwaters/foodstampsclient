'use strict';

var dummyListData = [
				{ id: 1,
				  name: 'Top 100 Restaurants',
				  description: 'The Gourmet Traveller Top 100 Restaurants',
				  listtype: 'review_list',
				  createdby: 1,
				  createdon: '2013-01-01',
				  restaurants: [1, 2, 3] }
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

