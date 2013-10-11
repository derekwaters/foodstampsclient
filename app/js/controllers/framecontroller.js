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
				$scope.auth.currentUser = Users.getCurrentUser();
				$scope.auth.loginState = 'loggedIn';
			}
			else
			{
				$scope.auth.currentUser = null;
				$scope.auth.loginState = 'notLoggedIn';
			}
		}

		$scope.auth.hasCurrentUser = function()
		{
			return ($scope.auth.currentUser != null);
		}
	}
]);
