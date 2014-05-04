'use strict';

app.filter("startFrom", function() {
    return function(input, start) {
        var e;
        try {
            start = +start;
            return input.slice(start);
        } catch (_error) {
            e = _error;
        }
    };
});
