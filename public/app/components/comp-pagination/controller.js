var APP = angular.module("APP");
APP.directive("compPagination", [function() {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "components/comp-pagination/template.hbs",
        scope: {
            currentPage: "=",
            itemCount: "@",
            perPage: "@",
            params: "=",
            path: "@"
        },
        controller: ["$scope", "$state", function($scope, $state) {
            $scope.model = {
                pages: [],
                first_page: {},
                last_page: {}
            };
            $scope.pages = 0;
            $scope.cp = undefined;
            $scope.$watch("[itemCount, perPage]", function(new_val, old_val) {
                if (isNaN(parseInt(new_val)))
                    return;
                $scope.pages = Math.floor(Number($scope.itemCount) / Number($scope.perPage));
                var cp = $scope.currentPage;
                if (cp < 1)
                    cp = 1;
                else if (cp > $scope.pages)
                    cp = $scope.pages;
                $scope.currentPage = cp;
                $scope.page_list();
            }, true);

            $scope.set_page = function(query, page) {
                query.page = page;
                return query;
            };

            var push_to_pages = function(pages, params, page) {
                var _page = {};
                angular.copy(params, _page);
                _page.page = page;
                pages.push(_page);
            };
            $scope.page_list = function() {
                var pages = [],
                    first_page,
                    last_page,
                    min_page = parseInt($scope.currentPage) - 5,
                    max_page = parseInt($scope.currentPage) + 5;

                if (isNaN(min_page) || isNaN(max_page))
                    return;

                if (min_page < 1) {
                    min_page = 1;
                    max_page += (11 - max_page);
                }
                if (max_page > $scope.pages) {
                    max_page = $scope.pages;
                    min_page -= 10 - (max_page - min_page);
                }
                if (min_page < 1)
                    min_page = 1;

                if (min_page > 1)
                    first_page = 1;
                if (max_page < $scope.pages)
                    last_page = $scope.pages;
                for (var i = min_page; i < max_page + 1; i++) {
                    push_to_pages(pages, $scope.params, i);
                }

                if (pages.length === 1) {
                    $scope.model.first_page = undefined;
                    $scope.model.last_page = undefined;
                    $scope.model.pages = [];
                } else {
                    angular.copy($scope.params, $scope.model.first_page);
                    angular.copy($scope.params, $scope.model.last_page);
                    $scope.model.first_page.page = first_page < 0 ? 1 : first_page;
                    $scope.model.last_page.page = last_page > $scope.pages ? max_page : last_page;
                    $scope.model.pages = pages;
                }
            };
        }]
    };
}]);