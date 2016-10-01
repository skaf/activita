var APP = angular.module("APP");
APP.directive("compNavbar", [function() {
    return {
        replace: true,
        restrict: "E",
        scope: {},
        templateUrl: "components/comp-navbar/template.hbs",
        controller: ["$scope", function($scope) {}]
    };
}]);