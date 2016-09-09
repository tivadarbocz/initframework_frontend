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
        vm.columnDefs = [
            {
                field: 'userId'
            },
            {
                field: 'userName'
            },
            {
                field: 'password'
            },
            {
                field: 'email'
            },
            {
                field: 'firstName'
            },
            {
                field: 'lastName'
            },
            {
                field: 'role'
            },
            {
                field: 'disabled'
            },
            {
                field: 'createdOn'
            },
            {
                field: 'createdBy'
            },
            {   field: 'Active',
                cellTemplate:'<div><p>béla</p></div>'
            }
        ];
        vm.gridOptions = {
            data: vm.users,
            columnDefs: vm.columnDefs
        }

        /*vm.myGrid = {
            enableSorting: true,
            columnDefs: [
                { field: 'active', enableColumnMenu: false, cellTemplate:'<button ng-click="grid.appScope.clickHandler()">Click Here</button>'
                }
                { field: 'gender', enableHiding: false, suppressRemoveSort: true, sort: { direction: uiGridConstants.ASC } },
                {
                    field: 'company',
                    menuItems: [
                        {
                            title: 'Outer Scope Alert',
                            icon: 'ui-grid-icon-info-circled',
                            action: function($event) {
                                this.context.blargh(); // $scope.blargh() would work too, this is just an example
                            },
                            context: $scope
                        },
                        {
                            title: 'Grid ID',
                            action: function() {
                                alert('Grid ID: ' + this.grid.id);
                            }
                        },
                        {
                            title: 'Column Title Alert',
                            shown: function () {
                                return this.context.col.displayName === 'Company';
                            },
                            action: function() {
                                alert(this.context.col.displayName);
                            }
                        }
                    ]
                }
            ]
        };*/


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
                vm.gridOptions.data = res;
                console.log(res);
            });
        }


    }
})();
