function Chat() {
     this._chat = [];  // message.js

    this.getChat = () => {
        return this._chat;
    };

    this.addMessage = function(message) {
        return this._chat.push(message);
    };

};

