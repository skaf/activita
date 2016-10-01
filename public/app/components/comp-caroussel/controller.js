var APP = angular.module("APP");
APP.directive("compCaroussel", [function() {
    return {
        replace: true,
        restrict: "E",
        scope: {
            intervalSpeed: "@",
            slideSpeed: "@"
        },
        transclude: true,
        templateUrl: "components/comp-caroussel/template.hbs",
        controller: ["$scope", "$interval", function($scope, $interval) {

            $scope.active = false;
            $scope.current = 0;

            $scope.speed = ($scope.slideSpeed && !isNaN($scope.slideSpeed)) ? parseInt($scope.slideSpeed) : 1000;

            var timer;
            $scope.create_wrapper = function(index) {
                var element = $scope.elements[index];
                var wrapper = document.createElement("div");
                $(wrapper).addClass("comp-caroussel-wrapper-elements-wrapper-element");
                $(wrapper).attr("data-index", index);
                $(wrapper).append(element);
                return wrapper;
            };


            $scope.next = function(index) {
                if ($scope.active)
                    return;
                $scope.active = true;
                var current_index = isNaN(index) ? ($scope.current + 1) : index;
                if (current_index >= $scope.elements.length)
                    current_index = 0;

                var wrapper = $scope.create_wrapper(current_index);
                $($scope.element).append(wrapper);

                $($scope.element).animate({
                    left: -$($scope.element).width()
                }, $scope.speed, function() {
                    $scope.$apply(function() {
                        $($scope.element).css("left", "0px");
                        $($scope.element).children(":first").remove();
                        $scope.active = false;
                        $scope.current = current_index;
                    });
                });
            };

            $scope.previous = function(index) {
                if ($scope.active)
                    return;
                $scope.active = true;
                var current_index = isNaN(index) ? ($scope.current - 1) : index;
                if (current_index < 0)
                    current_index = $scope.elements.length - 1;


                var wrapper = $scope.create_wrapper(current_index);
                $($scope.element).prepend(wrapper);
                $($scope.element).css("left", -$($scope.element).width());
                $($scope.element).animate({
                    left: 0
                }, $scope.speed, function() {
                    $scope.$apply(function() {
                        $($scope.element).css("left", "0px");
                        $($scope.element).children(":last").remove();
                        $scope.active = false;
                        $scope.current = current_index;
                    });
                });
            };

            $scope.slide = function(index) {
                if ($scope.active)
                    return;
                $interval.cancel(timer);
                var current_element_index = $($($scope.element).find(".comp-caroussel-wrapper-elements-wrapper-element")[0]).attr("data-index");
                if (index > current_element_index)
                    $scope.next(index);
                else if (index < current_element_index)
                    $scope.previous(index);
            };

            $scope.$watch("elements", function(val) {
                if (val) {
                    if ($scope.intervalSpeed && !isNaN($scope.intervalSpeed))
                        timer = $interval(function() {
                            $scope.next();
                        }, $scope.intervalSpeed);
                }
            });

        }],
        link: function($scope, element, attributes) {
            $scope.element = element[0].querySelector(".comp-caroussel-wrapper-elements-wrapper");
            $scope.elements = [];
            var elements = element[0].querySelectorAll("ng-transclude > *");
            var l = elements.length;
            for (var i = 0; i < l; i++) {
                $scope.elements.push(elements[i]);
            }
            $($scope.element).append($scope.create_wrapper(0, element[0].querySelector(".comp-caroussel-wrapper-elements-wrapper")));
            element[0].removeChild(element[0].querySelector("ng-transclude"));
        }
    };
}]);