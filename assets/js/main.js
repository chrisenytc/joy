'use strict';

//Root Application
window.app = angular.module('JoyApp', ['ngRoute', 'ngResource', 'ngMd5', 'vcRecaptcha']);
//Configuration
window.app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        //Routes
        $routeProvider
            .when('/', {
                controller: 'indexCtrl',
                templateUrl: '/js/views/index.html'
            })
            .when('/signup', {
                controller: 'signupCtrl',
                templateUrl: '/js/views/signup.html'
            })
            .when('/signup/activate', {
                controller: 'activateCtrl',
                templateUrl: '/js/views/activate.html'
            })
            .when('/forgot', {
                controller: 'forgotCtrl',
                templateUrl: '/js/views/forgot.html'
            })
            .when('/account', {
                controller: 'accountCtrl',
                templateUrl: '/js/views/account.html'
            })
            .when('/apps', {
                controller: 'clientCtrl',
                templateUrl: '/js/views/clients/index.html'
            })
            .when('/apps/new', {
                controller: 'clientCtrl',
                templateUrl: '/js/views/clients/new.html'
            })
            .when('/apps/:id/edit', {
                controller: 'clientCtrl',
                templateUrl: '/js/views/clients/edit.html'
            });
        //Enable html5Mode
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
]);


angular.element(document).ready(function() {
    angular.bootstrap(document, ['JoyApp']);
});
