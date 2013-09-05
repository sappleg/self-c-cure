/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('landing', function () {})

    .controller('LandingCtrl', ['$scope', function($scope) {
        $scope.user = {
            email: "hunter@gmail.com",
            id: ""
        }



    }])