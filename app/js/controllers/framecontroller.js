'use strict';

/* Frame Controller */

foodstampsModule.controller('FrameController',[
	'$scope', 'Users', 
	function($scope, Users)
	{
		$scope.currentUser = Users.getCurrentUser();
	}
]);
