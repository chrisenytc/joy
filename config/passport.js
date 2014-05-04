var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    BasicStrategy = require('passport-http').BasicStrategy,
    LocalStrategy = require('passport-local').Strategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({
        id: id
    }, function(err, user) {
        done(err, user);
    });
});

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({
        email: email
    }).done(function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(
                null, false, req.flash('error', 'Unknown user ' + email));
        }
        if (!user.checkPassword(password)) {
            return done(
                null, false, req.flash('error', 'Invalid password!'));
        }
        if (!user.status) {
            return done(
                null, false, req.flash('alert', 'You need to active your account to login!'));
        }
        return done(null, user);
    });
}));

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy(
    function(username, password, done) {
        User.findOne({
            email: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.checkPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));

passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        Client.findOne({
            clientId: clientId
        }, function(err, client) {
            if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false);
            }
            if (client.clientSecret != clientSecret) {
                return done(null, false);
            }
            return done(null, client);
        });
    }));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).  The user must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy(
    function(accessToken, done) {
        Token.findOne({
            token: accessToken
        }, function(err, token) {
            if (err) {
                return done(err);
            }
            if (!token) {
                return done(null, false);
            }
            var info = {
                scope: '*'
            }
            User.findOne({
                id: token.userId
            }).done(function(err, user) {
                return done(err, user, info);
            });
        });
    }
));
