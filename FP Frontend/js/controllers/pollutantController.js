(function() {
'use strict';

angular
    .module('routing')
    .controller('pollutantController', function(API) {
            const vm = this

            localStorage.setItem('lat', 39.1031);
            localStorage.setItem('long', -84.5120);


            vm.lat = localStorage.getItem('lat');
            vm.long = localStorage.getItem('long');
            console.log(vm.lat, vm.long);

            let pollutionData = API.getData(vm.lat,vm.long);

            pollutionData.then(res => {
                vm.data = res.data;
                console.log(vm.data);
            })

        })
})();
