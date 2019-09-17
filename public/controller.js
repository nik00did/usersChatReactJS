// import {SendToServer} from "./sendToServer.js";
// import {View} from "./view.js";
// import {Validator} from "./validator.js";

function Controller() {
    const view = new View();
    const sendData = new SendToServer();
    const model = new Model();
    // model._usersRegistrate.addUser(new User('Nikita', 'email@gmail.com', '123', 'online'));
    // model._usersRegistrate.addUser(new User('Stas', 'email1@gmail.com', '124', 'online'));
    const validator = new Validator(model._usersRegistrate);
    let style = null;
    let table = [];
    let requireVecMsg = true;
    let myName;
    let myEmail;


    this.init = () => {
        switch (view.page) {
            case 1:
                view.getIdPage1();
                view.logIn.style.background = '#6AABFA';
                view.signIn.onclick = clickSignIn;
                view.submitLogIn.onclick = clickSubmitLogIn;
                break;
            case 2:
                view.getIdPage2();
                view.logOut.onclick = clickLogOut;
                view.chat.onclick = clickChat;
                view.users.style.background = '#6AABFA';
                break;
            case 3:
                view.getIdPage3();
                view.logOut.onclick = clickLogOut;
                view.users.onclick = clickUsers;
                view.send.onclick = clickSend;
                break;
            case 4:
                view.getIdPage4();
                view.logIn.onclick = clickLogIn;
                view.submitSignIn.onclick = clickSubmitSignIn;
                break;
        }
    };

    const clickLogIn = () => {
        view.page = 1;
        drawPageLogIn();
        view.logIn.onclick = null;
        style = Object.create(view.logIn.style);
        view.logIn.style.background = '#6AABFA';
        view.signIn.style = Object.create(style);
        this.init();
    };

    const clickSignIn = () => {
        view.page = 4;
        drawPageSignIn();
        view.signIn.onclick = null;
        style = Object.create(view.signIn.style);
        view.signIn.style.background = '#6AABFA';
        view.logIn.style = Object.create(style);
        this.init();
    };

    const clickSubmitLogIn = () => {

        const password = view.passwordEnter.value;
        const email = view.emailEnter.value;
        let url = "/logIn";
        const data = {
            email: email,
            password: password
        };
        if (!validator.isValid(email, password)) {
            sendData.postRequest(url, data, (rez) => {
                console.log(`rez`);
                const rezObj = JSON.parse(rez);
                console.log(rezObj.rez);
                if (rezObj.rez !== 'bad_reg') {
                    view.page = 2;
                    drawAccountPage();
                    this.init();
                    sendData.postRequest("/getVectorUser", {x: 10}, data => {     // TODO через get запрос
                        console.log(`Вот списяк`);
                        console.log(data);
                        const dataObj = JSON.parse(data);
                        console.log(`dataObj`);
                        console.log(dataObj.length);
                        for (let i = 0; i < dataObj.length; i++) {
                            console.log(dataObj[i]._name);
                            console.log(dataObj[i]._email);
                            console.log(dataObj[i]._password);
                            model._usersRegistrate.addUser(new User(dataObj[i]._name, dataObj[i]._email, dataObj[i]._password));
                        }
                        myName = rezObj.rez;
                        myEmail = email;
                        initHeader(rezObj.rez, email);

                        fillTable();
                    })
                } else {
                    alert("Братан, да ты не зареган");
                }
            });
        } else {
            alert("Братан введи поля");
        }
    };

    const clickSubmitSignIn = () => {
        const password = view.passwordEnter.value;
        const email = view.emailEnter.value;
        const name = view.name.value;
        const configPassword = view.configPassword.value;
        let url = "/signIn";
        const data = {
            name: name,
            email: email,
            password: password,
            configPassword: configPassword
        };

        if (!validator.isValid(email, password) && !validator.isValidPassword(configPassword, password)) {
            sendData.postRequest(url, data, (rez) => {
                console.log(`rez`);
                console.log(rez);
                if (rez === `good_reg`) {
                    view.page = 1;
                    drawPageLogIn();
                    view.logIn.onclick = null;
                    style = Object.create(view.logIn.style);
                    view.logIn.style.background = '#6AABFA';
                    view.signIn.style = Object.create(style);
                    this.init();
                } else {
                    alert("Братан ты не зареган");
                }
            })
        } else {
            alert("Братан введи поля");
        }
    };

    const clickLogOut = () => {
        model.clearUsers();
        view.page = 1;
        logOut();
        this.init();
    };

    const clickChat = () => {
        view.page = 3;
        createChat(view.chatBoard);
        view.users.onclick = null;
        style = Object.create(view.chat.style);
        view.chat.style.background = '#6AABFA';
        view.users.style = Object.create(style);
        this.init();
        console.log(requireVecMsg);


        if (!requireVecMsg) {
            console.log('Старые сообщения которые уже в моделе загружаются');
            console.log(model.chatMsg._chat.length);
            console.log(model.chatMsg._chat);

            for (let i = 0; i < model.chatMsg._chat.length; i++) {
                console.log(model.chatMsg._chat[i]._owner, model.chatMsg._chat[i]._text, model.chatMsg._chat[i]._date);
                createMessage(model.chatMsg._chat[i]._owner, model.chatMsg._chat._text, model.chatMsg._chat._date);
                appendMsg(model.chatMsg._chat[i], view.chatBoard);
            }
            return;
        }
        console.log('Send to server req');
        sendData.postRequest("/getVectorMsg", {x: 'lox'}, vec => {
            console.log(`rez`);
            console.log(vec);
            console.log(`requireVecMsg!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
            console.log(requireVecMsg);
            requireVecMsg = false;

            if (vec) {
                const dataVec = JSON.parse(vec);
                console.log(dataVec);
                pushToModel(dataVec);
                console.log(`END for`);
            } else {
                alert("Не пришло Них....");
            }
        });

    };

    const pushToModel = function (dataVec) {
        for (let i = 0; i < dataVec.length; i++) {
            console.log("Уже в цикле");
            console.log(dataVec[i]._owner);
            console.log(dataVec[i]._date);
            console.log(dataVec[i]._text);
            let x = new Message(dataVec[i]._owner, dataVec[i]._date, dataVec[i]._text);
            console.log("Что кладем");
            console.log(x);
            model.chatMsg.addMessage(x);
            console.log('ВОТ ЧТО КЛАДЕТСЯ В БАЗУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУ');
            console.log('ВОТ ЧТО КЛАДЕТСЯ В БАЗУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУ');
            console.log('ВОТ ЧТО КЛАДЕТСЯ В БАЗУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУ');
            console.log('ВОТ ЧТО КЛАДЕТСЯ В БАЗУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУ');
            console.log('ВОТ ЧТО КЛАДЕТСЯ В БАЗУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУ');
            console.log(model.chatMsg.getChat());
            let msg = createMessage(dataVec[i]._owner, dataVec[i]._text, dataVec[i]._date);
            appendMsg(dataVec[i], view.chatBoard);
        }
    };

    const clickUsers = () => {
        view.page = 2;
        table = drawTable(view.chatBoard);
        view.chat.onclick = null;
        style = Object.create(view.users.style);
        view.users.style.background = '#6AABFA';
        view.chat.style = Object.create(style);
        this.init();
        fillTable();
        initHeader();
    };

    const clickSend = () => {
        const msgInput = document.getElementById('chat-input');

        let text = msgInput.value;
        console.log('Заходим в  postRequest')
        sendData.postRequest("/putMSG", {_owner: myName, _date: Date(), _text: text}, rez => {
            const rezObj = JSON.parse(rez);
            console.log(`rezObj`);
            console.log(rezObj);
            pushToModel(rezObj);
            console.log("ВОТ ЧТО МНЕ НАДО ВЫВЕСТИ НА МОЙ УСТАЛЫЙ ЭКРАН");
        });

    };

    const fillTable = () => {
        const tbody = document.getElementById('tbody');
        let tr;

        console.log(model.getUsersRegistrate());
        for (let i = 0; i < model._usersRegistrate.getUsers().length; i++) {
            tr = createRow('global__table_row', i + 1, model.getUsersRegistrate()[i].getUser()._name, model.getUsersRegistrate()[i].getUser()._email);
            tbody.append(tr);
        }
    };
};

new Controller().init();


