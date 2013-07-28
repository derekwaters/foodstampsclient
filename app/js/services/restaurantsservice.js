'use strict';

var dummyRestaurantData = [
				{ id: 1, name: 'Vue de Monde' },
				{ id: 2, name: 'Spice Temple' },
				{ id: 3, name: 'Code' },
				{ id: 4, name: 'Balzac' }
];


foodStampsServices.factory('Restaurants', 
	function()
	{
		var restaurantService = {};
		restaurantService.query = function()
		{
			return dummyRestaurantData;
		};
		restaurantService.get = function(id)
		{
			var searchData = restaurantService.query();
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
		restaurantService.getList = function(restIds)
		{
			var result = [];
			for (var i = 0; i < restIds.length; i++)
			{
				var checkRestaurant = restaurantService.get(restIds[i]);
				if (checkRestaurant != undefined)
				{
					result.push(checkRestaurant);
				}
			}
			return result;
		}
		return restaurantService;
	});