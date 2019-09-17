const val = require("./validator.js");
const mod = require("./model.js");
let express = require("express");
let bodyParse = require("body-parser");
let fs = require("fs");
const urlencodedParser = bodyParse.json();

const db = require('./db/mongo.js');

const dataBase = new db.Mongo();
dataBase._users.init();
dataBase._messages.init();

let model = new mod.Model();
let validator = new val.Validator(model._usersRegistrate.getUsers());
const app = express();

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

    const newUser = new mod.User(data.name, data.email, data.password);

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
        dataBase._users.insert(model._usersRegistrate.getUsersLast());
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
    let x = new mod.Message('Name_Gena', 'THIS_DAY', 'Some_TEXT');
    model.chatMsg.addMessage(x);
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
    model.chatMsg.addMessage(new mod.Message(data._owner, data._date, data._text));
    console.log('Return CHATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
    console.log(model.chatMsg.getChat());
    res.send([data]);
});


app.use(express.static("./public"));

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});

