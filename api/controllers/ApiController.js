/**
 * ApiController
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

var utils = require('../../utils.js'),
    Validator = require('validator');

module.exports = {


    /**
     * Action blueprints:
     *    `/api`
     */
    index: function(req, res) {

        // Send a JSON response
        return res.sendResponse(200, {
            welcome: 'Welcome to VaiPra.la API.'
        });
    },


    /**
     * Action blueprints:
     *    `post /api`
     */
    create: function(req, res) {

        //Instance userId
        var userId, shortCode;
        //Check if logged
        if (req.hasOwnProperty('user')) {
            userId = req.user.id;
        } else {
            userId = null;
        }

        //Custom shortCode
        if (req.body.hasOwnProperty('shortcode') && req.body.shortcode !== '') {
            if (Validator.isAlphanumeric(req.body.shortcode)) {
                shortCode = req.body.shortcode;
            } else {
                return res.serverError('You need a valid shortcode. Only alphanumeric characters!');
            }
        } else {
            shortCode = utils.uid(8);
        }

        //Create a new url
        Url.create({
            url: req.body.url,
            shortCode: shortCode,
            clicks: 0,
            data: [],
            userId: userId
        }).done(function(err, url) {
            if (err) {
                return res.serverError(err);
            }
            // Send a JSON response
            return res.sendResponse(200, {
                msg: 'Url generated successfully!',
                url: url
            });
        });
    },


    /**
     * Action blueprints:
     *    `/api/:shortcode`
     */
    find: function(req, res) {

        Url.findOne({
            shortCode: req.params.shortcode
        }).done(function(err, url) {
            if (err) {
                return res.serverError(err);
            }
            if (!url) {
                return res.serverError('Url not found!');
            }
            // Send a JSON response
            return res.sendResponse(200, {
                short: url.url
            });
        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ApiController)
     */
    _config: {}


};
