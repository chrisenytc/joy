'use strict';

app.directive('captcha', function captcha() {
    return {
        templateUrl: '/captcha',
        restrict: 'A'
    };
});
