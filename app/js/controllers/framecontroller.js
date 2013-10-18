'use strict';

/* Frame Controller */

foodStampsModule.controller('FrameController',[
	'$scope', 'Users',
	function($scope, Users)
	{
		$scope.auth = {};
		$scope.auth.loginState = 'checkingLogin';
		$scope.auth.handleSignin = function(authResult)
		{
			if (authResult['access_token'])
			{
				$scope.auth.loginUser();
			}
			else
			{
				$scope.auth.currentUser = null;
				$scope.auth.loginState = 'notLoggedIn';
			}
		}

		$scope.auth.loginUser = function()
		{
			// Get the user's email address to connect to the server
			//
			gapi.client.load('oauth2', 'v2', function()
			{
				var request = gapi.client.oauth2.userinfo.get();
				request.execute(function(resultData)
				{
					if (resultData['email'])
					{
						Users.loginUser(resultData['email'], function(results)
						{
							$scope.auth.connectNewUser(results);
						});
					}
				});
			});
		}

		$scope.auth.connectNewUser = function(results)
		{
			if (results.unknownUser)
			{
				gapi.client.load('plus', 'v1', function()
				{
					var request = gapi.client.plus.people.get( { 'userId' : 'me' });
					request.execute(function(profile)
					{
						Users.registerUser(profile.displayName, results.userEmail, profile.image.url, profile.gender, function()
						{
							$scope.auth.setupUser();
						})
					});
				});
			}
			else
			{
				$scope.auth.setupUser();
			}
		}

		$scope.auth.setupUser = function()
		{
			$scope.auth.currentUser = Users.getCurrentUser();
			$scope.auth.loginState = 'loggedIn';
			$scope.$apply();
		}

/*
				gapi.client.load('oauth2', 'v2', function()
				{
					var request = gapi.client.oauth2.userinfo.get();
					request.execute(function(resultData)
					{
						if (resultData['email'])
						{
							alert(resultData['email']);
						}
					});
				});
*/
/*
				gapi.client.load('plus', 'v1', function()
				{
					var request = gapi.client.plus.people.get( { 'userId' : 'me' });
					request.execute(function(results)
					{
						alert("Here!");
					});
				});
*/

		$scope.auth.hasCurrentUser = function()
		{
			return ($scope.auth.currentUser != null);
		}
	}
]);
