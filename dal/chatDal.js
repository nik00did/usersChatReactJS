const constants = require('../constants');
const UsersDaoMongoDB = require('./dao/usersDaoMongoDB');
const MessagesDaoMongoDB = require('./dao/messagesDaoMongoDB');
const config = require('../config');

function ChatDal() {
    this.messagesDAO = null;
    this.usersDAO = null;
}

ChatDal.prototype.createMessagesDAO = () => {
    switch (config.dataBase.mongo) {
        case constants.MONGO:
            return new MessagesDaoMongoDB();
        case constants.POSTGRES: break;
        case constants.MYSQL: break;
        case constants.REDIS: break;
        default:
            throw new Error('unknown databaseType');
    }
};

ChatDal.prototype.createUsersDAO = () => {
    switch (config.dataBase.mongo) {
        case constants.MONGO:
            return new UsersDaoMongoDB();
        case constants.POSTGRES: break;
        case constants.MYSQL: break;
        case constants.REDIS: break;
        default:
            throw new Error('unknown databaseType');
    }
};

ChatDal.prototype.init = () => {
    this.messagesDAO = this.createMessagesDAO();
    this.messagesDAO.init();
    this.usersDAO = this.createUsersDAO();
    this.usersDAO.init();
};

ChatDal.prototype.readPublicMessages = async function () {
    return await this.messagesDAO.getByReceiver("ALL");
};

ChatDal.prototype.readPrivateMessages = async function (sender, receiver) {
    return await this.messagesDAO.getBySenderAndReceiver(sender, receiver);
};

ChatDal.prototype.createMessage = async function (message) {
    await this.messagesDAO.insert(message);
};

ChatDal.prototype.readAllUsers = async function () {
    return await this.usersDAO.getAll()
};

ChatDal.prototype.createUser = async function (user) {
    await this.usersDAO.insert(user);
};

// ChatDal.prototype.read = async function (user) {
//     return await this.usersDAO.get(user);
// };

ChatDal.prototype.readUser = async function (email, password) {
    return await this.usersDAO.getUser(email, password);
};

ChatDal.prototype.readUserById = async function (id) {
    return await this.usersDAO.getUserById(id);
};

ChatDal.prototype.mergeMessageAndUser = (messages, users) => {
    const chat = [];

    for (let i = 0; i < messages.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if(users[j]._id === messages[i].sender) {
                const message = {
                    message: messages[i].message,
                    date: messages[i].date,
                    name: users[j].name,
                    email: users[j].email
                };

                chat.push(message);
            }
        }
    }

    return chat;
};

module.exports = ChatDal;