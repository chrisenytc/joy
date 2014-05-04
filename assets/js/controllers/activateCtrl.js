'use strict';

app.controller('activateCtrl', ['$scope', '$http', '$location', '$routeParams', '$settings',
    function activateCtrl($scope, $http, $location, $routeParams, $settings) {

        $scope.isToken = function() {
            if ($location.search().token && $location.search().token.length > 1) {
                return true;
            } else {
                return false;
            }
        };

        if ($location.search().token && $location.search().token.length > 1) {

            $scope.loadingPage = true;

            $http.post($settings.apiUri + '/signup/activate', {
                token: $location.search().token
            })
                .success(function(data, status) {
                    if (status == 200) {
                        $scope.notification = {
                            show: true,
                            isArray: false,
                            type: 'success',
                            message: data.response.msg
                        };
                        $scope.loadingPage = false;
                    }
                })
                .error(function(data, status) {
                    $scope.notification = {
                        show: true,
                        isArray: true,
                        type: 'error',
                        message: data.errors
                    };
                    $scope.loadingPage = false;
                });
        }

        $scope.submit = function(isValid) {
            if (isValid) {

                $scope.loading = true;

                $http.post($settings.apiUri + '/signup/activate', {
                    token: $scope.token
                })
                    .success(function(data, status) {
                        if (status == 200) {
                            $scope.notification = {
                                show: true,
                                isArray: false,
                                type: 'success',
                                message: data.response.msg
                            };
                            $scope.loading = false;
                            $scope.activateForm.$setPristine();
                            $scope.token = '';
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
