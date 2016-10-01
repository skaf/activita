var APP = angular.module("APP");

/****************************************************
 *                                                  *
 *              Defining routes                     *
 *                                                  *
 ***************************************************/
APP.config(["$locationProvider", "$stateProvider", "$urlRouterProvider", "$httpProvider", function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
        .state("application", {
            url: "",
            templateUrl: "application/template.hbs",
            controller: "applicationController"
        })
        .state("application.index", {
            url: "/",
            controller: "indexController",
            templateUrl: "application/index/template.hbs"
        })

    .state("application.about", {
        url: "/about/",
        controller: "aboutController",
        templateUrl: "application/about/template.hbs"
    })

    .state("application.contact", {
        url: "/contact/",
        controller: "contactController",
        templateUrl: "application/contact/template.hbs"
    })

    .state("application.404", {
        url: "/404/",
        controller: "404Controller",
        templateUrl: "application/404/template.hbs"
    });

    $urlRouterProvider
        .otherwise("/404");

    $locationProvider.html5Mode(true); //Removes the HASHTAG
    $httpProvider.defaults.cache = true; //Makes sure http requests caches
}]);