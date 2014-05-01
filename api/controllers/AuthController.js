/**
 * AuthController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling auth requests.
 */

var passport = require('passport');

module.exports = {

    /**
     * Action blueprints:
     *    `/auth/create`
     */
    create: function(req, res, next) {

        //Create a new user
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            status: true
        }).done(function(err, user) {
            if (err) {
                return next(err);
            }
            passport.authenticate(
                'local',
                function(err, cuser, info) {
                    if ((err) || (!user)) {
                        // Send a response
                        return res.redirect('/login');
                    }
                    // use passport to log in the user using a local method
                    req.logIn(
                        user,
                        function(err) {
                            if (err) {
                                // Send a response
                                return res.redirect('/login');
                            }
                            // Send a response
                            return res.redirect('/users');
                        }
                    );
                }
            )(req, res);
        });
    },

    /**
     * Action blueprints:
     *    `/auth/process`
     */
    process: function(req, res) {
        passport.authenticate(
            'local',
            function(err, user, info) {
                if ((err) || (!user)) {
                    return res.redirect('/login?redirect=' + req.body.redirect);
                }
                // use passport to log in the user using a local method
                req.logIn(
                    user,
                    function(err) {
                        if (err) {
                            // Send a response
                            return res.redirect('/login?redirect=' + req.body.redirect);
                        }
                        if (req.body.redirect) {
                            // Send a response
                            return res.redirect(req.body.redirect);
                        } else {
                            // Send a response
                            return res.redirect('/users');
                        }
                    }
                );
            }
        )(req, res);
    },

    /**
     * Action blueprints:
     *    `/auth/signup`
     */

    signup: function(req, res) {
        // Send a response
        return res.render('signup');
    },

    /**
     * Action blueprints:
     *    `/auth/login`
     */

    login: function(req, res) {
        // Send a response
        return res.render('login', {
            msg: req.query.msg,
            redirect: req.query.redirect
        });
    },

    /**
     * Action blueprints:
     *    `/auth/logout`
     */

    logout: function(req, res) {
        req.logout();
        // Send a response
        return res.redirect('/login');
    }

};
