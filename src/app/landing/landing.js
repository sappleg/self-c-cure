/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('landing', function () {})
    .controller('LandingCtrl', ['$scope', '$location', '$http', 'dummyData', 'userData', 'deviceData',
        function($scope, $location, $http, dummyData, userData, deviceData) {
            $scope.user = userData.user.user[0];
            $scope.devices = userData.user.devices;
            console.log($scope.devices);
            console.log(userData);
            //dummyData.genDummyData(20);

            $scope.meta = {
                id: '',
                name: '',
                error:''
            };

            $scope.logout = function () {
                //logout user
                $location.path('/');
            };

            $scope.jumpDevice = function () {
                if($scope.meta.id.length == 24 && $scope.meta.name.length>0) {

                    //prep json for jump
                    var device = {
                        name: $scope.meta.name,
                        userId: $scope.user._id,
                        _id: $scope.meta.id,
                        limit: null,
                        ranges: [{
                            lower: null,
                            upper: null
                        }],
                        armed: false
                    };

                    console.log(device);
                    deviceData.setDevice(device);
                    $location.path('/device');
                }
                else if($scope.meta.name = '') {
                    $scope.meta.error = 'Give your device a name';
                }
                else if($scope.meta.id.length != 24 ) {
                    $scope.meta.error = 'Invalid ID length';
                }
            };

            $scope.goToDevice = function ($index) {
                console.log($scope.devices[$index]);
                deviceData.setDevice($scope.devices[$index]);
                $location.path('/device');
            };

            $scope.activateDevice = function ($index) {
                $scope.devices[$index].armed = true;

                var start = 'http://localhost:8142/user/',
                    userID = $scope.user._id,
                    device = '/devices/',
                    deviceID = $scope.devices[$index]._id;
                var path = start.concat(userID).concat(device).concat(deviceID);
                var body = $scope.devices[$index];


                $http.put(path, body).then(function(response) {
                    console.log(response);
                    console.log('alpha as fuck!!');
                }, function(response) {
                    console.log(response);
                });
            };

            $scope.deactivateDevice = function ($index) {
                $scope.devices[$index].armed = false;

                var start = 'http://localhost:8142/user/',
                    userID = $scope.user._id,
                    device = '/devices/',
                    deviceID = $scope.devices[$index]._id;
                var path = start.concat(userID).concat(device).concat(deviceID);
                var body = $scope.devices[$index];


                $http.put(path, body).then(function(response) {
                    console.log(response);
                    console.log('alpha as fuck!!');
                }, function(response) {
                    console.log(response);
                });
            };
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
    .factory('userData', [
        function () {
            this.user = {};
            this.user.setUser = function (u) {
                this.user = u;
            };
            return this.user;
        }]);