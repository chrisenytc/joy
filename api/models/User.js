/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

var crypto = require('crypto');

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
            required: true
        },

        checkPassword: function(password) {
            return crypto.createHash('whirlpool').update(password).digest('hex') === this.password;
        }

    },

    // Lifecycle Callbacks
    beforeValidation: function(values, next) {
        var hashed_password = crypto.createHash('whirlpool').update(values.password).digest('hex');
        values.password = hashed_password;
        return next();
    }
};
