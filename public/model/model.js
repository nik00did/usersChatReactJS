function Model() {
    this._usersRegistrate = new Users();
    this.chatMsg = new Chat();

    this.getUsersRegistrate = () => {
        return this._usersRegistrate._users;
    }
    this.clearUsers =() =>{
        this._usersRegistrate = new Users();
    }
    this.clearMsg = () =>{
        this.chatMsg =  new Chat();
    }
};