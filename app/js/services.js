'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

var foodStampsServices = angular.module('foodstamps.services', []);

foodStampsServices.value('version', '0.3');



var dummyUserData = [
				{ id: 1, name: 'Derek', email: 'derek@foodstamps.com', isAdmin: true },
				{ id: 2, name: 'Alice', email: 'alice@foodstamps.com', isAdmin: false },
				{ id: 3, name: 'Wayne', email: 'wayne@foodstamps.com', isAdmin: true }
			];
var dummyCurrentUser = 1;

var dummyListData = [
				{ id: 1, name: 'Top 100 Restaurants', restaurants: [1, 2, 3] }
];

var dummyRestaurantData = [
				{ id: 1, name: 'Vue de Monde' },
				{ id: 2, name: 'Spice Temple' },
				{ id: 3, name: 'Code' },
				{ id: 4, name: 'Balzac' }
];


foodStampsServices.factory('Users', 
	function()
	{
		var usersService = {};
		usersService.query = function()
		{
			return dummyUserData;
		};
		usersService.findUser = function(id)
		{
			var	searchData = usersService.query();
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
		usersService.getCurrentUser = function()
		{
			return usersService.findUser(dummyCurrentUser);
		};
		usersService.getJoinedLists = function()
		{
			var theLists = [];
			theLists.push(1);
			return theLists;
		}

		return usersService;
	});


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