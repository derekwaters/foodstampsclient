'use strict';

/* Controllers */

foodStampsModule.controller('ListsController',[
	'$scope', '$routeParams', 'Users', 'Lists', 'Restaurants',
	function($scope, $routeParams, Users, Lists, Restaurants)
	{
		if ($routeParams.id)
		{
			$scope.theList = Lists.get($routeParams.id);
			$scope.restaurants = Restaurants.getList($scope.theList.restaurants);
		}
		else
		{
			$scope.joinedLists = [];
			$scope.searchLists = {};
			$scope.searchLists.isSearching = false;
			$scope.searchLists.list = [];
			$scope.searchLists.search = '';

			$scope.onListSearch = function()
			{
				if ($scope.searchLists.search.length > 0)
				{
					$scope.searchLists.isSearching = true;
					Lists.query($scope.searchLists.search, function(newList)
	                    {
	                        $scope.searchLists.list = newList;
	                        $scope.searchLists.isSearching = false;
	                    });
				}
				else
				{
					$scope.searchLists.list = [];
				}
			}

			var joinedLists = Users.getJoinedLists();
			for (var i = 0; i < joinedLists.length; i++)
			{
				var addList = {};
				addList.list = Lists.get(joinedLists[i]);
				addList.score = 50;
				addList.totalScore = 100;
				addList.totalVisits = 10;

				$scope.joinedLists.push(addList);
			}
		}
	}
]);
