'use strict';

/* Controllers */

foodstampsModule.controller('ProfileController',[
	'$scope', '$routeParams', 'Users',
	function($scope, $routeParams, Users)
	{
		if ($routeParams.id)
		{
			$scope.profileUser = Users.findUser($routeParams.id);
			$scope.isCurrent = ($routeParams.id == Users.getCurrentUser().id);
		}
		else
		{
			$scope.profileUser = Users.getCurrentUser();
			$scope.isCurrent = true;
		}
		$scope.profileUser.update = function ()
		{
			Users.updateUser($scope.profileUser);
		}
	}
]);
