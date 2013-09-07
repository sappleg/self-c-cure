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

    .controller('DeviceCtrl', ['$scope', '$http', '$location', 'deviceData', 'userData',
        function($scope, $http, $location, deviceData, userData) {

            $scope.meta = {
                editName: false,
                lower: '',
                upper: ''
            };

            $scope.device = deviceData.device;
            console.log($scope.device);

            $scope.addRange = function () {
                if($scope.meta.lower.length == 4 && $scope.meta.upper.length == 4) {
                    $scope.device.ranges.push({
                        lower: $scope.meta.lower,
                        upper: $scope.meta.upper
                    });
                    $scope.meta.lower = '';
                    $scope.meta.upper = '';
                }
                else {
                    $scope.error = "Please enter your Start and End times in properly - (XXXX)."
                }
            }

            $scope.removeRange = function($index) {
                $scope.device.ranges.splice($index,1);
            }

            $scope.activateDevice = function () {
                $scope.device.armed = true;

                var start = 'http://localhost:8142/user/',
                    userID = $scope.device.userId,
                    device = '/devices/',
                    deviceID = $scope.device._id;
                var path = start.concat(userID).concat(device).concat(deviceID);
                var body = cleanData($scope.device);


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
                var body = cleanData($scope.device);


                $http.put(path, body).then(function(response) {
                    console.log(response);
                    console.log('alpha as fuck!!');
                }, function(response) {
                    console.log(response);
                });
            };


            $scope.updateDevice = function () {
                var start = 'http://localhost:8142/user/',
                    userID = $scope.device.userId,
                    device = '/devices/',
                    deviceID = $scope.device._id;
                var path = start.concat(userID).concat(device).concat(deviceID);
                var body = cleanData($scope.device);

                console.log(body);
                $http.put(path,body).then(function(response) {
                    console.log(response);
                    console.log('Alpha bra');

                    var path = start.concat(userID);
                    $http.get(path).then(function(response) {
                        userData.setUser(response.data);
                        $location.path('/landing');
                    }, function(response) {

                    });
                }, function(response) {
                    console.log(response);
                });
            };

            $scope.createDevice = function () {
                var start = 'http://localhost:8142/user/',
                    userID = $scope.device.userId,
                    device = '/devices/';
                var path = start.concat(userID).concat(device);
                var body = $scope.device;

                console.log(body);
                $http.post(path,body).then(function(response) {
                    console.log(response);
                    console.log('Alpha bra');

                    var path = start.concat(userID);
                    $http.get(path).then(function(response) {
                        userData.setUser(response.data);
                        $location.path('/landing');
                    }, function(response) {

                    });

                }, function(response) {
                    console.log(response);
                });
            };

            $scope.deleteDevice = function () {
                var start = 'http://localhost:8142/user/',
                    userID = $scope.device.userId,
                    device = '/devices/',
                    deviceID = $scope.device._id;
                var path = start.concat(userID).concat(device).concat(deviceID);
                $http.delete(path).then(function(response) {
                    console.log('shits deleted');
                    console.log(response);

                    var path = start.concat(userID);
                    $http.get(path).then(function(response) {
                        console.log(response);
                        userData.setUser(response.data);
                        $location.path('/landing');
                    }, function(response) {

                    });

                },function (response) {

                });
            }

            $scope.back = function () {
                var start = 'http://localhost:8142/user/',
                    userID = $scope.device.userId;
                var path = start.concat(userID);
                $http.get(path).then(function(response) {
                    userData.setUser(response.data);
                    $location.path('/landing');
                }, function(response) {

                });
                deviceData.device = {};
                $location.path('/landing')
            };

            $scope.cancel = function () {
                var start = 'http://localhost:8142/user/',
                    userID = $scope.device.userId;
                var path = start.concat(userID);
                $http.get(path).then(function(response) {
                    userData.setUser(response.data);
                    $location.path('/landing');
                }, function(response) {

                });
                deviceData.device = {};
                $location.path('/landing');
            }

            var cleanData = function (dirtyD) {
                var copy = {};
                copy = angular.copy(dirtyD, copy);
                delete copy['$$hashKey'];
                delete copy['_id'];
                return copy;
            }

        }])
    .service('deviceData', [
        function () {
            this.setDeviceData = function (d) {

            }
        }]);