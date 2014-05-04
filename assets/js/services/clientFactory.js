'use strict';

app.factory('Client', function($resource, $settings) {
    return $resource($settings.apiUri + '/clients/:id', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});