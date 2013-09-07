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

    .controller('DeviceCtrl', ['$scope', 'deviceData',
        function($scope, deviceData) {
            $scope.device = deviceData.device;
            console.log($scope.device);

            $scope.confDevice = {

            }
        }])
    .factory('deviceData', [
        function () {

            this.device = {};

            this.device.setDevice = function (d) {
                this.device = d;
            };
            return this.device;
        }]);