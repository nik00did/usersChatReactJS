const DAO = require('./dao.js');
const config = require('../../config.js');
const mongoose = require('mongoose');

function MessagesDaoMongoDB () {
    this._connection = null;
    this._model = null;
}

const messageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    date: {type: Number, required: true}
});

MessagesDaoMongoDB.prototype = Object.create(DAO.prototype);
MessagesDaoMongoDB.prototype.constructor = MessagesDaoMongoDB;

MessagesDaoMongoDB.prototype.init = () => {
    if (this._connection) {
        return;
    }

    const url = `${config.dataBase.mongo.connection}/users_chat`;

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/users_chat', {useNewUrlParser: true});
    this._model = new mongoose.model('Messages', messageSchema);
};

MessagesDaoMongoDB.prototype.insert = async insertMessage => {
    const message = this._model(insertMessage);

    await message.save();

    console.log('Message is saved!');
};

MessagesDaoMongoDB.prototype.getByReceiver = async receiver => {
    return await this._model.find({receiver: receiver});
};

MessagesDaoMongoDB.prototype.getBySenderAndReceiver = async function(sender, receiver) {
    const sent = await this.model.find({ sender, receiver });
    const received = await this.model.find({ sender: receiver, receiver: sender });
    const messages = [...sent, ...received];
    messages.sort(dynamicSort("date"));

    return messages;
};

function dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

        return result * sortOrder;
    }
}

module.exports = MessagesDaoMongoDB;