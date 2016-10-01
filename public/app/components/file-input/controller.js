var APP = angular.module("APP");
APP.directive("fileInput", [function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "components/file-input/template.hbs",
        scope: {
            file: "="
        },
        controller: ["$scope", function($scope) {}],
        link: function($scope, element, attributes) {
            element.bind('change', function() {
                $scope.$apply(function() {
                    return $scope.file = element[0].files[0];
                });
            });
        }
    };
}]);