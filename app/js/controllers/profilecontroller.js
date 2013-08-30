'use strict';

/* Controllers */

foodStampsModule.controller('ProfileController',[
	'$scope', '$routeParams', 'Users', 'FileReaderService',
	function($scope, $routeParams, Users, FileReaderService)
	{
		$scope.avatar = {};

		$scope.$on("fileProgress", function(e, progress)
		{
			$scope.avatar.progress = (100 * progress.loaded) / progress.total;
		});

		$scope.avatar.uploadFile = function()
		{
			$scope.avatar.progress = 0;
			FileReaderService.readAsDataURL($scope.avatar.file, $scope)
				.then(function(result)
				{
					$scope.avatar.imageSrc = result;
				});
		};

		if ($routeParams.id)
		{
			$scope.profileUser = Users.get($routeParams.id);
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
