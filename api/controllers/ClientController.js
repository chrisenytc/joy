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

module.exports = {


    /**
     * Action blueprints:
     *    `/apps`
     */
    index: function(req, res) {

        Client.find({
            userId: req.user.id
        }).done(function(err, clients) {
            if (err) {
                return res.serverError(err);
            }
            // Send a response
            return res.render('clients/index', {
                clients: clients
            });
        });
    },


    /**
     * Action blueprints:
     *    `/clients`
     */
    clients: function(req, res) {

        Client.find({
            userId: req.user.id
        }).done(function(err, clients) {
            if (err) {
                return res.serverError(err);
            }
            // Send a JSON response
            return res.sendResponse(200, clients);
        });
    },


    /**
     * Action blueprints:
     *    `/apps/new`
     */
    new: function(req, res) {

        // Send a response
        return res.render('clients/new');
    },


    /**
     * Action blueprints:
     *    `post /clients`
     */
    create: function(req, res) {

        //Create a new client
        Client.create({
            name: req.body.name,
            redirectURI: req.body.redirectURI,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return res.serverError(err);
            }
            // Send a JSON response
            return res.sendResponse(200, {
                msg: 'Client created successfully!'
            });
        });
    },

    /**
     * Action blueprints:
     *    `/apps/:id/edit`
     */
    edit: function(req, res) {

        Client.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return res.serverError(err);
            }
            if (!client) {
                return res.serverError('Client not found!');
            }
            // Send a response
            return res.render('clients/edit', {
                client: client
            });
        });
    },

    /**
     * Action blueprints:
     *    `/clients/:id`
     */
    find: function(req, res) {

        Client.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return res.serverError(err);
            }
            if (!client) {
                return res.serverError('Client not found!');
            }
            // Send a JSON response
            return res.sendResponse(200, client);
        });
    },


    /**
     * Action blueprints:
     *    `put /clients/:id`
     */
    update: function(req, res) {

        Client.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return res.serverError(err);
            }
            if (!client) {
                return res.serverError('Client not found!');
            }
            if (req.body.hasOwnProperty('name') && req.body.name !== '') {
                client.name = req.body.name;
            }
            if (req.body.hasOwnProperty('redirectURI') && req.body.redirectURI !== '') {
                client.redirectURI = req.body.redirectURI;
            }
            client.save(function(err) {
                if (err) {
                    return res.serverError(err);
                }
                // Send a JSON response
                return res.sendResponse(200, {
                    msg: 'Client updated successfully!'
                });
            });
        });
    },


    /**
     * Action blueprints:
     *    `delete /clients/:id`
     */
    destroy: function(req, res) {

        Client.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).done(function(err, client) {
            if (err) {
                return res.serverError(err);
            }
            if (!client) {
                return res.serverError('Client not found!');
            }
            client.destroy(function(err) {
                if (err) {
                    return res.serverError(err);
                }
                // Send a JSON response
                return res.sendResponse(200, {
                    msg: 'Client removed successfully!'
                });
            });
        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ClientController)
     */
    _config: {}


};
