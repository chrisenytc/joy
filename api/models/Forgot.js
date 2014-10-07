/**
 * Forgot
 *
 * @module      :: Model
 * @description :: A forgot recover model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        email: {
            type: 'string',
            required: true
        },

        token: {
            type: 'string',
            required: true,
            unique: true
        }

    }

};
