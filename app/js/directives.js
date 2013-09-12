'use strict';

/* Directives */

var foodStampsDirectives = angular.module('foodStamps.directives', []);

foodStampsDirectives.directive('tabset', function() {
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
          '<ul class="nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.heading}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  });

foodStampsDirectives.directive('tab', function() {
    return {
      require: '^tabset',
      restrict: 'E',
      transclude: true,
      scope: { heading: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })

foodStampsDirectives.directive('userbadge', ['Users', function(Users) {
    return {
        restrict: 'A',
        replace: true,
        transclude: false,
        scope:
        {
        },
        link: function (scope, element, attrs)
        {
          scope.badge = {};
          scope.badge.user = Users.get(attrs.userid);
          scope.badge.url = Users.getUserUrl(attrs.userid);
        },
        template:
          '<div class="userbadge"><a href="{{badge.url}}">' +
            '<div class="userbadge-name">{{badge.user.name}}</div>' +
            '<div class="userbadge-avatar">IMG HERE</div>' +
          '</a></div>'
    };
  }]);


foodStampsDirectives.directive('fileInput', ['$parse', function($parse)
{
    return {
      restrict: "EA",
      template: "<input type='file' />",
      replace: true,
      link: function (scope, element, attrs)
      {
        var modelGet = $parse(attrs.fileInput);
        var modelSet = modelGet.assign;
        var onChange = $parse(attrs.onChange);

        var updateModel = function()
        {
          scope.$apply(function()
          {
            modelSet(scope, element[0].files[0]);
            onChange(scope);
          });
        };

        element.bind('change', updateModel);
      }
    };
}]);
