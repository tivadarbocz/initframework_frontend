    (function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope','CodeService'];
    function AuthenticationService($http, $cookieStore, $rootScope, CodeService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {
            $http.put('http://localhost:8080/api/login',
                {
                    "authorization": CodeService.Base64.encode(JSON.stringify({
                        email: username,
                        password: password
                    }))
                })
                .success(function (response) {

                    response.success = true;
                    callback(response);
                }).error(function () {
                console.log("Error");
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