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
		listService.query = function(filterText, resultFunction)
		{
			var resultList = [];
			var checkFilter = filterText.toLowerCase();
			for (var i = 0; i < dummyListData.length; i++)
			{
				if (dummyListData[i].name.toLowerCase().indexOf(checkFilter) >= 0 ||
					dummyListData[i].description.toLowerCase().indexOf(checkFilter) >= 0)
				{
					resultList.push(dummyListData[i]);
				}
			}
			resultFunction(resultList);
		};
		listService.queryContaining = function(restaurantId)
		{
			var results = [];
			for (var i = 0; i < dummyListData.length; i++)
			{
				if (dummyListData[i].restaurants.indexOf(restaurantId) >= 0)
				{
					results.push(dummyListData[i]);
				}
			}
			return results;
		}
		listService.get = function(id)
		{
			var searchData = dummyListData;
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
		listService.getListUrl = function(id)
		{
			return "#/lists/" + id;
		}
		return listService;
	});

