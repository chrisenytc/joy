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
            type: 'STRING',
            required: true
        },

        token: {
            type: 'STRING',
            required: true,
            unique: true
        }

    }

};
