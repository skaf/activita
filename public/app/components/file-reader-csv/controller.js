var APP = angular.module("APP");
APP.directive("fileReaderCsv", [function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "components/file-reader-csv/template.hbs",
        scope: {
            file: "=",
            headers: "=",
            data: "=",
        },
        controller: ["$scope", "Papa", function($scope, Papa) {}],
        link: function($scope, element, attributes) {
            element.bind('change', function() {
                var file = element[0].files[0];

                Papa.parse(file, {
                    header: true,
                    complete: function(results) {
                        $scope.$apply(function() {
                            angular.copy(results.meta.fields, $scope.headers);
                            angular.copy(results.data, $scope.data);
                            angular.copy(file, $scope.file);
                            console.log("done", results);
                        });
                    }
                });
            });
        }
    };
}]);