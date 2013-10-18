'use strict';


var dummyUserData = [
				{ id: 1,
				  name: 'Derek',
				  email: 'derek@foodstamps.com',
				  avatar: null,
				  gender: 'Male',
				  location: 'Melbourne',
				  tutorialProgress: 0,
				  isAdmin: true,
				  following: [ 2, 3 ],
				  followedBy: [ 2 ] },
				{ id: 2,
				  name: 'Alice',
				  email: 'alice@foodstamps.com',
				  avatar : null,
				  gender : 'Female',
				  location: 'Melbourne',
				  tutorialProgress: 0,
				  isAdmin: false,
				  following: [ 1, 3 ],
				  followedBy: [ 1 ] },
				{ id: 3,
				  name: 'Wayne',
				  email: 'wayne@foodstamps.com',
				  avatar: null,
				  gender: 'Male',
				  location: 'Melbourne',
				  tutorialProgress: 0,
				  isAdmin: true,
				  following: [ ],
				  followedBy: [ 1, 2 ] }
			];


function signinCallback(authResult)
{
	var checkScope = angular.element(document.getElementById('fsroot')).scope();
	checkScope.auth.handleSignin(authResult);
	checkScope.$apply();
}


foodStampsServices.factory('Users',
	function()
	{
		var usersService = {};
		usersService.currentId = undefined;
		// usersService.currentId = 1;

		usersService.loginUser = function(emailAddress, resultCallback)
		{
			// TODO: Do some AJAX to the API here
			//
			resultCallback({ unknownUser : '1',
							 userEmail: emailAddress });
		}

		usersService.registerUser = function(displayName, emailAddress, avatarUrl, genderStr, registerCallback)
		{
			// TODO: Do some AJAX stuff here
			var newUser = { id : 500,
							name: displayName,
							email: emailAddress,
							avatar: null,		// TODO: Make this work
							gender: genderStr,
							location: null,
							tutorialProgress: 0,
							isAdmin: false,
							following: [],
							followedBy: [] };
			dummyUserData.push(newUser);
			usersService.currentId = newUser.id;
			registerCallback();
		}

		usersService.query = function()
		{
			return dummyUserData;
		};
		usersService.get = function(id)
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
			return usersService.get(usersService.currentId);
		};
		usersService.setCurrentUser = function(newUserId)
		{
			usersService.currentId = newUserId;
		}
		usersService.getJoinedLists = function()
		{
			var theLists = [];
			theLists.push(1);
			return theLists;
		}
		usersService.getUserUrl = function(userId)
		{
			return "#/profile/" + userId;
		}
		usersService.getUserAvatarUrl = function(userId)
		{
			return "/avatar/" + userId;
		}
		usersService.updateUser = function(userProfile)
		{
			var	searchData = usersService.query();
			if (id > 0)
			{
				for (var i = 0; i < searchData.length; i++)
				{
					if (searchData[i].id == id)
					{
						searchData[i].name = userProfile.name;
						searchData[i].email = userProfile.email;
						searchData[i].gender = userProfile.gender;
						searchData[i].location = userProfile.location;
					}
				}
			}
		}
		return usersService;
	});

