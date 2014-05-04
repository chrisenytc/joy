'use strict';

app.controller('signupCtrl', ['$scope', '$http', '$settings',
    function signupCtrl($scope, $http, $settings) {

        var $ = jQuery;
        $scope.user = {};

        $scope.submit = function(isValid) {
            if (isValid) {
                $scope.loading = true;
                var newUser = $scope.user;
                newUser.sckey = $('input[name="sckey"]').val();
                newUser.scvalue = $('input[name="scvalue"]').val();
                $http.post($settings.apiUri + '/signup', newUser)
                    .success(function(data, status) {
                        if (status == 200) {
                            $scope.notification = {
                                show: true,
                                isArray: false,
                                type: 'success',
                                message: data.response.msg
                            };
                            $scope.loading = false;
                            $scope.signupForm.$setPristine();
                            $scope.user = {};
                        }
                    })
                    .error(function(data, status) {
                        $scope.notification = {
                            show: true,
                            isArray: true,
                            type: 'error',
                            message: data.errors
                        };
                        $scope.loading = false;
                    });
            }
        };
    }
]);
