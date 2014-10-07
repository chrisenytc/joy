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
     *    `post /signup`
     */
    create: function(req, res) {

        req.validateCaptcha(function(err, isValid) {
            //Check captcha
            if (!isValid) {
                return res.serverError('You did not answer the captcha correctly. Try again!');
            }
            //Create a new user
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }).done(function(err, user) {
                if (err) {
                    return res.serverError(err);
                }
                //Generate token
                var token = UtilsService.unique_token();
                Activate.create({
                    email: user.email,
                    token: token
                }).done(function(err, token) {
                    return res.serverError(err);
                });
                //Send Email
                res.sendMail('Welcome to Joy', user.email, 'mail/signup', {
                    user: user,
                    token: token,
                    appUrl: sails.config.appUrl
                });
                //Send message
                return res.sendResponse(200, {
                    msg: 'An email with the your activation token has been sent to your email!'
                });
            });
        });
    },


    /**
     * Action blueprints:
     *    `post /signup/activate`
     */
    update: function(req, res) {

        //Find activation
        Activate.findOne({
            token: req.body.token
        }).done(function(err, token) {
            if (err) {
                return res.serverError(err);
            }
            if (!token) {
                return res.serverError('This token is invalid!');
            }
            User.findOne({
                email: token.email
            }).done(function(err, user) {
                if (err) {
                    return res.serverError(err);
                }
                if (!user) {
                    return res.serverError('User not found!');
                }
                //Activate
                user.status = true;
                //Save
                user.save(function(err) {
                    if (err) {
                        return res.serverError(err);
                    }
                });
                //Remove token
                token.destroy(function(err) {
                    if (err) {
                        return res.serverError(err);
                    }
                });
                //Send Email
                res.sendMail('Your account is Activated', user.email, 'mail/activate', {
                    user: user,
                    appUrl: sails.config.appUrl
                });
                //Send message
                return res.sendResponse(200, {
                    msg: 'Your account has been activated!'
                });
            });
        });

    },

    /**
     * Action blueprints:
     *    `post /login`
     */
    process: function(req, res) {
        passport.authenticate(
            'local',
            function(err, user, info) {
                if (err || !user) {
                    req.flash('error', 'Invalid Password!');
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
                            return res.redirect('/');
                        }
                    }
                );
            }
        )(req, res);
    },

    /**
     * Action blueprints:
     *    `/signup`
     */

    signup: function(req, res) {
        // Send a response
        return res.render('users/signup');
    },

    /**
     * Action blueprints:
     *    `/signup/activate`
     */

    activate: function(req, res) {
        // Send a response
        return res.render('users/activate');
    },

    /**
     * Action blueprints:
     *    `/login`
     */

    login: function(req, res) {
        // Send a response
        return res.render('users/login', {
            redirect: req.query.redirect
        });
    },

    /**
     * Action blueprints:
     *    `/logout`
     */

    logout: function(req, res) {
        req.logout();
        // Send a response
        return res.redirect('/login');
    }

};
