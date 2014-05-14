/**
 * requiresScope
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(scope) {
    return function(req, res, next) {
        if (!req.authInfo || !req.authInfo.scope || req.authInfo.scope.indexOf(scope) === -1) {
            return res.sendResponse(200, {
                msg: 'Bad Authentication. Do not have authorization to access the API with this acess_token!'
            });
        } else {
            return next();
        }
    };
};
