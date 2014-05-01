/**
 * Client
 *
 * @module      :: Model
 * @description :: oAuth 2 clients
 *
 */

module.exports = {

    attributes: {

        name: {
            type: 'STRING',
            required: true
        },

        clientId: {
            type: 'STRING',
            required: true,
            unique: true
        },

        clientSecret: {
            type: 'STRING',
            required: true,
            unique: true
        },

        redirectURI: {
            type: 'STRING',
            required: true
        },

        userId: {
            type: 'String',
            required: true
        }

    }

};
