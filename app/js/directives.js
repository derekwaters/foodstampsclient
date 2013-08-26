'use strict';

/* Directives */

var foodstampsDirectives = angular.module('foodstamps.directives', []);

foodstampsDirectives.directive('userbadge', ['Users', function(Users) {
    return {
        restrict: 'A',
        replace: false,
        scope: {},
        link: function (scope, element, attrs)
        {
          attrs.$observe('userbadge', function(value)
          {
            scope.badge = {};
            scope.badge.user = Users.get(value);
            scope.badge.url = Users.getUserUrl(value);
          });
        },
        template:
          '<div class="userbadge"><a href="{{badge.url}}">' +
            '<div class="userbadge-name">{{badge.user.name}}</div>' +
            '<div class="userbadge-avatar">IMG HERE</div>' +
          '</a></div>'
    };
  }]);


foodstampsDirectives.directive('fileInput', ['$parse', function($parse)
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
