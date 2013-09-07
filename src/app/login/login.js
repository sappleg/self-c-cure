
/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('login', function () {})
    .controller('LoginCtrl', ['$scope', '$location', '$http', 'userData', 'endpoint'
        function($scope, $location, $http, userData, endpoint) {
        $scope.swag = {
            createAccTxt: "Create Account",
            createAccBtn: "default"
        };
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.meta = {
            confirmPass: '',
            error:''
        };

        $scope.login = function () {
            console.log('here');
            killError();

            var path = endpoint + '/auth/login/',
                body = JSON.stringify({
                    "email": $scope.user.email,
                    "pass": $scope.user.pass
                });
            $http.post(path, body).then(function(response) {
                if(response.status == '200' && response.data.message != "Validation failed") {
                    $scope.user.email = '';
                    $scope.user.pass = '';
                    //GET devices
                    var start = endpoint + '/user/';
                    var id = response.data.id;
                    var path = start.concat(id);


                    $http.get(path).then(function (response) {
                        userData.setUserData(response.data);
                        $location.path('/landing');
                    }, function (response) {
                        console.log(response);
                    })
                }
                else {
                    $scope.meta.error = "Shit something went wrong, please try again."
                }

            }, function(response) {
                $scope.meta.error = "Shit something went wrong, please try again."
            });
        };

        $scope.createAccountFields = function () {
            killError();

            $scope.createAccount = !$scope.createAccount;

            if($scope.swag.createAccTxt == "Create Account") {
                $scope.swag.createAccTxt = "Cancel";
                $scope.swag.createAccBtn = "danger";
            }
            else {
                killUser();
                $scope.swag.createAccTxt = "Create Account";
                $scope.swag.createAccBtn = "default";
            }
        }

        $scope.createAcc = function () {
            killError();

            if($scope.user.pass == $scope.meta.confirmPass && $scope.user.pass.length > 6) {

                var path = endpoint + '/auth/signup/',
                    body = JSON.stringify({
                        "email": $scope.user.email,
                        "pass": $scope.user.pass
                    });
                $http.post(path, body).then(function(response) {
                    console.log(response);

                    if(response.status == '201') {
                        $location.path('/landing');
                    }
                    else {
                        $scope.meta.error = "Shit something went wrong, please try again."
                    }
                }, function(response) {
                    console.log(response);
                });
            }
            else if ($scope.user.pass.length > 6) {
                $scope.meta.error = "Your password must be at least 6 characters."
            }

            else {
                $scope.meta.error = "Your password and confirm password do not match.";
            }
        };

        //add CSS
        var killError = function () {
            $scope.meta.error = '';
        }

        var killUser = function () {
            $scope.user.email = '';
            $scope.user.pass = '';
            $scope.meta.confirmPassword = '';
        }
    }]);
