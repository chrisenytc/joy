/**
 * User
 *
 * @module      :: Model
 * @description :: A user model
 *
 */

var crypto = require('crypto');

function hashed(values, next) {
    var hashed_password = crypto.createHash('whirlpool').update(values.password).digest('hex');
    values.password = hashed_password;
    return next();
};

module.exports = {

    attributes: {

        name: {
            type: 'STRING',
            required: true
        },

        email: {
            type: 'STRING',
            required: true,
            unique: true
        },

        password: {
            type: 'STRING',
            required: true
        },

        status: {
            type: 'BOOLEAN',
            defaultsTo: false
        },

        checkPassword: function(password) {
            return crypto.createHash('whirlpool').update(password).digest('hex') === this.password;
        }

    },

    // Lifecycle Callbacks
    beforeValidation: function(values, next) {
        User.findOne({
            email: values.email
        }).done(function(err, user) {
            if(err) {
                return next(err);
            }
            if(!user) {
                return next();
            }
            if(user.email === values.email) {
                return next();
            }
            return next('This email already exists!');
        });
    },
    beforeCreate: function(values, next) {
        return hashed(values, next);
    },
    beforeUpdate: function(values, next) {
        return hashed(values, next);
    }
};
