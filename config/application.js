var passport = require('passport'),
    oauth2orize = require('oauth2orize'),
    mailer = require('nodemailer'),
    Recaptcha = require('recaptcha').Recaptcha,
    login = require('connect-ensure-login'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    _ = require('underscore'),
    trustedClientPolicy = require('../api/policies/isTrustedClient.js'),
    flash = require('connect-flash'),
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
    }),
    PUBLIC_KEY = process.env.RECAPTCHA_PUBLIC_KEY || '',
    PRIVATE_KEY = process.env.RECAPTCHA_PRIVATE_KEY || '';

// Create OAuth 2.0 server
var server = oauth2orize.createServer();

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

// Generate authorization code
server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
    AuthCode.create({
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

// Generate access token for Implicit flow
// Only access token is generated in this flow, no refresh token is issued
server.grant(oauth2orize.grant.token(function(client, user, ares, done) {
    AccessToken.destroy({
        userId: user.id,
        clientId: client.clientId
    }, function(err) {
        if (err) {
            return done(err);
        } else {
            AccessToken.create({
                userId: user.id,
                clientId: client.clientId,
                scope: ares.scope
            }, function(err, accessToken) {
                if (err) {
                    return done(err);
                } else {
                    return done(null, accessToken.token);
                }
            });
        }
    });
}));

// Exchange authorization code for access token
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

        // Remove Refresh and Access tokens and create new ones
        RefreshToken.destroy({
            userId: code.userId,
            clientId: code.clientId
        }, function(err) {
            if (err) {
                return done(err);
            } else {
                AccessToken.destroy({
                    userId: code.userId,
                    clientId: code.clientId
                }, function(err) {
                    if (err) {
                        return done(err);
                    } else {
                        RefreshToken.create({
                            userId: code.userId,
                            clientId: code.clientId
                        }, function(err, refreshToken) {
                            if (err) {
                                return done(err);
                            } else {
                                AccessToken.create({
                                    userId: code.userId,
                                    clientId: code.clientId,
                                    scope: code.scope
                                }, function(err, accessToken) {
                                    if (err) {
                                        return done(err);
                                    } else {
                                        return done(null, accessToken.token, refreshToken.token, {
                                            'expires_in': sails.config.oauth.tokenLife
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

    });
}));

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    User.findOne({
        email: username
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }

        var pwdCompare = bcrypt.compareSync(password, user.hashedPassword);
        if (!pwdCompare) {
            return done(null, false);
        }

        // Remove Refresh and Access tokens and create new ones
        RefreshToken.destroy({
            userId: user.id,
            clientId: client.clientId
        }, function(err) {
            if (err) {
                return done(err);
            } else {
                AccessToken.destroy({
                    userId: user.id,
                    clientId: client.clientId
                }, function(err) {
                    if (err) {
                        return done(err);
                    } else {
                        RefreshToken.create({
                            userId: user.id,
                            clientId: client.clientId
                        }, function(err, refreshToken) {
                            if (err) {
                                return done(err);
                            } else {
                                AccessToken.create({
                                    userId: user.id,
                                    clientId: client.clientId,
                                    scope: scope
                                }, function(err, accessToken) {
                                    if (err) {
                                        return done(err);
                                    } else {
                                        done(null, accessToken.token, refreshToken.token, {
                                            'expires_in': sails.config.oauth.tokenLife
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {

    RefreshToken.findOne({
        token: refreshToken
    }, function(err, token) {

        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }
        if (!token) {
            return done(null, false);
        }

        User.findOne({
            id: token.userId
        }, function(err, user) {

            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            // Remove Refresh and Access tokens and create new ones 
            RefreshToken.destroy({
                userId: user.id,
                clientId: client.clientId
            }, function(err) {
                if (err) {
                    return done(err);
                } else {
                    AccessToken.destroy({
                        userId: user.id,
                        clientId: client.clientId
                    }, function(err) {
                        if (err) {
                            return done(err);
                        } else {
                            RefreshToken.create({
                                userId: user.id,
                                clientId: client.clientId
                            }, function(err, refreshToken) {
                                if (err) {
                                    return done(err);
                                } else {
                                    AccessToken.create({
                                        userId: user.id,
                                        clientId: client.clientId,
                                        scope: scope
                                    }, function(err, accessToken) {
                                        if (err) {
                                            return done(err);
                                        } else {
                                            done(null, accessToken.token, refreshToken.token, {
                                                'expires_in': sails.config.oauth.tokenLife
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    });
}));

module.exports = {

    appName: 'Joy.js | A awesome sails stack',
    appUrl: 'http://localhost:1337',
    port: process.env.PORT || 1337,
    environment: process.env.NODE_ENV || 'development',
    email: mail.email,
    emailPassword: mail.password,
    from: mail.from,
    oauth: {
        tokenLife: 3600
    },
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
                        lastname: _.last(names) || ''
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
                        case 301:
                            return 'Moved permanently';
                        case 400:
                            return 'Bad Request';
                        case 401:
                            return 'Unauthorized';
                        case 403:
                            return 'Forbidden';
                        case 404:
                            return 'Not Found';
                        case 500:
                            return 'Internal Server Error';
                        case 503:
                            return 'Service Unavailable';
                        default:
                            return 'Error';
                    }
                }
                //API response
                res.sendResponse = function(statusCode, payload) {
                    if (!payload) {
                        return this.jsonp(200, {
                            metadata: {
                                status: 200,
                                msg: statusMsg(200)
                            },
                            response: statusCode
                        });
                    }
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
                req.getCaptcha = function(callback) {
                    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
                    //Send html
                    return callback(recaptcha.toHTML());
                };
                next();
            });

            app.use(function(req, res, next) {
                //Instance
                req.validateCaptcha = function(callback, isNative) {
                    var data,
                        isNative = isNative || false;
                    if (isNative) {
                        data = {
                            remoteip: this.connection.remoteAddress,
                            challenge: req.body.recaptcha_challenge_field,
                            response: req.body.recaptcha_response_field
                        };
                    } else {
                        data = {
                            remoteip: this.connection.remoteAddress,
                            challenge: this.body.recaptcha.challenge,
                            response: this.body.recaptcha.response
                        };
                    }
                    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data);

                    recaptcha.verify(function(success, error_code) {
                        if (success) {
                            return callback(null, true);
                        } else {
                            return callback(null, false);
                        }
                    });
                };
                next();
            });

            /** OAuth authorize endPoints **/

            app.get('/oauth/authorize',
                login.ensureLoggedIn(),
                server.authorize(function(clientId, redirectURI, scope, state, done) {

                    Client.findOne({
                        clientId: clientId
                    }, function(err, client) {
                        if (err) {
                            return done(err);
                        }
                        if (!client) {
                            return done(null, false);
                        }
                        if (client.redirectURI != redirectURI) {
                            return done(null, false);
                        }
                        return done(null, client, client.redirectURI);
                    });
                }),
                server.errorHandler(),
                function(req, res) {
                    res.render('users/dialog', {
                        transactionID: req.oauth2.transactionID,
                        user: req.user,
                        client: req.oauth2.client,
                        scope: req.query.scope,
                        scopeList: req.query.scope.split(',')
                    });
                }
            );

            app.post('/oauth/authorize/decision',
                login.ensureLoggedIn(),
                server.decision(function(req, done) {
                    return done(null, {
                        scope: req.body.scope
                    });
                }));

            /** OAuth token endPoint **/

            app.post('/oauth/token',
                trustedClientPolicy,
                passport.authenticate(['basic', 'oauth2-client-password'], {
                    session: false
                }),
                server.token(),
                server.errorHandler()
            );
        }
    }
};
