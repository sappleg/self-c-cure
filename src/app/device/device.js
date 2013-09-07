/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 10:03 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('device', function () {})

    .controller('DeviceCtrl', ['$scope', '$http', '$location', 'deviceData',
        function($scope, $http, $location, deviceData) {

            $scope.meta = {
                editName: false,
                lower: '',
                upper: ''
            };

            $scope.device = deviceData.device;
            console.log($scope.device)








            $scope.activateDevice = function () {
                $scope.device.armed = true;

                var start = 'http://localhost:8142/user/',
                    userID = $scope.device.userId,
                    device = '/devices/',
                    deviceID = $scope.device._id;
                var path = start.concat(userID).concat(device).concat(deviceID);
                var body = $scope.device;


                $http.put(path, body).then(function(response) {
                    console.log(response);
                    console.log('alpha as fuck!!');
                }, function(response) {
                    console.log(response);
                });
            };

            $scope.deactivateDevice = function () {
                $scope.device.armed = false;

                var start = 'http://localhost:8142/user/',
                    userID = $scope.device.userId,
                    device = '/devices/',
                    deviceID = $scope.device._id;
                var path = start.concat(userID).concat(device).concat(deviceID);
                var body = $scope.device;


                $http.put(path, body).then(function(response) {
                    console.log(response);
                    console.log('alpha as fuck!!');
                }, function(response) {
                    console.log(response);
                });
            };


            $scope.updateDevice = function () {


            };

            $scope.createDevice = function () {


            };

            $scope.back = function () {
                deviceData.device = {};
                $location.path('/landing')
            };

        }])
    .factory('deviceData', [
        function () {

            this.device = {};

            this.device.setDevice = function (d) {
                this.device = d;
            };
            return this.device;
        }]);