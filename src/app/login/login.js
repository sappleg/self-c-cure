
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
        $scope.swag = {
            createAccTxt: "Create Account",
            createAccBtn: "default"
        };



        $scope.login = function () {
            //if auth
                //GET data
                    //set path
            $location.path('/landing');
        }

        $scope.createAccountFields = function () {
            $scope.createAccount = !$scope.createAccount;

            if($scope.swag.createAccTxt == "Create Account") {
                $scope.swag.createAccTxt = "Cancel";
                $scope.swag.createAccBtn = "danger";
            }
            else {
                $scope.swag.createAccTxt = "Create Account";
                $scope.swag.createAccBtn = "default";
            }
        }

        $scope.createAccount = function () {
            //POST valid .. note check if initPass==confirmPass
                //on success --> $location.path('/landing');
        }
    }]);