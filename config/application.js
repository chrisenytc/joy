var passport = require('passport'),
    oauth2orize = require('oauth2orize'),
    login = require('..//api/policies/requiresLogin.js'),
    utils = require('../utils.js');

module.exports = {

    appName: 'Joy | A awesome sails stack',
    port: process.env.PORT || 1337,
    environment: process.env.NODE_ENV || 'development',
    express: {
        customMiddleware: function(app) {

            /** oAuth Server **/

            app.use(passport.initialize());
            app.use(passport.session());

            var server = oauth2orize.createServer();
            server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
                var code = utils.uid(16);
                AuthCode.create({
                    code: code,
                    clientId: client.clientId,
                    redirectURI: redirectURI,
                    userId: user.id,
                    scope: ares.scope
                }).done(function(err, code) {
                    if (err) {
                        return done(err, null);
                    }
                    return done(null, code.code);
                });
            }));

            // the token exchange
            server.exchange(oauth2orize.exchange.code(function(client, code, redirectURI, done) {
                AuthCode.findOne({
                    code: code
                }).done(function(err, code) {
                    if (err || !code) {
                        return done(err);
                    }
                    if (client.clientId !== code.clientId) {
                        return done(null, false);
                    }
                    if (redirectURI !== code.redirectURI) {
                        return done(null, false);
                    }

                    var token = utils.unique_token();
                    Token.create({
                        token: token,
                        userId: code.userId,
                        clientId: code.clientId,
                        scope: code.scope
                    }).done(function(err, token) {
                        if (err) {
                            return done(err);
                        }
                        return done(null, token);
                    });
                });
            }));

            app.get('/oauth/authorize', login, server.authorize(function(clientID, redirectURI, done) {
                Client.findOne({
                    clientId: clientID
                }, function(err, cli) {

                    if (err) {
                        return done(err);
                    }
                    if (!cli) {
                        return done(null, false);
                    }
                    if (cli.redirectURI != redirectURI) {
                        return done(null, false);
                    }
                    return done(null, cli, cli.redirectURI);
                });
            }), function(req, res) {
                return res.render('dialog', {
                    transactionID: req.oauth2.transactionID,
                    user: req.user,
                    cli: req.oauth2.client
                });
            });

            app.post('/oauth/authorize/decision',
                login,
                server.decision());

            server.serializeClient(function(client, done) {
                return done(null, client.id);
            });

            server.deserializeClient(function(id, done) {
                Client.findOne(id, function(err, client) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, client);
                });
            });

            app.post('/oauth/token',
                passport.authenticate('oauth2-client-password', {
                    session: false
                }),
                server.token(),
                server.errorHandler());
        }
    }
};
