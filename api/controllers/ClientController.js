/**
 * ClientController
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

var utils = require('../../utils.js');

module.exports = {


    /**
     * Action blueprints:
     *    `/clients/index`
     *    `/clients`
     */
    index: function(req, res, next) {

        Client.find({
            userId: req.user.id
        }).done(function(err, clients) {
            if (err) {
                return next(err);
            }
            // Send a response
            return res.render('client/index', {
                clients: clients,
                msg: req.query.msg
            });
        });
    },


    /**
     * Action blueprints:
     *    `/clients/new`
     */
    new: function(req, res) {

        // Send a response
        return res.render('client/new');
    },


    /**
     * Action blueprints:
     *    `/clients/create`
     */
    create: function(req, res, next) {

        //Create a new client
        Client.create({
            name: req.body.name,
            clientId: utils.uid(16),
            clientSecret: utils.unique_token(),
            redirectURI: req.body.redirectURI,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return next(err);
            }
            // Send a response
            return res.redirect('/clients?msg=Client created successfully!');
        });
    },

    /**
     * Action blueprints:
     *    `/clients/edit/:id`
     */
    edit: function(req, res, next) {

        Client.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return next(err);
            }
            // Send a response
            return res.render('client/edit', {
                client: client
            });
        });
    },

    /**
     * Action blueprints:
     *    `/clients/:id`
     */
    find: function(req, res, next) {

        Client.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return next(err);
            }
            // Send a response
            return res.render('client/show', {
                client: client
            });
        });
    },


    /**
     * Action blueprints:
     *    `/clients/update/:id`
     */
    update: function(req, res) {

        Client.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return next(err);
            }
            if (req.body.hasOwnProperty('name') && req.body.name !== '') {
                client.name = req.body.name;
            }
            if (req.body.hasOwnProperty('redirectURI') && req.body.redirectURI !== '') {
                client.redirectURI = req.body.redirectURI;
            }
            client.save(function(err) {
                // Send a response
                return res.redirect('/clients?msg=Client updated successfully!');
            });
        });
    },


    /**
     * Action blueprints:
     *    `/clients/destroy`
     */
    destroy: function(req, res) {

        Client.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return next(err);
            }
            client.destroy(function(err) {
                // Send a response
                return res.redirect('/clients?msg=Client removed successfully!');
            });
        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ClientController)
     */
    _config: {}


};
