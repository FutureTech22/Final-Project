(function() {
    'use strict';

    angular
        .module('routing')
        .factory('API', function($http) {
            const vm = this

            return {

                getData: (lat, long) => {
                    let data = {
                        lat: lat,
                        long: long
                    }
                    return $http({
                        method: 'POST',
                        data: data,
                        url: 'https://airpollserver.herokuapp.com/breezometer'
                    })
                },
                createUser: (user) => {
                    return $http({
                        method: 'POST',
                        data: user,
                        url: 'http://localhost:8080/user',
                    })

                },
                getUser: () => {
                    return $http({
                        method: 'GET',
                        url: 'http://localhost:8080/user',
                    })
                },
                getUserData: () => {
                    return $http({
                        method: 'GET',
                        data: data,
                        url: 'http://localhost:8080/user',

                    })
                },
                getLocation: (city) => {
                    return $http({
                        method: 'GET',
                        data: city,
                        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCbXl9j-Qy2dZNe2-a3lm2E80Aj7VdUGX8`,

                    })
                },
            }
        })
})();
