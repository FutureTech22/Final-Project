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
                createBlog: (data) => {
                    return $http({
                        method: 'POST',
                        data: data,
                        url: 'http://localhost:3000/blog',
                    })

                },
                getBlog: () => {
                    return $http({
                        method: 'GET',
                        url: 'http://localhost:3000/blog',
                    })
                },
                getBlogData: () => {
                    return $http({
                        method: 'GET',
                        data: data,
                        url: 'http://localhost:3000/blog',

                    })
                },
                getLocation: (city) => {
                    return $http({
                        method: 'GET',
                        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCTuDSmrBrHXYIeGiDx_wNp7TbB7wL8GH8`,

                    })
                },
            }
        })
})();
