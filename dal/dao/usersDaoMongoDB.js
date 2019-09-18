const DAO = require('./dao.js');
const config = require('../../config');
const mongoose = require('mongoose');

function UsersDaoMongoDB () {
    this._connection = null;
    this._model = null;
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

UsersDaoMongoDB.prototype = Object.create(DAO.prototype);
UsersDaoMongoDB.prototype.constructor = UsersDaoMongoDB;

UsersDaoMongoDB.prototype.init = () => {
    if (this._connection) {
        return;
    }
    const url = `${config.dataBase.mongo.connection}/users_chat`;

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/users_chat', {useNewUrlParser: true});
    this._model = new mongoose.model('Users', userSchema);
};


UsersDaoMongoDB.prototype.insert = async insertUser => {
    const user = this._model(insertUser);
    await user.save().then(() => console.log('Insert is saved!')).catch(() => console.log('error'));
};

UsersDaoMongoDB.prototype.getAll = async () => {
    const data = [];

    await this._model.find((e, item) => {
        if (e) {
            console.log(e);
        }

        data.push(item);
    }).then(() => console.log('got all!')).catch(() => console.log('error'));

    return data;
    //return await this._model.find();
};

UsersDaoMongoDB.prototype.getUser = async (email, password) => {
    let user;

    user = await this._model.findOne({email: email, password: password});

    return user;
};

UsersDaoMongoDB.prototype.getUserById = async id => {
    let user;

    user = await this._model.find({_id: id});

    return user;
};

module.exports = UsersDaoMongoDB;