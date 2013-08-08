'use strict';

var dummyRestaurantData = [
				{ id: 1, name: 'Vue de Monde', location : { latitude: -37.816095, longitude: 144.960198 } },
				{ id: 2, name: 'Spice Temple', location : { latitude: -33.866019, longitude: 151.210339 } },
				{ id: 3, name: 'Code', location: { latitude: -37.814251, longitude: 144.963169 } },
				{ id: 4, name: 'Balzac', location: { latitude: -33.916304, longitude: 151.241099 } }
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