/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 2:37 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('app', ['login', 'landing', 'device'
    ])

    .config(['$routeProvider', '$httpProvider', function($routeProvider) {
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
    }])



    .value('version', '0.0.1')
    .value('_api', 'http://localhost:8142/');
