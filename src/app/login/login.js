
/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 9/4/13
 * Time: 9:21 PM
 * To change this template use File | Settings | File Templates.
 */


angular.module('login', function () {})

    .controller('LoginCtrl', ['$scope', '$location', '$http',
        function($scope, $location, $http) {
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

        };

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

        var getUser = function () {
            $http.get(path).then(function(data) {
                console.log(data);
            }, function() {

            });
        }
    }]);