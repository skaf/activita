/**
 * Expects bool to be given to the component
 * Expects label to be given
 * Example: <comp-check-box bool=[variable|bool] label=[variable|String]></comp-check-box>
 */

var APP = angular.module("APP");
APP.directive("checkBox", [function() {
    return {
        replace: true,
        restrict: "E",
        templateUrl: "components/check-box/template.hbs",
        scope: {
            bool: "=", //Short for =bool (Object)
            label: "@" //Short for =label (String)
        },
        controller: ["$scope", function($scope) {
            $scope.click = function() {
                $scope.bool = !$scope.bool;
            };

            $scope.class = function() {
                return $scope.bool ? "fa-check-square-o" : "fa fa-square-o";
            };

        }]
    };
}]);