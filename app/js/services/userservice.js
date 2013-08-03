'use strict';


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
		usersService.getUserUrl = function(userId)
		{
			return "/#/profile/" + userId;
		}

		return usersService;
	});

