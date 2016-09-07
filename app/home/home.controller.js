(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$cookieStore', '$rootScope', '$location', 'FlashService'];
    function HomeController(UserService, $cookieStore, $rootScope, $location, FlashService) {
        var vm = this;

        //vm.getUserById = getUserById;
        //vm.getUsersWithPagination = getUsersWithPagination;
        //vm.deleteUserById = deleteUserById;
        //vm.resetUserPasswordByEmail = resetUserPasswordByEmail;
        //vm.createUser = createUser;
        //vm.updateUser = updateUser;
        //vm.goSimpleQuestion = goSimpleQuestion;
        //vm.generateSimpleQuestionPdf = generateSimpleQuestionPdf;
        //vm.generateComplexQuestionPdf = generateComplexQuestionPdf;
        //vm.admin = false;
        initController();



        function initController() {
            vm.currentUser = $cookieStore.get("globals").currentUser;
            //loadCurrentUser();
        }

        function loadCurrentUser() {
            var u = {};
            u.email = $cookieStore.get("globals").currentUser.email;
            UserService.GetUserByEmail(u).then(function (res) {
                vm.user = res;
            });
        }

        function getUsersWithPagination(take, skip) {
            UserService.GetUsersWithPagination(take, skip).then(function (users) {
                console.log(users);
            });

        }

        function deleteUserById(id) {
            UserService.DeleteUserById(id).then(function (response) {
                if (response.success) {
                    FlashService.Success('Delete user by id successful', true);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function getUserById(id) {
            UserService.GetUserById(id).then(function (user) {
                return user;
            });
        }

        function updateUser(id, user) {
            UserService.UpdateUser(id, user).then(function (response) {
                if (response.success) {
                    FlashService.Success('Update successful', true);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function createUser(user) {
            return UserService.CreateUser(user).then(function (response) {
                if (response.success) {
                    FlashService.Success('Creation successful', true);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function resetUserPasswordByEmail(user) {
            UserService.ResetUserPasswordByEmail(user).then(function (response) {
                if (response.success) {
                    FlashService.Success('Reset password by email successful', true);
                } else {
                    FlashService.Error(response.message);
                }
            });
        }

        function goSimpleQuestion() {
            $location.path('/simpleQuestion');
        }
    }
})();