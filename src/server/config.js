const constants = require('./constants');

module.exports = {
     dataBase: {
         mongo: {
             type: constants.MONGO,
             connection: 'mongodb://localhost:27017'
         },
         postgres: {
             type: constants.POSTGRES,
             connection: ''
         },
         mySQL: {
             type: constants.MYSQL,
             connection: ''
         },
         redis: {
             type: constants.REDIS,
             connection: ''
         },
     }
};