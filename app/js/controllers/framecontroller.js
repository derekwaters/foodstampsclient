'use strict';

/* Frame Controller */

foodStampsModule.controller('FrameController',[
	'$scope', 'Users',
	function($scope, Users)
	{
		$scope.currentUser = Users.getCurrentUser();
		$scope.hasCurrentUser = function()
		{
			return ($scope.currentUser != null);
		}

		$scope.$watch('Users.currentId', function(newValue, oldValue)
		{
			$scope.currentUser = Users.getCurrentUser();
		});

		$scope.doTheThing = function()
		{
			dummyCurrentUser = 1;
			$scope.currentUser = Users.getCurrentUser();
		}
	}
]);
