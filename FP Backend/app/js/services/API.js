(function() {
    'use strict';

    angular
        .module('routing')
        .factory('API', function($http) {
            const vm = this

            return {

                getData: (data) => {
 
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
                },
                deleteData: (id) => {
                    return $http({
                        method: 'DELETE',
                        data:id,
                        url: `http://localhost:8080/addLocation/${id}`,

                    })
                },

            }
        })
})();
