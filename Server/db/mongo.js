const Users = require('./usersDAO.js');
const Messages = require('./messageDAO.js');

function Mongo () {
    this._users = new Users();
    this._messages = new Messages();
}

module.exports = {Mongo};