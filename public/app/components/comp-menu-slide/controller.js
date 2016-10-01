/**
 *  Component currently designed for products/search and it display a lsit of options with a title
 *
 *  @title: "String", The title describing the options
 *  @options: Object[{name: "String", bool: Boolean}], An object that can be toggled between true and false
 *  @isRadio: Bool, when false the list of options acts as checkbox with multiple selections, and when false only one bool can be true
 */
var APP = angular.module("APP");
APP.directive("compMenuSlide", [function() {
    return {
        replace: true,
        restrict: "E",
        scope: {
            title: "@",
            options: "=",
            isRadio: "="
        },
        templateUrl: "components/comp-menu-slide/template.hbs",
        controller: ["$scope", function($scope) {

            $scope.slide_down = true;

            $scope.toggle_display = function() {
                $scope.slide_down = !$scope.slide_down;
                $($scope.slide_element)
                    .stop()
                    .slideToggle();
            };

            $scope.all = function(bool) {
                $scope.options.forEach(function(option) {
                    option.bool = bool === true;
                });
            };

            $scope.toggle_bool = function(option) {
                if (!$scope.isRadio)
                    return option.bool = !option.bool;
                $scope.all(false);
                option.bool = true;
            };
        }],
        link: function(scope, element, attr) {
            scope.slide_element = element[0].querySelector(".comp-menu-slide-elements");
        }
    };
}]);