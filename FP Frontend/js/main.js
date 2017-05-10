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
                            controller:'mapController',
                            controllerAs: "vm",
                            
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
            $stateProvider
                .state('searchCity', {
                    url: '/searchCity',
                    views: {
                        'content': {
                            templateUrl: '../partials/searchCity.html',
                            controller:'pollutantController',
                            controllerAs:"vm",
                        },
                    }
                })
             $stateProvider
                .state('coInfo', {
                    url: '/coInfo',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/coInfo.html',
                            controller:'pollutantController',
                            controllerAs:"vm",
                        },
                    }
                })
            $stateProvider
                .state('no2Info', {
                    url: '/no2Info',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/no2Info.html',
                            controller:'pollutantController',
                            controllerAs:"vm",
                        },
                    }
                })
            $stateProvider
                .state('pm10Info', {
                    url: '/pm10Info',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/pm10Info.html',
                            controller:'pollutantController',
                            controllerAs:"vm",
                        },
                    }
                })
            $stateProvider
                .state('pm25Info', {
                    url: '/pm25Info',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/pm25Info.html',
                            controller:'pollutantController',
                            controllerAs:"vm",
                        },
                    }
                })
             $stateProvider
                .state('ozoneInfo', {
                    url: '/ozoneInfo',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/ozoneInfo.html',
                            controller:'pollutantController',
                            controllerAs:"vm",
                        },
                    }
                })
            $stateProvider
                .state('aqiInfo', {
                    url: '/aqiInfo',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/aqiInfo.html',
                            controller:'pollutantController',
                            controllerAs:"vm",
                        },
                    }
                })



        })
})();
