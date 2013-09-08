/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('landing', function () {})
    .controller('LandingCtrl', ['$scope', '$location', '$http', '$routeParams', 'dummyData', 'userData', 'deviceData', 'endpoint',
        function($scope, $location, $http, $routeParams, dummyData, userData, deviceData, endpoint) {
            function loadUserData() {
                var start = endpoint + '/user/';
                var id = $routeParams.userId;
                var path = start.concat(id);

                $http.get(path).then(function (response) {
                    userData.setUserData(response.data)
                }, function (response) {
                    console.log(response);
                })
            }

            $scope.userData = userData;

            $scope.meta = {
                id: '',
                name: '',
                error:''
            };

            $scope.logout = function () {
                $http.post(endpoint + '/auth/logout/')
                .success(
                    function() {
                        userData.clear();
                        $location.path('/');
                    }
                )
            };

            $scope.jumpDevice = function () {
                if($scope.meta.id.length == 24 && $scope.meta.name.length > 0) {

                    //prep json for jump
                    var device = {
                        name: $scope.meta.name,
                        userId: userData.user._id,
                        deviceId: $scope.meta.id,
                        limit: null,
                        ranges: [],
                        armed: false
                    };

                    console.log(device);
                    $http.post(endpoint + '/user/' + device.userId + '/devices/', device).then(function() {
                        $http.get(endpoint + '/user/' + device.userId).then(function(data) {
                            userData.setUserData(data.data);
                        });
                    });
                    deviceData.setDeviceData(device);
                }
                else if($scope.meta.name = '') {
                    $scope.meta.error = 'Give your device a name';
                }
                else if($scope.meta.id.length != 24 ) {
                    $scope.meta.error = 'Invalid ID length';
                }
            };

            $scope.goToDevice = function ($index) {
                console.log($scope.userData.devices[$index]);
                deviceData.setDeviceData($scope.userData.devices[$index]);
                $location.path('/user/' + $scope.userData.user._id + '/devices/' + $scope.userData.devices[$index].deviceId);
            };

            $scope.activateDevice = function ($index) {
                $scope.userData.devices[$index].armed = true;

                var start = endpoint + '/user/',
                    userID = $scope.userData.user._id,
                    device = '/devices/',
                    deviceID = $scope.userData.devices[$index].deviceId;
                var path = start.concat(userID).concat(device).concat(deviceID);
                var body = cleanData($scope.userData.devices[$index]);


                $http.put(path, body).then(function(response) {
                    console.log(response);
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

            $scope.deactivateDevice = function ($index) {
                $scope.userData.devices[$index].armed = false;

                var start = endpoint + '/user/',
                    userID = $scope.userData.user._id,
                    device = '/devices/',
                    deviceID = $scope.userData.devices[$index].deviceId;
                var path = start.concat(userID).concat(device).concat(deviceID);
                var body = cleanData($scope.userData.devices[$index]);


                $http.put(path, body).then(function(response) {
                    console.log(response);
                    console.log('alpha as fuck!!');

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

            var cleanData = function (dirtyD) {
                var copy = {};
                copy = angular.copy(dirtyD, copy);
                delete copy['$$hashKey'];
                delete copy['_id'];
                return copy;
            }

            loadUserData();
    }])
    .service('dummyData', [
        function () {

            var name = ['garage','Guest House','Fridge','Oven','Baby room','Porch Window','A Window'];


            this.genDummyData = function (numDevices) {
                var devices = new Array();

                for(var i=0; i<numDevices; i++) {
                    var aName = name[Math.floor(Math.random()*name.length)];
                    var type = "idk";
                    var aGuid = guid();
                    var limit = Math.floor(Math.random()*10); //idk what limit is
                    var sTime = new Date().getTime();
                    var eTime = new Date().getTime();
                    var armed = false;

                    devices.push(
                        {
                            name: aName,
                            type: type,
                            user_id: aGuid,
                            rules: {
                                limit: limit,
                                ranges: [
                                    {
                                        start: sTime,
                                        eTime: eTime
                                    }
                                ]
                            },
                            armed: armed
                        }
                    )
                }
                return devices;
            }
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            function guid() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }

        }])
    .service('userData', [
        function () {
            this.setUserData = function (u) {
                this.user = u.user[0];
                this.devices = u.devices;
            };
            this.clear = function() {
                this.user = {};
                this.devices = {};
            }

            return this;
        }]);
