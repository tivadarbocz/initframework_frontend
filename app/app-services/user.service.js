(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var vm = this;
        vm.baseUrl = 'http://localhost:8080';
        var service = {};

        service.GetUsersWithPagination = GetUsersWithPagination;
        service.GetUserById = GetUserById;
        service.DeleteUserById = DeleteUserById;
        service.CreateUser = CreateUser;
        service.UpdateUser = UpdateUser;
        service.ResetUserPasswordByEmail = ResetUserPasswordByEmail;
        service.RegisterUser = RegisterUser;
        service.ForgotPassword = ForgotPassword;
        service.GetUserByEmail = GetUserByEmail;
        service.GetUsersByGroupId = GetUsersByGroupId;

        return service;

        function GetUsersWithPagination(take, skip) {
            return $http.get('http://localhost:8080/api/users', {
                params: {
                    take: take,
                    skip: skip
                }
            }).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetUserById(id) {
            return $http.get(vm.baseUrl + '/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function DeleteUserById(id) {
            return $http.delete(vm.baseUrl + '/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function CreateUser(user) {
            return $http.post(vm.baseUrl + '/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function UpdateUser(id, user) {
            return $http.put(vm.baseUrl + '/api/users/' + id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function ResetUserPasswordByEmail(user) {
            return $http.put(vm.baseUrl + '/api/users/reset-password', user).then(handleSuccess, handleError('Error reset user password'));

        }

        function GetUserByEmail(email) {
            return $http.put(vm.baseUrl + '/api/users', email).then(handleSuccess, handleError('Error getting user by email'));
        }

        function ForgotPassword(user) {
            //STATIC TOKEN for public method
            $http.defaults.headers.common['X-AUTH-TOKEN'] = "1b82aecc-50a2-4014-9136-3b840db6b6a0";
            return $http.put(vm.baseUrl + '/api/forgot', user).then(handleSuccess, handleError('Error reset user password'));
        }

        function RegisterUser(user) {
            //STATIC TOKEN for public method
            $http.defaults.headers.common['X-AUTH-TOKEN'] = "1b82aecc-50a2-4014-9136-3b840db6b6a0";
            return $http.put(vm.baseUrl + '/api/register', user).then(handleSuccess, handleError('Error register new user'));
        }

        function GetUsersByGroupId(id){
            return $http.get(vm.baseUrl + '/api/users/group/'+id).then(handleSuccess, handleError('Error getting user by group id'));
        }

        // private functions

        function handleSuccess(res) {
            console.log("succes");
            return res.data;
        }

        function handleError(error) {
            return function () {
                console.log(error);
                return {success: false, message: error};
            };
        }
    }

})();
