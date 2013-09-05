/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('landing', function () {})

    .controller('LandingCtrl', ['$scope', '$location', 'dummyData',
        function($scope, $location, dummyData) {
            $scope.user = {
                email: "hunter@gmail.com",
                id: ""
            }
            $scope.devices = dummyData.genDummyData(20);

            $scope.logout = function () {
                //logout user
                $location.path('/');
            }

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

        }]);