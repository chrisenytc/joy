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

        clientId: 'string',
        
        clientSecret: 'string',

        redirectURI: {
            type: 'STRING',
            required: true
        },

        userId: {
            type: 'String',
            required: true
        },

        trusted: {
            type: 'boolean',
            defaultsTo: false
        }

    },

    beforeCreate: function(values, next) {
        values.clientId = UtilsService.uid(16);
        values.clientSecret = UtilsService.unique_token();
        next();
    }

};
