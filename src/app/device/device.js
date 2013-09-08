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

    .controller('DeviceCtrl', ['$scope', '$http', '$location', '$routeParams', 'deviceData', 'userData', 'endpoint',
        function($scope, $http, $location, $routeParams, deviceData, userData, endpoint) {
            function loadDeviceData() {
            var start = endpoint + '/user/',
                userId = $routeParams.userId,
                deviceId = $routeParams.deviceId,
                device = '/devices/';
            var path = start.concat(userId).concat(device).concat(deviceId);

                $http.get(path).then(function(response) {
                    console.log(response);
                    deviceData.setDeviceData(response.data);

                    $scope.device = deviceData.device;

                    $scope.$watch('device.limit', function() {
                        $scope.device.limit = $scope.device.limit >= 0 ? $scope.device.limit : 0;
                    })
                }, function(response) {
                    console.log(response);
                });
            }

            $scope.userData = userData;

            $scope.meta = {
                editName: false,
                lower: '',
                upper: ''
            };


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

                var start = endpoint + '/user/',
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

                var start = endpoint + '/user/',
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
                var start = endpoint + '/user/',
                    userID = $scope.device.userId,
                    device = '/devices/',
                    deviceID = $scope.device.deviceId;
                var path = start.concat(userID).concat(device).concat(deviceID);
                var body = cleanData($scope.device);

                console.log(body);
                $http.put(path,body).then(function(response) {
                    console.log(response);
                    console.log('Alpha bra');

                    var path = start.concat(userID);
                    $http.get(path).then(function(response) {
                        userData.setUserData(response.data);
                        $location.path('/landing/' + userID);
                    }, function(response) {

                    });
                }, function(response) {
                    console.log(response);
                });
            };

            $scope.createDevice = function () {
                var start = endpoint + '/user/',
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
                        userData.setUserData(response.data);
                        $location.path('/landing/' + userID);
                    }, function(response) {

                    });

                }, function(response) {
                    console.log(response);
                });
            };

            $scope.deleteDevice = function () {
                var start = endpoint + '/user/',
                    userID = $scope.device.userId,
                    device = '/devices/',
                    deviceID = $scope.device.deviceId;
                var path = start.concat(userID).concat(device).concat(deviceID);
                $http.delete(path).then(function(response) {
                    console.log('shits deleted');
                    console.log(response);

                    var path = start.concat(userID);
                    $http.get(path).then(function(response) {
                        console.log(response);
                        userData.setUserData(response.data);
                        $location.path('/landing/' + userID);
                    }, function(response) {

                    });

                },function (response) {

                });
            }

            $scope.cancel = function () {
                var start = endpoint + '/user/',
                    userID = $scope.device.userId;
                var path = start.concat(userID);
                deviceData.device = {};
                $location.path('/landing/' + userID);
            }

            var cleanData = function (dirtyD) {
                var copy = {};
                copy = angular.copy(dirtyD, copy);
                delete copy['$$hashKey'];
                delete copy['_id'];
                return copy;
            }

            loadDeviceData();
        }])
    .service('deviceData', [
        function () {
            this.setDeviceData = function (d) {
                this.device = d;
            }
        }]);
