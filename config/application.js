var crypto = require('crypto'),
    flash = require('connect-flash'),
    passport = require('passport'),
    oauth2orize = require('oauth2orize'),
    mailer = require('nodemailer'),
    sweetcaptcha = new require('sweetcaptcha')('app_id', 'app_key', 'app_secret'),
    login = require('../api/policies/requiresLogin.js'),
    utils = require('../utils.js'),
    mail = {
        email: process.env.MAIL_EMAIL || '',
        password: process.env.MAIL_PASSWORD || '',
        from: 'Joy <' + this.email + '>',
    },
    Sender = mailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: mail.email,
            pass: mail.password
        }
    });

module.exports = {

    appName: 'Joy.js | A awesome sails stack',
    appUrl: 'http://localhost:1337',
    port: process.env.PORT || 1337,
    environment: process.env.NODE_ENV || 'development',
    email: mail.email,
    emailPassword: mail.password,
    from: mail.from,
    express: {
        customMiddleware: function(app) {

            /** Passport **/

            app.use(passport.initialize());
            app.use(passport.session());

            /** Flash **/

            app.use(flash());

            /** Locals **/

            app.use(function(req, res, next) {
                res.locals.msg = req.flash();
                if (req.hasOwnProperty('user')) {
                    res.locals.user = req.user;
                }
                res.locals.md5 = function(string) {
                    return crypto.createHash('md5').update(string).digest("hex");
                };
                res.locals.formatName = function(name) {
                    var names = name.split(' ');
                    return {
                        name: names[0],
                        lastname: names[1] || ''
                    };
                };
                next();
            });

            /** API Response **/

            app.use(function(req, res, next) {
                //Check statusCode and return a custom message
                function statusMsg(status) {
                    switch (status) {
                        case 200:
                            return 'OK';
                            break;
                        case 301:
                            return 'Moved permanently';
                            break;
                        case 400:
                            return 'Bad Request';
                            break;
                        case 401:
                            return 'Unauthorized';
                            break;
                        case 403:
                            return 'Forbidden';
                            break;
                        case 404:
                            return 'Not Found';
                            break;
                        case 500:
                            return 'Internal Server Error';
                            break;
                        case 503:
                            return 'Service Unavailable';
                            break;
                        default:
                            return 'Error';
                    }
                };
                //API response
                res.sendResponse = function(statusCode, payload) {
                    return this.jsonp(statusCode, {
                        metadata: {
                            status: statusCode,
                            msg: statusMsg(statusCode)
                        },
                        response: payload
                    });
                };
                //
                next();
            });

            /** Mailer **/

            app.use(function(req, res, next) {
                //Instance
                res.sendMail = function(subject, email, templatePath, data) {
                    return this.render(templatePath, data, function(err, html) {
                        if (err) {
                            return res.serverError(err);
                        }
                        var mailOptions = {
                            from: mail.from,
                            to: email,
                            subject: subject,
                            html: html
                        };
                        Sender.sendMail(mailOptions, function(err) {
                            if (err) {
                                return res.serverError(err);
                            }
                        });
                    });
                };
                next();
            });

            /** Captcha **/

            app.use(function(req, res, next) {
                //Instance
                req.validateCaptcha = function(callback) {
                    sweetcaptcha.api('check', {
                        sckey: this.body.sckey,
                        scvalue: this.body.scvalue
                    }, function(err, response) {
                        if (err) {
                            return callback(err);
                        }
                        if (response === 'true') {
                            // valid captcha
                            return callback(null, true);
                        }
                        // invalid captcha
                        callback(null, false);
                    });
                };
                next();
            });

            app.get('/captcha', function(req, res) {
                sweetcaptcha.api('get_html', function(err, html) {
                    if (err) {
                        return res.serverError(err);
                    }
                    res.send(html);
                });
            });

            /** oAuth Server **/

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
