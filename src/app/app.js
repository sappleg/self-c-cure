/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 2:37 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

var app = angular.module('app', ['login', 'landing', 'device']);

app.factory('Authentication', ['$location', '$q', function($location, $q) {
    return function (promise) {
        console.log('called', promise);
        return promise.then(
            function(response) {
                return response;
            },
            function(response) {
                if (response.status === 401) {
                    $location.path('/');
                }
                return response;
            }
        )
    };
}])

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            controller: 'LoginCtrl',
            templateUrl: '/app/login/view/login.html'
        }).when('/landing', {
            controller: 'LandingCtrl',
            templateUrl: '/app/landing/view/landing.html'
        }).when('/device', {
            controller: 'DeviceCtrl',
            templateUrl: '/app/device/view/device.html'
        });
        $routeProvider.otherwise({redirectTo: '/'});
        $httpProvider.responseInterceptors.push('Authentication');
    }])
    //.value('endpoint', 'http://localhost:8142/');
    .value('endpoint', 'http://self-c-cure.thotpod.com');

