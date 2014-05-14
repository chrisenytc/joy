/**
 * ForgotController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


module.exports = {

    /**
     * Action blueprints:
     *    `/forgot`
     */

    index: function(req, res) {
        // Send a response
        return res.render('users/forgot');
    },

    /**
     * Action blueprints:
     *    `post /forgot`
     */
    create: function(req, res) {

        req.validateCaptcha(function(err, isValid) {
            //Check captcha
            if (!isValid) {
                return res.serverError('You did not answer the captcha correctly. Try again!');
            }
            //Create a new user
            User.findOne({
                email: req.body.email
            }).done(function(err, user) {
                if (err) {
                    return res.serverError(err);
                }
                if (!user) {
                    return res.serverError('This email is invalid!');
                }
                //Generate token
                var token = UtilsService.unique_token();
                Forgot.create({
                    email: user.email,
                    token: token
                }).done(function(err, token) {
                    return res.serverError(err);
                });
                //Send Email
                res.sendMail('Forgot Password', user.email, 'mail/forgot', {
                    user: user,
                    token: token,
                    appUrl: sails.config.appUrl
                });
                //Send message
                return res.sendResponse(200, {
                    msg: 'An email with the your forgot token has been sent to your email!'
                });
            });
        });
    },


    /**
     * Action blueprints:
     *    `post /forgot/reset`
     */
    reset: function(req, res) {

        //Find forgot
        Forgot.findOne({
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
                //Generate password
                var newPassword = utils.uid(8);
                //Change
                user.password = newPassword;
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
                res.sendMail('Your new password', user.email, 'mail/reset', {
                    user: user,
                    newPassword: newPassword,
                    appUrl: sails.config.appUrl
                });
                //Send message
                return res.sendResponse(200, {
                    msg: 'An email with the new password has been sent to your email!'
                });
            });
        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ForgotController)
     */
    _config: {}


};
