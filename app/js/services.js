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
			if (id > 0)
			{
				for (var i = 0; i < dummyUserData.length; i++)
				{
					if (dummyUserData[i].id == id)
					{
						return dummyUserData[i];
					}
				}
			}
			return undefined;
		};
		usersService.getCurrentUser = function()
		{
			return usersService.findUser(dummyCurrentUser);
		};

		return usersService;
	});