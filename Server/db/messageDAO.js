const DAO = require('./DAO.js');
const config = require('./config.js');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    date: {type: Number, required: true}
});

function MessageDAO () {
    this.connection = null;
    this.model = null;
}

MessageDAO.prototype = Object.create(DAO.prototype);
MessageDAO.prototype.constructor = MessageDAO;

MessageDAO.prototype.init = () => {
    if (this.connection) {
        return;
    }

    const url = `${config.settings.mongodb.connectionURL}/users_chat`;

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/users_chat', {useNewUrlParser: true});
    this.model = new mongoose.model('Messages', messageSchema);
};

MessageDAO.prototype.insert = async insertMessage => {
    const message = this.model(insertMessage);

    await message.save();

    console.log('Message is saved!');
};

MessageDAO.prototype.getByReceiver = async receiver => {
    return await this.model.find({receiver: receiver});
};

// MessageDAO.prototype.getBySenderAndReceiver = async (sender, receiver) => {
//     const sent = await this.mode.find({sender: sender, receiver: receiver});
//     const reseived = await this.model.find({sender: receiver, receive: sender});
//     const messages = [...sent, ...reseived];
//
//     messages.sort(dynamicSort('date'));
//
// };

module.exports = MessageDAO;