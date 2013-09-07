
/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('login', function () {})
    .controller('LoginCtrl', ['$scope', '$location', '$http', 'userData',
        function($scope, $location, $http, userData) {
        $scope.swag = {
            createAccTxt: "Create Account",
            createAccBtn: "default"
        };
        $scope.user = {
            email: '',
            password: ''
        }

        $scope.login = function () {

            var path = 'http://localhost:8142/user/5229022c02993c2510000001/devices/',
                body =
                    {
                        "name":"Window",
                        "limit":"30",
                        "ranges": [{
                            "upper": "0000",
                            "lower": "0100"
                        }
                        ],
                        "armed":"true"
                    };
            $http.post(path, body).then(function (data) {
                    console.log(data);

                },
                function (response) {
                    console.log(response);
                });






            /*
            var path ='http://localhost:8142/auth/login/',
                body = {
                    "email": $scope.user.email,
                    "pass": $scope.user.password
                };

            console.log(body);
            $http.post(path, body).then(function (data, response) {
                //$location.path('/landing');
                console.log(data);

            },
            function (response) {
                console.log(response);
//                $scope.user.password = "";
            });
            */

            /*
            var id ='5229022c02993c2510000001';
            var path ='http://localhost:8142/user/5229022c02993c2510000001';

            $http.get(path).then(function(data) {
                console.log(data);
            }, function() {

            });
            */

=======
            pass: ''
        };
        $scope.meta = {
            confirmPass: '',
            error:''
        }

        $scope.login = function () {
            killError();

            var path = 'http://localhost:8142/auth/login/',
                body = JSON.stringify({
                    "email": $scope.user.email,
                    "pass": $scope.user.pass
                });
            $http.post(path, body).then(function(response) {
                console.log(response);
                console.log('alpha as fuck');
                if(response.status == '200' && response.data.message != "Validation failed") {
                    $scope.user.email = '';
                    $scope.user.pass = '';
                    //GET devices
                    var start = 'http://localhost:8142/user/';
                    var id = response.data.id;
                    var path = start.concat(id);


                    $http.get(path).then(function (response) {
                        console.log(response);
                        console.log('beta as fuck');
                        userData.setUser(response.data);
                        $location.path('/landing');
                    }, function (response) {
                        console.log(response);
                    })
                }
                else {
                    $scope.meta.error = "Shit something went wrong, please try again."
                }

            }, function(response) {
                console.log(response);
                $scope.meta.error = "Shit something went wrong, please try again."
            });
>>>>>>> Stashed changes
        };

        $scope.createAccountFields = function () {
            killError();

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

        $scope.createAcc = function () {
            killError();

            if($scope.user.pass == $scope.meta.confirmPass && $scope.user.pass.length > 6) {

                var path = 'http://localhost:8142/auth/signup/',
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

        var getUser = function () {
            $http.get(path).then(function(data) {
                console.log(data);
            }, function() {

            });
        }
    }]);
