/**
 * Created by Tivadar Bocz on 2016.09.09..
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserService', '$cookieStore', '$rootScope', '$location', 'FlashService'];
    function ProfileController(UserService, $cookieStore, $rootScope, $location, FlashService) {
        var vm = this;

        initController();

        function initController() {
            vm.currentUser = $cookieStore.get("globals").currentUser;
            loadCurrentUser()
        }
        function loadCurrentUser() {
            var u = $cookieStore.get("globals").currentUser.email;
            UserService.getUserByUserName(u).then(function (res) {
                vm.user = res;

            });
        }

    }
})();
