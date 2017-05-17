(function() {
    'use strict';

    angular
        .module('routing')
        .controller('locationController', function(API, $state, $auth) {
            const vm = this;

            if(!$auth.isAuthenticated()){
                state.go('home')
            }
            else
            {
                let user = $auth.getPayload();
                alert(user.sub);
            }
            let user = $auth.getPayload();


            vm.saveLocation = (valid) => {
                alert("TSET");
                if (valid) {
                    let location = vm.location;
                    let newLocation = Object.assign({}, location);
                    console.log(newLocation);
                    let addNewLocation = API.createBlog(newLocation);
                    addNewLocation.then(res => {
                        console.log(res);
                        vm.data = res.data;
                        console.log(vm.location);

                    })
                    vm.blog = {};
                } else {
                    alert('invalid');
                }
            }


            let getNewUser = API.getUser({user:user.sub});
            getNewUser.then(res => {
                console.log("Heres your user data", res);
                vm.locations = res.data.locations;
            })

        })
})();
