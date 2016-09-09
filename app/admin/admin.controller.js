/**
 * Created by Tivadar Bocz on 2016.09.09..
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['UserService', '$cookieStore', '$rootScope', '$location', 'FlashService'];
    function AdminController(UserService, $cookieStore, $rootScope, $location, FlashService) {
        var vm = this;

        initController();

        function initController() {
            vm.currentUser = $cookieStore.get("globals").currentUser;
            loadCurrentUser()
            getAllUser();
        }
        function loadCurrentUser() {
            var u = $cookieStore.get("globals").currentUser.email;
            UserService.getUserByUserName(u).then(function (res) {
                vm.user = res;

            });
        }


        function getAllUser(){
            vm.users = UserService.getAllUser().then(function (res) {
                vm.users = res;
                console.log(res);
            });
        }

    }
})();
