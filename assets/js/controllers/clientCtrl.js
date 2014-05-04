'use strict';

app.controller('clientCtrl', ['$scope', '$window', '$location', '$routeParams', '$utils', '$settings', 'Client',
    function clientCtrl($scope, $window, $location, $routeParams, $utils, $settings, Client) {

        $scope.find = function() {
            Client.get({id: $routeParams.id}, function(data) {
                $scope.client = data.response;
                $scope.loadingClient = false;
            }, function(data) {
                $scope.notification = {
                    show: true,
                    isArray: true,
                    type: 'error',
                    message: data.data.errors
                };
                $scope.loadingClient = false;
                $scope.showClient = false;
            });
        };

        $scope.submit = function(isValid) {
            if (isValid) {
                $scope.loadingClient = true;
                var newClient = new Client();
                newClient.name = $scope.client.name;
                newClient.redirectURI = $scope.client.redirectURI;
                newClient.$save(function(data) {
                    $scope.loadingClient = false;
                    $scope.notification = {
                        show: true,
                        isArray: false,
                        type: 'success',
                        message: data.response.msg
                    };
                    $scope.createClientForm.$setPristine();
                    $scope.client.name = '';
                    $scope.client.redirectURI = '';
                }, function(data) {
                    $scope.notification = {
                        show: true,
                        isArray: true,
                        type: 'error',
                        message: data.data.errors
                    };
                    $scope.loadingClient = false;
                    $scope.showClient = false;
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                $scope.loadingClient = true;
                Client.update({
                    id: $scope.client.id
                }, $scope.client, function(data) {
                    $scope.loadingClient = false;
                    $scope.notification = {
                        show: true,
                        isArray: false,
                        type: 'success',
                        message: data.response.msg
                    };
                }, function(data) {
                    $scope.notification = {
                        show: true,
                        isArray: true,
                        type: 'error',
                        message: data.data.errors
                    };
                    $scope.loadingClient = false;
                    $scope.showClient = false;
                });
            }
        };

        $scope.delete = function(client) {
            $scope.loadingClient = true;
            Client.delete({
                id: client.id
            }, function(data) {
                $scope.loadingClient = false;
                $scope.notification = {
                    show: true,
                    isArray: false,
                    type: 'success',
                    message: data.response.msg
                };
                $window.location = '/apps';
            }, function(data) {
                $scope.notification = {
                    show: true,
                    isArray: true,
                    type: 'error',
                    message: data.data.errors
                };
                $scope.loadingClient = false;
                $scope.showClient = false;
            });
        };

        $scope.refresh = function() {
            $scope.loadingClient = true;
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            Client.get(null, function(data) {
                $scope.clientsList = data.response;
                $scope.loadingClient = false;
                if ($scope.clientsList.length) {
                    $scope.showClient = true;
                }
                return $scope.numberOfPages = function() {
                    return Math.ceil($scope.clientsList.length / $scope.pageSize);
                };
            }, function(data) {
                $scope.notification = {
                    show: true,
                    isArray: true,
                    type: 'error',
                    message: data.data.errors
                };
                $scope.loadingClient = false;
                $scope.showClient = false;
            });
        };

        if($location.path() === '/apps') {
            $scope.refresh();
        }
    }
]);
