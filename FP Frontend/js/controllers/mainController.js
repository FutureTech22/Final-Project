(function() {
        'use strict';

        angular
            .module('routing')
             .controller('mainController', function(API) {
                const vm = this;


                

                vm.createUser = (valid) => {
                    alert("TSET");
                        if (valid) {
                            let user = vm.user;
                            let newUser = Object.assign({}, user);
                            console.log(newUser);
                            let addNewUser = API.createUser(newUser);
                            addNewUser.then(res => {
                                console.log(res);
                                vm.data = res.data;
                                console.log(vm.user);

                            })
                            vm.user = {};
                        } else {
                            alert('invalid');
                        }
                    }
                      vm.getUserData = function (id) {
                    data.then(res=> {
                        let getNewUser = api.getUser();
                         getNewUser.then(res => { //getting the data back from the api
                            console.log("Heres your data", res);
                            vm.data = res.data 
                        })
                    });
                }
            })
        })();
