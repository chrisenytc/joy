/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

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

        hashedPassword: {
            type: 'string',
        },

        status: {
            type: 'BOOLEAN',
            defaultsTo: false
        },

        checkPassword: function(password) {
            var pwdCompare = bcrypt.compareSync(password, this.hashedPassword);
            if (pwdCompare) {
                return true;
            } else {
                return false;
            }
        },

        // Override toJSON method to remove password from API
        toJSON: function() {
            var obj = this.toObject();
            delete obj.hashedPassword;
            return obj;
        }
    },
    // Lifecycle Callbacks
    beforeValidation: function(values, next) {
        User.findOne({
            email: values.email
        }).done(function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next();
            }
            if (user.email === values.email) {
                return next();
            }
            return next('This email already exists!');
        });
    },
    beforeCreate: function(values, next) {
        bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) return next(err);
            values.hashedPassword = hash;
            delete values.password;
            return next();
        });
    }

};
