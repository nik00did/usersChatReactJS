function Users() {
    this._users = [];

    this.getUsers = () => {
        return this._users;
    };

    this.addUser = user => {
        return this._users.push(user);
    };
};

