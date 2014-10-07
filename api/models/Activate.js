/**
 * Activate
 *
 * @module      :: Model
 * @description :: A activation model
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
