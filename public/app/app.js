var APP = angular.module("APP", ["ui.router", "ngPapaParse", "APPTemplates", "ngConstants"]);

APP.controller("APPController", ["$scope", "$window", "$location", "ENV", function($scope, $window, $location, ENV) {
    $scope.ENV = ENV;

    if (!ENV.production)
        return;
    // (function(i, s, o, g, r, a, m) {
    //     i['GoogleAnalyticsObject'] = r;
    //     i[r] = i[r] || function() {
    //         (i[r].q = i[r].q || []).push(arguments)
    //     }, i[r].l = 1 * new Date();
    //     a = s.createElement(o),
    //         m = s.getElementsByTagName(o)[0];
    //     a.async = 1;
    //     a.src = g;
    //     m.parentNode.insertBefore(a, m)
    // })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    // ga('create', 'UA-XXXXX-Y', 'auto');

    // $scope.$on('$viewContentLoaded', function(event) {
    //     $window.ga('send', 'pageview', {
    //         page: $location.url()
    //     });
    // });
}]);