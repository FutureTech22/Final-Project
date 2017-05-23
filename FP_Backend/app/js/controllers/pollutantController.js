 (function() {
     'use strict';

     angular
         .module('routing')
         .controller('pollutantController', function(API, $state, $auth) {
             const vm = this

             vm.setLocation = function() {

                let pollutionData = API.getData({city:vm.location});

                     pollutionData.then(res => {

                        vm.city = res.data.location.locationInfo;

                        console.log(vm.city);

                        var uluru = {
                            lat: vm.city.city[0].geometry.location.lat,
                            lng: vm.city.city[0].geometry.location.lng
                         };

                         var map = new google.maps.Map(document.getElementById('map'), {
                             zoom: 4,
                             center: uluru
                         });
                         var marker = new google.maps.Marker({
                             position: uluru,
                             map: map
                         });

                         vm.data = res.data.data;
                         console.log(vm.data);
                     })

             };



             vm.saveLocation = function() {
                let user = $auth.getPayload();
                 let obj = {
                     location: vm.location,
                     id: user.sub,
                 }
                 let addNewLocation = API.saveLocation(obj);
                 addNewLocation.then(res => {
                     console.log(res);
                     vm.data = res.data;
                     console.log(vm.location);

                 })
                 vm.blog = {};

             }

         })
 })();
