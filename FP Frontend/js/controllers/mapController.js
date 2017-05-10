(function() {
        'use strict';

        angular
            .module('routing')
            .controller('mapController', function(API) {
                    const vm = this

                    vm.setLocation = function() {
                        let locationData = API.getLocation(vm.location);

                        locationData.then(res => {
                            vm.city = res.data.results;

                            console.log("CITY", vm.city['0']);

                            var uluru = {
                                lat: vm.city['0'].geometry.location.lat,
                                lng: vm.city['0'].geometry.location.lng
                            };

                            var map = new google.maps.Map(document.getElementById('map'), {
                                zoom: 4,
                                center: uluru
                            });
                            var marker = new google.maps.Marker({
                                position: uluru,
                                map: map
                            });
                        })
                    }
                })
        })();
