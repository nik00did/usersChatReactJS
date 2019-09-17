function Model() {
    this._usersRegistrate = new Users();       // user.js
    this.chatMsg = new Chat();                      // chat.js


    this.getUsersRegistrate = () => {
        return this._usersRegistrate._users;
    }
};

function Chat() {
    this._chat = [];
    this.addMessage = message => {
        return this._chat.push(message);
    };
    this.getChat = () => {
        return this._chat;
    };
}


function Message(owner, date, text) {
    this._owner = owner;
    this._date = date;
    this._text = text;
};

Message.prototype.getMessage = () => {
    return {
        owner: this._owner,
        date: this._date,
        text: this._text
    };
};

function Users() {
    this._users = [];

    this.getUsers = () => {
        return this._users;
    };

    this.getLast = () => {
        return this._users[this._users.length - 1];
    };

    this.addUser = user => {
        return this._users.push(user);
    };

    this.getUsersLast = () => {
        return this._users[this._users.length];
    };
}


Users.prototype.getUsers = () => {
    return this._users;
};

Users.prototype.addUser = user => {
    return this._users.push(user);
};

function User(name, email, password) {
    this._name = name;
    this._email = email;
    this._password = password;
    this.getUser = () => {
        return {
            _name: this._name,
            _email: this._email,
            _password: this._password
        };
    };
};

User.prototype.getUser = () => {
    return {
        _name: this._name,
        _email: this._email,
        _password: this._password
    };
};


module.exports = {Model, User, Chat, Message};


