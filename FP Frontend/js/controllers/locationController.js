(function() {
'use strict';

angular
    .module('routing')
    .controller('locationController', function(API) {
            const vm = this

            vm.setLocation = function(){
	            let locationData = API.getLocation(vm.location);
	            console.log(vm.location);

	            locationData.then(res => {
	                vm.city = res.data.results;

	                vm.city.forEach(function(city){
	                	localStorage.setItem('lat', city.geometry.location.lat);
	                	localStorage.setItem('long', city.geometry.location.lng);
	                })
                
            	})
        	}

            

        })
})();
