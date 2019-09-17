const DAO = require('./DAO.js');
const config = require('./config.js');
const mongoose = require('mongoose');

function MessageDAO () {
    this._connection = null;
    this._model = null;
}

MessageDAO.prototype = Object.create(DAO.prototype);
MessageDAO.prototype.constructor = MessageDAO;

MessageDAO.prototype.init = () => {
    if (this._connection) {
        return;
    }
    switch (config.dataBase.type) {
        case 'mongodb':
            const messageSchema = new mongoose.Schema({
                message: {type: String, required: true},
                sender: {type: String, required: true},
                receiver: {type: String, required: true},
                date: {type: Number, required: true}
            });

            const url = `${config.dataBase.connectionURL}/users_chat`;

            mongoose.Promise = global.Promise;
            mongoose.connect('mongodb://localhost/users_chat', {useNewUrlParser: true});
            this._model = new mongoose.model('Messages', messageSchema);
            break;
        case 'postgreSQL':
            break;
        case 'mySQL':
            break;
        case 'redis':
            break;
    }
};

MessageDAO.prototype.insert = async insertMessage => {
    const message = this._model(insertMessage);

    await message.save();

    console.log('Message is saved!');
};

MessageDAO.prototype.getByReceiver = async receiver => {
    return await this._model.find({receiver: receiver});
};

let db = new MessageDAO();
db.init();
db.insert({
    message: '00000000000000',
    sender: 'nikita',
    receiver:'stas',
    date: new Date().getTime()
});
// module.exports = MessageDAO;