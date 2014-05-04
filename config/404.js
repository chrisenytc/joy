/**
 * Default 404 (Not Found) handler
 *
 * If no route matches are found for a request, Sails will respond using this handler.
 *
 * This middleware can also be invoked manually from a controller or policy:
 * Usage: res.notFound()
 */

module.exports[404] = function pageNotFound(req, res) {

    /*
     * NOTE: This function is Sails middleware-- that means that not only do `req` and `res`
     * work just like their Express equivalents to handle HTTP requests, they also simulate
     * the same interface for receiving socket messages.
     */

    var viewFilePath = '404';
    var statusCode = 404;
    var result = {
        metadata: {
            status: statusCode,
            msg: 'Not Found'
        }
    };

    // If the user-agent wants a JSON response, send json
    if (req.wantsJSON) {
        return res.json(result, result.metadata.status);
    }

    res.status(result.metadata.status);
    res.render(viewFilePath, function(err) {
        // If the view doesn't exist, or an error occured, send json
        if (err) {
            return res.json(result, result.metadata.status);
        }

        // Otherwise, serve the `views/404.*` page
        res.render(viewFilePath);
    });

};
