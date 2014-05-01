/**
 * Token
 *
 * @module      :: Model
 * @description :: Access tokens for oAuth 2 clients
 *
 */

module.exports = {

    attributes: {

        token: {
            type: 'STRING',
            required: true,
            unique: true
        },

        userId: {
            type: 'STRING',
            required: true
        },

        clientId: {
            type: 'STRING',
            required: true
        },

        scope: {
            type: 'STRING'
        }

    }

};
