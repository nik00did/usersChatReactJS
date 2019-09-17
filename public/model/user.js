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
