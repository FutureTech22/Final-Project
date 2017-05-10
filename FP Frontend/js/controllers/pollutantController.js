 (function() {
'use strict';

angular
    .module('routing')
    .controller('pollutantController', function(API) {
            const vm = this


             vm.setLocation = function(){
                
            let locationData = API.getLocation(vm.location);

            locationData.then(res => {
            vm.city = res.data.results;

                console.log("CITY", vm.city['0']);

                
                let pollutionData = API.getData(vm.city['0'].geometry.location.lat,vm.city['0'].geometry.location.lng);

                pollutionData.then(res => {
                    vm.data = res.data;
                    console.log(vm.data);
                })
                
                })
            }

        })
})();
