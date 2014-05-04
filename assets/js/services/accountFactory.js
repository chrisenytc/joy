'use strict';

app.factory('Account', function($resource, $settings) {
    return $resource($settings.apiUri + '/account', null, {
        update: {
            method: 'PUT'
        }
    });
});