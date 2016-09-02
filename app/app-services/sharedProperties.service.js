/**
 * Created by Tivadar Bocz on 2016.02.29..
 */

(function () {
    'use strict';

    angular
        .module('app')
        .factory('SharedPropertiesService', SharedPropertiesService);

    function SharedPropertiesService() {
        var vm = this;

        var property = 'First';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function (value) {
                property = value;
            }
        };
    }
})();
