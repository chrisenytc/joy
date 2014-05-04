'use strict';

app.directive('notification', function notification() {
    return {
        templateUrl: '/js/views/templates/notification.html',
        restrict: 'A'
    };
});
