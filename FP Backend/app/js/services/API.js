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
                        url: 'http://localhost:3000/user',
                    })

                },
                getUser: () => {
                    return $http({
                        method: 'GET',
                        url: 'http://localhost:3000/user',
                    })
                },
                getUserData: () => {
                    return $http({
                        method: 'GET',
                        data: data,
                        url: 'http://localhost:3000/user',

                    })
                },
                getLocation: (city) => {
                    return $http({
                        method: 'GET',
                        data: city,
                        headers : {
                                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                            },
                        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCTuDSmrBrHXYIeGiDx_wNp7TbB7wL8GH8`,

                    })
                },
            }
        })
})();
