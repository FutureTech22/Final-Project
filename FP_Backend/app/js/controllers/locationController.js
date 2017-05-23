(function() {
    'use strict';

    angular
        .module('routing')
        .controller('locationController', function(API, $state, $auth) {
            const vm = this;

            if (!$auth.isAuthenticated()) {
                $state.go('locations')
            } else {
                let user = $auth.getPayload();

            }
            let user = $auth.getPayload();


            vm.setLocation = (location) => {
                 let pollutionData = API.getData({city:location});

                 $('img.myLocationsDisplay').addClass('animated shake');

                     pollutionData.then(res => {

                        vm.city = res.data.location.locationInfo;

                         vm.data = res.data.data;
                         console.log(vm.data);
                     })
                }


            let getNewUser = API.getUser({ user: user.sub });
            getNewUser.then(res => {
                console.log("Heres your user data", res);
                vm.locations = res.data.locations;
            })


              //delete the user by id
            vm.delete = function(id) {
                    let removeData = API.deleteData(id);
                    removeData.then(response =>{
                        vm.data = response.data;
                    })
                }


        })
    })();
