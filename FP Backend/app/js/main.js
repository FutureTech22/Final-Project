(function() {
    'use strict';

    angular
        .module('routing', ['ui.router','satellizer'])
        .config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

            $authProvider.facebook({
                name: 'facebook',
                clientId:'161936414338896',
                url: '/auth/facebook',
                authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                redirectUri: window.location.origin + '/',
                requiredUrlParams: ['display', 'scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 580, height: 400 }
            });
            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        'content': {
                            templateUrl: '../partials/home.html',
                           

                        },
                    }
                })
            $stateProvider
                .state('searchCity', {
                    url: '/searchCity',
                    views: {
                        'content': {
                            templateUrl: '../partials/searchCity.html',
                            controller: 'pollutantController',
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
                            controller: 'blogController',
                            controllerAs: "vm",

                        },
                    }
                })
            $stateProvider
                .state('locations', {
                    url: '/locations',
                    views: {
                        'content': {
                            templateUrl: '../partials/locations.html',
                            controller: 'locationController',
                            controllerAs: "vm",
                        },
                    }
                })
            $stateProvider
                .state('userLogin', {
                    url: '/userLogin',
                    views: {
                        'content': {
                            templateUrl: '../partials/userLogin.html',
                            controller: 'loginController',
                            controllerAs: "vm",
                        },
                    }
                })
            $stateProvider
                .state('coInfo', {
                    url: '/coInfo',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/coInfo.html',
                            controller: 'pollutantController',
                            controllerAs: "vm",
                        },
                    }
                })
            $stateProvider
                .state('no2Info', {
                    url: '/no2Info',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/no2Info.html',
                            controller: 'pollutantController',
                            controllerAs: "vm",
                        },
                    }
                })
            $stateProvider
                .state('pm10Info', {
                    url: '/pm10Info',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/pm10Info.html',
                            controller: 'pollutantController',
                            controllerAs: "vm",
                        },
                    }
                })
            $stateProvider
                .state('pm25Info', {
                    url: '/pm25Info',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/pm25Info.html',
                            controller: 'pollutantController',
                            controllerAs: "vm",
                        },
                    }
                })
            $stateProvider
                .state('ozoneInfo', {
                    url: '/ozoneInfo',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/ozoneInfo.html',
                            controller: 'pollutantController',
                            controllerAs: "vm",
                        },
                    }
                })
            $stateProvider
                .state('aqiInfo', {
                    url: '/aqiInfo',
                    views: {
                        'content': {
                            templateUrl: '../partials/pollutants/aqiInfo.html',
                            controller: 'pollutantController',
                            controllerAs: "vm",
                        },
                    }
                })



        })
})();
