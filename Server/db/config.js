const constants = require('./constants');

module.exports = {
    dataBaseType: constants.mongodb,
    settings: {
        mongodb: {
            connectionURL: 'mongodb://localhost:27017'
        }
    }
};