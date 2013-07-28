'use strict';

/* Directives */

var foodstampsDirectives = angular.module('foodstamps.directives', []);



foodstampsDirectives.directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];
 
        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  });

foodstampsDirectives.directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  });




/*
foodStampsDirectives.directive('tabset', function()
	{
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: function($scope, $element)
			{
				var theTabs = $scope.theTabs = [];

				$scope.selectTab = function(selectedTab)
				{
					angular.forEach(theTabs, function(theTab)
					{
						theTab.selected = false;
					});
					selectedTab.selected = true;
				}

				$scope.addTab = function(newTab)
				{
					if (theTabs.length == 0)
					{
						$scope.selectTab(newTab);
					}
					theTabs.push(newTab);
				}
			},
			template:
				'<div class="tabbable">' +
					'<ul class="tabset">' +
						'<li ng-repeat="tab in theTabs" ng-class="{active:tab.selected}">' +
							'<a href="" ng-click="selectTab(tab)">{{tab.title}}</a>' +
						'</li>' +
					'</ul>' +
					'<div class="tabcontent" ng-transclude></div>' +
				'</div>',
			replace: true
		};
	});

foodStampsDirectives.directive('tab', function()
	{
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			require: '^tabset',
			scope: { title: '@' },
			template: '<div class="tabpage" ng-class="{active: selected}" ng-transclude>' +
				'</div>',
			link: function(scope, element, attrs, tabsetController)
			{
				tabsetController.addTab(scope);
			}
		};
	});

	*/