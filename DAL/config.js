const constants = require('./constants');

module.exports = {
    dataBase: {
        type: constants.dataBase,
        connectionURL: `${constants.dataBase}://localhost:27017`
    }
};