(function() {
    'use strict';

    angular.module('routing')
        .controller('loginController', function(API,$auth,$state) {

            const vm = this;

     		if (!$auth.isAuthenticated()) {
                state.go('home')
            } else {
                let user = $auth.getPayload();

            }
            let user = $auth.getPayload();
            

            vm.authenticate = function(provider) {
                $auth.authenticate(provider);
            };

            let getNewUser = API.getUser();
                getNewUser.then(res => { 
                    console.log("Heres your data", res);
            	        vm.data = res.data 
                        })


        });
})();

