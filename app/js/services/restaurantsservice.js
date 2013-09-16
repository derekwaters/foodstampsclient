'use strict';

var dummyRestaurantData = [
				{ id: 1,
				  name: 'Vue de Monde',
				  location : { latitude: -37.816095, longitude: 144.960198 },
				  address : 'Rialto, Collins Street, Melbourne',
				  phone : '123456789',
				  email : 'vue@vuedemonde.com.au',
				  website : 'http://www.vuedemonde.com.au',
				  tags : [ 'views' , 'degustations', 'silver service' ],
				  cuisine : 'Modern Australian',
				  chef : 'Shannon Bennett',
				  coverimage : null },
				{ id: 2,
				  name: 'Spice Temple',
				  location : { latitude: -33.866019, longitude: 151.210339 },
				  address : 'Crown',
				  phone: '123456789',
				  email: 'info@spicetemple.com',
				  website: 'http://www.spicetemple.com',
				  tags : ['spice'],
				  cuisine : 'Modern Asian',
				  chef : 'Neil Perry',
				  coverimage : null },
				{ id: 3,
				  name: 'Coda',
				  location: { latitude: -37.814251, longitude: 144.963169 },
				  address : 'Not Sure',
				  phone : '123456789',
				  email : 'coda@coda.com.au',
				  website : 'http://www.coda.com.au',
				  tags : [ 'views' , 'degustations', 'silver service' ],
				  cuisine : 'Modern Australian',
				  chef : 'Someone',
				  coverimage : null },
				{ id: 4,
				  name: 'Balzac',
				  location: { latitude: -33.916304, longitude: 151.241099 },
				  address : 'Dunno',
				  phone : '123456789',
				  email : 'vue@vuedemonde.com.au',
				  website : 'http://www.vuedemonde.com.au',
				  tags : [ 'views' , 'degustations', 'silver service' ],
				  cuisine : 'Modern Australian',
				  chef : 'Shannon Bennett',
				  coverimage : null }
];






foodStampsServices.factory('Restaurants',
	function()
	{
		var restaurantService = {};
		restaurantService.query = function(filterText, resultFunction)
		{
			var resultList = [];
			for (var i = 0; i < dummyRestaurantData.length; i++)
			{
				if (dummyRestaurantData[i].name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0)
				{
					resultList.push(dummyRestaurantData[i]);
				}
			}
			resultFunction(resultList);
		};
		restaurantService.get = function(id)
		{
			var searchData = dummyRestaurantData;
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
		restaurantService.getRestaurantUrl = function(restId)
		{
			return "#/restaurants/" + restId;
		}
		return restaurantService;
	});