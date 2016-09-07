    (function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope'];
    function AuthenticationService($http, $cookieStore, $rootScope) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/user/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data:{authorization: btoa("name:" + username + ",password:" + password)}

            })
                .success(function (response) {
                    response.success = true;
                    callback(response);
                }).error(function () {
                    console.log("Error during authentication");
                });
        }

        function SetCredentials(username, password, token) {
            $rootScope.globals = {
                currentUser: {
                    email: username,
                    authdata: token
                }
            };
            $http.defaults.headers.common['X-AUTH-TOKEN'] = token; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }


        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common['X-AUTH-TOKEN'] = '';
        }
    }
})();