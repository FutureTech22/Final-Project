(function() {
    'use strict';

    angular.module('routing')
        .controller('loginController', function(API,$auth,$state) {

            const vm = this;

                if($auth.isAuthenticated()){
                $state.go('userLogin')
             }else{
                    $state.go('home')
             }
            

            vm.authenticate = function(provider) {
                $auth.authenticate(provider);
            };



        });
})();

