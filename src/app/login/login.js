
/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('login', function () {})

    .controller('LoginCtrl', ['$scope', '$location',
        function($scope, $location) {
        $scope.hello = "login"




        $scope.login = function () {
            //if auth
                //GET data
                    //set path
            $location.path('/landing');
        }
    }])