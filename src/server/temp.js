// const val = require("./validator.js");
// const mod = require("./model.js");
let express = require("express");
let bodyParse = require("body-parser");
let fs = require("fs");
const urlencodedParser = bodyParse.json();

let WebSocketServer = require('ws').Server;
let http = require('http');

//const db = require('./db/mongo.js');
//const dataBase = new db.Mongo();
//dataBase._users.init();
//dataBase._messages.init();

let model = new Model();
let validator = new Validator(model._usersRegistrate.getUsers());
const app = express();

// const enableWs =require("express-ws");
// const expressWs = enableWs(app);
//
//
// app.ws('/ws', (ws, req) =>{
//     ws.on('message', msg =>{
//         console.log(msg);
//     });
//
//     ws.on('close', () =>{
//         console.log('close');
//     });
//
//
// })
//
// app.listen(3002);



let server = http.createServer(app);
server.listen(5000, function () {
    console.log('WS is listen')
});

let socketServer = new WebSocketServer({server: server});
let timer;
let clients = [];

socketServer.on('connection', function (socket) {
    clients.push(socket);

    const sendMsgAllClients = function (data) {
        clients.forEach((client) => {
            console.log(data);
            console.log(`data`);
            client.send(data);
        });
    };

    socket.on('message', function (data) {
        console.log("мама тащи огнетушитель у меня горит");
        sendMsgAllClients(data);
    });

    socket.on('close', function (event) {

        const index = clients.indexOf(socket);
        console.log(clients);

        if (index > -1) {
            console.log('delete client');
            clients.splice(index, 1);
        }
        console.log('client is close');
        console.log('index');
        console.log(index);
        clearInterval(timer);
    })

})


app.use(bodyParse.json());
app.use(express.static("../../public"));
app.use(express.json());

app.listen(3000, function () {
    console.log("REST Сервер ожидает подключения...");
});

app.use(
    bodyParse.urlencoded({
        extended: true
    })
);

app.use(bodyParse.json());
// app.use(express.static(__dirname + "/public"));
app.use(express.static("/public"));
// app.use(express.json());
// app.get("/", function (req, res) {
//     console.log("/");
//     console.log("Чето пришло");
//     let model = { title : { main: "hello world!", subtitle: "subtitle" }, layout: false };
//     res.render('../client/index', model);
// });

app.get("/checkOnValid", function (req, res) {
    res.send("Получил, держи ответ");
});

app.post("/logIn", urlencodedParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log("/logIn");
    console.log(req.body);

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    console.log(`что пришло`);
    console.log(data.email, data.password);

    const newUser = {
        _email: data.email,
        _password: data.password
    };

    console.log(newUser._email);
    console.log(newUser._password);

    console.log(`Валидация`);
    if (!validator.isValid(data.email, data.password)) {
        console.log('is valid');
    } else {
        console.log('NO valid');
    }
    console.log(`Проверка регистрации`);
    let rez = validator.isRegistrate(newUser);
    if (rez) {
        console.log(`ПРОШЕЛ ПРОВЕРКУ`);
        console.log(rez);
        res.send({rez: rez});
    } else {
        console.log(`НЕЕЕЕЕЕЕЕ ПРОШЕЛ ПРОВЕРКУ`);
        res.send({rez: "bad_reg"});
    }

});

app.post("/signIn", urlencodedParser, function (req, res) {

    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log(req.body);

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    console.log("/signIn");
    console.log(data.name, data.email, data.configPassword, data.password);

    const newUser = new User(data.name, data.email, data.password);

    if (!validator.isValid(data.email, data.password)) {
        console.log('is valid');
    } else {
        console.log('NO valid');
    }
    console.log(`Проверка регистрации`);
    console.log(newUser._email);
    console.log(newUser._password);

    if (validator.isRegistrate(newUser)) {
        console.log(`НЕЕЕЕЕЕЕЕ ПРОШЕЛ РЕГИСТРАЦИЮ`);
        res.send("bad_reg");
    } else {
        model._usersRegistrate.addUser(newUser);
        //dataBase._users.insert(model._usersRegistrate.getUsersLast());
        console.log(`ПРОШЕЛ РЕГИСТРАЦИЮ`);
        res.send("good_reg");
    }

});

app.post("/getVectorUser", urlencodedParser, function (req, res) {
    console.log(`getVector`);
    const users = model._usersRegistrate.getUsers();
    console.log(users);

    //this is test data
    res.send(users);
});

app.post("/getVectorMsg", urlencodedParser, function (req, res) {
    console.log(`getVector`);
    //let x = new mod.Message('Name_Gena', 'THIS_DAY', 'Some_TEXT');
    //model.chatMsg.addMessage(x);
    const chat = model.chatMsg.getChat();
    console.log('REturn CHATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');

    console.log(chat);
    res.send(chat);
});


app.post("/putMSG", urlencodedParser, function (req, res) {

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);
    console.log(`req.body`);
    console.log(req.body);

    console.log(`putMSG`);
    model.chatMsg.addMessage(new Message(data._owner, data._date, data._text));
    console.log('Return CHATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
    console.log(model.chatMsg.getChat());
    res.send([data]);
});







function Validator(model) {

    const _model = model;

    this.isValid = (email, pass) => {
        if (check(email) || check(pass))
            return true;
        return false;
    };

    const check = (value) => {
        if (value === "" || value === undefined || value === null)
            return true;
        return false;
    };

    this.isRegistrate = (checkData) => {
        console.log(`isRegistrate`);
        console.log(checkData._email);
        console.log(checkData._password);
        console.log(_model.length);
        for (let i = 0; i < _model.length; i++) {
            const temp = _model[i].getUser();
            console.log(_model[i]._email);
            console.log(_model[i]._password);

            console.log(temp._email);
            console.log(temp._password);

            if ( temp._email === checkData._email && temp._password === checkData._password) {
                return temp._name;
            }
        }
        return false;
    };
}

function Validator(model) {

    const _model = model;

    this.isValid = (email, pass) => {
        if (check(email) || check(email))
            return true;
        return false;
    };

    const check = (value) => {
        if (value === "" || value === undefined || value === null)
            return true;
        return false;
    };

    this.isRegistrate = (checkData) => {
        console.log(`isRegistrate`);
        console.log(checkData._email);
        console.log(checkData._password);
        console.log(_model.length);
        for (let i = 0; i < _model.length; i++) {
            const temp = _model[i].getUser();
            console.log(_model[i]._email);
            console.log(_model[i]._password);

            console.log(temp._email);
            console.log(temp._password);

            if ( temp._email === checkData._email && temp._password === checkData._password) {
                return temp._name;
            }
        }
        return false;
    };
}



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




