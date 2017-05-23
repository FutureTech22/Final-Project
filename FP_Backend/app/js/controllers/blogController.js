(function() {
        'use strict';

        angular
            .module('routing')
            .controller('blogController', function(API,$state,$auth) {
                const vm = this;



                

                vm.createBlog = (valid) => {
                    alert("TSET");
                        if (valid) {
                            let blog = vm.blog;
                            let newBlog = Object.assign({}, blog);
                            console.log(newBlog);
                            let addNewBlog = API.createBlog(newBlog);
                            addNewBlog.then(res => {
                                console.log(res);
                                vm.data = res.data;
                                console.log(vm.blog);

                            })
                            vm.blog = {};
                        } else {
                            alert('invalid');
                        }
                    }
                     
                        let getNewBlog = API.getBlog();
                         getNewBlog.then(res => { //getting the data back from the api
                            console.log("Heres your data", res);
                            vm.data = res.data 
                        })
            })
        })();
