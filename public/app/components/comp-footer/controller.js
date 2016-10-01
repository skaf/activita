var APP = angular.module("APP");
APP.directive("compFooter", [function() {
    return {
        replace: true,
        restrict: "E",
        scope: {},
        templateUrl: "components/comp-footer/template.hbs",
        controller: ["$scope", "ENV", function($scope, ENV) {
            $scope.ENV = ENV;
        }]
    };
}]);