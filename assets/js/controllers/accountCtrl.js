'use strict';

app.controller('accountCtrl', ['$scope', '$http', '$window', '$settings', 'Account',
    function accountCtrl($scope, $http, $window, $settings, Account) {

        Account.get(null, function(data) {
            $scope.account = data.response;
        }, function(data) {
            $scope.notification = {
                show: true,
                isArray: true,
                type: 'error',
                message: data.data.errors
            };
        });

        $scope.submit = function(isValid) {
            if (isValid) {
                $scope.loadingAccount = true;
                if ($scope.account.password !== $scope.account.confirmpassword) {
                    $scope.notification = {
                        show: true,
                        isArray: false,
                        type: 'warning',
                        message: 'These passwords don\'t match.'
                    };
                    $scope.account.password = '';
                    $scope.account.confirmpassword = '';
                } else {
                    if ($scope.account.password === '') {
                        delete $scope.account.password;
                    }
                    Account.update(null, $scope.account, function(data) {
                        $scope.notification = {
                            show: true,
                            isArray: false,
                            type: 'success',
                            message: data.response.msg
                        };
                        $scope.loadingAccount = false;
                        $scope.accountForm.$setPristine();
                        $scope.account.currentpassword = '';
                        $scope.account.password = '';
                        $scope.account.confirmpassword = '';
                    }, function(data) {
                        $scope.notification = {
                            show: true,
                            isArray: true,
                            type: 'error',
                            message: data.data.errors
                        };
                        $scope.loadingAccount = false;
                        $scope.accountForm.$setPristine();
                        $scope.account.currentpassword = '';
                        $scope.account.password = '';
                        $scope.account.confirmpassword = '';
                    });
                }
            }
        };

        $scope.delete = function(isValid) {
            if (isValid) {

                $scope.loadingAccountDelete = true;

                var accountInfo = {
                    email: $scope.account.email,
                    username: $scope.account.username,
                    password: $scope.accountDelete.currentpassword
                };

                $http.post($settings.apiUri + '/check?type=password', accountInfo)
                    .success(function(data, status) {

                        Account.delete(null, function(data) {
                            $scope.notification = {
                                show: true,
                                isArray: false,
                                type: 'success',
                                message: data.response.msg
                            };
                            $scope.loadingAccountDelete = false;
                            $scope.accountDeleteForm.$setPristine();
                            $scope.accountDelete.currentpassword = '';
                            $window.location = '/logout';
                        }, function(data) {
                            $scope.notification = {
                                show: true,
                                isArray: true,
                                type: 'error',
                                message: data.data.errors
                            };
                            $scope.loadingAccountDelete = false;
                            $scope.accountDeleteForm.$setPristine();
                            $scope.accountDelete.currentpassword = '';
                        });
                    })
                    .error(function(data, status) {
                        $scope.notification = {
                            show: true,
                            isArray: false,
                            type: 'error',
                            message: 'The current password is incorrect. Try again.'
                        };
                        $scope.loadingAccountDelete = false;
                        $scope.accountDeleteForm.$setPristine();
                        $scope.accountDelete.currentpassword = '';
                    });
            }
        };
    }
]);
