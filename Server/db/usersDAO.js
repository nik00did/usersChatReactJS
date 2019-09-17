const DAO = require('./DAO.js');
const config = require('./config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

function UsersDAO () {
    this.connection = null;
    this.model = null;
}

UsersDAO.prototype = Object.create(DAO.prototype);
UsersDAO.prototype.constructor = UsersDAO;

UsersDAO.prototype.init = () => {
    if (this.connection) {
        return;
    }

    const url = `${config.settings.mongodb.connectionURL}/users_chat`;

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/users_chat', {useNewUrlParser: true});
    this.model = new mongoose.model('Users', userSchema);
};

UsersDAO.prototype.insert = async insertUser => {
    const user = this.model(insertUser);
    await user.save().then(() => console.log("'Insert is saved!")).catch(() => console.log('error'));
};

UsersDAO.prototype.getAll = async () => {
    const data = [];

    await this.model.find((e, item) => {
        if (e) {
            console.log(e);
        }

        data.push(item);
    }).then(() => console.log('got all!')).catch(() => console.log('error'));

    return data;
    //return await this.model.find();
};

UsersDAO.prototype.getUser = async (email, password) => {
    let user;

    user = await this.model.findOne({email: email, password: password});

    return user;
    //return await this.model.findOne({email: email, password: password});
};

UsersDAO.prototype.getUserById = async id => {
    let user;

    user = await this.model.find({_id: id});

    return user;
    //return await this.model.find({_id: id});
};

module.exports = UsersDAO;