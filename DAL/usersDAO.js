const DAO = require('./DAO.js');
const config = require('./config');
const mongoose = require('mongoose');

function UsersDAO () {
    this._connection = null;
    this._model = null;
}

UsersDAO.prototype = Object.create(DAO.prototype);
UsersDAO.prototype.constructor = UsersDAO;

UsersDAO.prototype.init = () => {
    if (this._connection) {
        return;
    }

    switch (config.dataBase.type) {
        case 'mongodb':
            // const connectionMongoDB = require('./connectionsDB/mongoDB');
            // connectionMongoDB(this._model, 'Users');
            const userSchema = new mongoose.Schema({
                    name: {type: String, required: true},
                    email: {type: String, required: true},
                    password: {type: String, required: true}
                });

                const url = `${config.dataBase.connectionURL}/users_chat`;

                mongoose.Promise = global.Promise;
                mongoose.connect('mongodb://localhost/users_chat', {useNewUrlParser: true});
                this._model = new mongoose.model('Users', userSchema);
            break;
        case 'postgreSQL':
            break;
        case 'mySQL':
            break;
        case 'redis':
            break;
    }
};


UsersDAO.prototype.insert = async insertUser => {
    const user = this._model(insertUser);
    await user.save().then(() => console.log('Insert is saved!')).catch(() => console.log('error'));
};

UsersDAO.prototype.getAll = async () => {
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

UsersDAO.prototype.getUser = async (email, password) => {
    let user;

    user = await this._model.findOne({email: email, password: password});

    return user;
};

UsersDAO.prototype.getUserById = async id => {
    let user;

    user = await this._model.find({_id: id});

    return user;
};

module.exports = UsersDAO;