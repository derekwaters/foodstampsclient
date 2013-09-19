'use strict';

/* Directives */

var foodStampsDirectives = angular.module('foodStamps.directives', []);

foodStampsDirectives.directive('angularLoader', function()
{
  return {
    restrict: 'C',
    link: function(scope, elem, attrs)
    {
      elem.removeClass('waiting-for-angular');
      // Any other initialisation?
    }
  }
});

foodStampsDirectives.directive('starRating', function()
{
  return {
    restrict: 'A',
    template: '<ul class="star-rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                      '\u2605' +
                  '</li>' +
                '</ul>',
    scope: {
        ratingValue: '=',
        max: '=',
        readOnly: '@'
      },
    link: function(scope, element, attrs)
    {
      var updateStars = function()
      {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++)
        {
          scope.stars.push({ filled: i < scope.ratingValue });
        }
      };

      scope.$watch('ratingValue', function(oldVal, newVal)
      {
        if (newVal !== null)
        {
          updateStars();
        }
      });

      scope.toggle = function(index)
      {
        if (scope.readOnly && scope.readOnly == "true")
        {
          return;
        }
        scope.ratingValue = index + 1;
      };
    }
  }
});

foodStampsDirectives.directive('userBadge', ['Users', function(Users) {
    return {
        restrict: 'A',
        scope:
        {
          userId: '='
        },
        link: function (scope, element, attrs)
        {
          var refreshBadge = function()
          {
            scope.badge = {};
            scope.badge.user = Users.get(scope.userId);
            scope.badge.url = Users.getUserUrl(scope.userId);
          }

          scope.$watch('user', function(oldVal, newVal)
          {
            refreshBadge();
          });
        },
        template:
          '<div class="userbadge"><a href="{{badge.url}}">' +
            '<div class="userbadge-name">{{badge.user.name}}</div>' +
            '<div class="userbadge-avatar">IMG HERE</div>' +
          '</a></div>'
    };
  }]);

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
