'use strict';

app.factory('$utils', function utils(md5) {
    return {
        email: function(email) {
            return md5.createHash(email || '');
        },
        gravatar: function(email, size) {
            size = size || '80';
            email = md5.createHash(email || '');
            return 'https://www.gravatar.com/avatar/' + email + '?s=' + size;
        },
        timeago: function(date) {
            return moment(date).fromNow();
        }
    };
});