'use strict';

/* Controllers */

foodstampsModule.controller('SearchController',[
	'$scope',
	function($scope)
	{
		$scope.search = {};
		$scope.search.text = null;
		$scope.search.doSearch = function()
		{
			alert('Search for: ' + $scope.search.text + '!');
			$scope.search.text = null;
		}
	}
]);
