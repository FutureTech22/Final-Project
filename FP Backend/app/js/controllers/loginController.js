(function() {
    'use strict';

    angular.module('routing')
        .controller('loginController', function(API,$auth,$state) {

            const vm = this;

     
            

            vm.authenticate = function(provider) {
                $auth.authenticate(provider);
            };



        });
})();

