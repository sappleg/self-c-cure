/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 2:37 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('app', [
    ])

    .config(['$routeProvider', '$httpProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainCtrl'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .controller('MainCtrl', ['$scope', function($scope) {

    }])

    .value('version', '0.0.1')
    .value('_api', 'http://localhost:8142/');
