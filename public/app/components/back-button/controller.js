var APP = angular.module("APP");
APP.directive("backButton", [function() {
    return {
        replace: true,
        restrict: "E",
        scope: {},
        transclude: true,
        templateUrl: "components/back-button/template.hbs",
        controller: ["$scope", "$window", "ENV", function($scope, $window, ENV) {
            $scope.actions = {
                back: function() {
                    $window.history.back();
                }
            };
        }]
    };
}]);