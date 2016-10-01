var APP = angular.module("APP");
APP.directive("compNavbarWhite", [function() {
    return {
        replace: true,
        restrict: "E",
        scope: {},
        templateUrl: "components/comp-navbar-white/template.hbs",
        controller: ["$scope", function($scope) {}]
    };
}]);