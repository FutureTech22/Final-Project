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
                        url: 'http://localhost:8080/blog',
                    })

                },
                getBlog: () => {
                    return $http({
                        method: 'GET',
                        url: 'http://localhost:8080/blog',
                    })
                },
                getBlogData: () => {
                    return $http({
                        method: 'GET',
                        data: data,
                        url: 'http://localhost:8080/blog',

                    })
                },
                getLocation: (city) => {
                    return $http({
                        method: 'GET',
                        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyCTuDSmrBrHXYIeGiDx_wNp7TbB7wL8GH8`,

                    })
                },
                saveLocation: (data) => {
                    return $http({
                        method:'POST',
                        data:data,
                        url: 'http://localhost:8080/addLocation'
                    })
                },
                getUser: (id) => {
                    return $http({
                        method:'POST',
                        data:id,
                        url: 'http://localhost:8080/user'
                    })
                }
            }
        })
})();
