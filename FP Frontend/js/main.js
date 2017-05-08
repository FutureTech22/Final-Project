(function() {
    'use strict';

    angular
        .module('routing', ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        'content': {
                            templateUrl: '../partials/home.html',
                            controller:'pollutantController',
                            controllerAs:"vm",

                        },
                    }
                })
            $stateProvider
                .state('map', {
                    url: '/map',
                    views: {
                        'content': {
                            templateUrl: '../partials/map.html',
                            controller:'locationController',
                            controllerAs: "vm",
                            
                        },
                    }
                })
            $stateProvider
                .state('info', {
                    url: '/info',
                    views: {
                        'content': {
                            templateUrl: '../partials/information.html',
                            controller:'pollutantController',
                            controllerAs:"vm",
                        },
                    }
                })
            $stateProvider
                .state('blog', {
                    url: '/blog',
                    views: {
                        'content': {
                            templateUrl: '../partials/blog.html',
                            
                        },
                    }
                })
            $stateProvider
                .state('locations', {
                    url: '/locations',
                    views: {
                        'content': {
                            templateUrl: '../partials/locations.html',
                            controller:'pollutantController',
                            controllerAs:"vm",
                        },
                    }
                })
            $stateProvider
                .state('userLogin', {
                    url: '/userLogin',
                    views: {
                        'content': {
                            templateUrl: '../partials/userLogin.html',
                            controller:'mainController',
                            controllerAs:"vm",
                        },
                    }
                })

        })
})();
