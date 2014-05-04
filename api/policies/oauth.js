/**
 * oauth
 *
 * @module      :: Policy
 * @description :: Simple policy to use authentication bearer
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var passport = require('passport');

module.exports = function(req, res, next) {
    passport.authenticate(
        'bearer',
        function(err, user, info) {
            if ((err) || (!user)) {
                return res.jsonp({msg: 'Bad Authentication. You do not have permission to access the API!'});
            }
            delete req.query.access_token;
            req.user = user;
            return next();
        }
    )(req, res);
};
