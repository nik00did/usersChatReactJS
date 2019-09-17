function drawPageLogIn() {
    document.getElementById('temp').remove();
    document.getElementById('NAME').remove();
    const submitLogIn = document.getElementById('submitSignIn');
    submitLogIn.setAttribute('id', 'submitLogIn');
}

function setButton(idAtr, classAtr, contentAtr) {
    const button = document.createElement('button');

    button.setAttribute('id', idAtr);
    button.setAttribute('class', classAtr);
    button.textContent = contentAtr;

    return button;
}

function setLabel(forArg, contentArg) {
    const label = document.createElement('label');

    label.setAttribute('for', forArg);
    label.textContent = contentArg;

    return label;
}

function createRow(classRow, number, name, email) {
    const tr = document.createElement('TR');
    tr.setAttribute('class', classRow);

    const tdNumber = document.createElement('td');
    tdNumber.setAttribute('class', 'global__table_first-cell');
    tdNumber.textContent = number; // '№';


    tr.append(tdNumber);

    const tdName = document.createElement('td');
    tdName.setAttribute('class', 'global__table_cell');
    tdName.textContent = name; //'Users';

    tr.append(tdName);

    const tdEmail = document.createElement('td');
    tdEmail.setAttribute('class', 'global__table_cell');
    tdEmail.textContent = email; //Email;

    tr.append(tdEmail);

    return tr;
}

function createTable() {
    const table = document.createElement('TABLE');
    table.setAttribute('class', 'global__table');

    const thead = document.createElement('THEAD');

    const tr = createRow('global__table_main-row', '№', 'Users', 'Email');

    thead.append(tr);

    table.append(thead);

    const tbody = document.createElement('TBODY');
    tbody.setAttribute('id', 'tbody');

    table.append(tbody);

    return [table, thead, tbody];
}

function createMessage(owner, text, date) {
    const messageBlock = document.createElement('div');

    messageBlock.setAttribute('class', 'messageBlock');

    const ownerBlock = document.createElement('div');

    ownerBlock.setAttribute('class', 'ownerBlock');
    ownerBlock.textContent = owner;

    messageBlock.append(ownerBlock);

    const dateBlock = document.createElement('div');

    dateBlock.setAttribute('class', 'dateBlock');
    dateBlock.textContent = date;

    messageBlock.append(dateBlock);

    const textBlock = document.createElement('div');

    textBlock.setAttribute('class', 'textBlock');
    textBlock.textContent = text;

    messageBlock.append(textBlock);

    return messageBlock;
}


function appendMsg(dataVec, chatBoard) {
    chatBoard = document.getElementById('chatWindow');
    let msg = createMessage(dataVec._owner, dataVec._text, dataVec._date);

    chatBoard.append(msg);
}

function createChat(chatBoard) {
    if (chatBoard === null)
        chatBoard = document.getElementById('main2');

    chatBoard.lastChild.remove();

    const chat = document.createElement('div');
    chat.setAttribute('class', 'global__chat');

    const chatWindow = document.createElement('div');
    chatWindow.setAttribute('class', 'global__chat_window');
    chatWindow.setAttribute('id', 'chatWindow');

    chat.append(chatWindow);

    const form = document.createElement('form');
    form.setAttribute('class', 'global__chat_form');

    const inputFieldMessage = document.createElement('input');
    inputFieldMessage.setAttribute('class', 'global__chat_form-input');
    inputFieldMessage.setAttribute('id', 'chat-input');
    inputFieldMessage.setAttribute('type', 'text');
    inputFieldMessage.setAttribute('placeholder', 'Write here...');

    form.append(inputFieldMessage);

    const inputSendButton = document.createElement('input');
    inputSendButton.setAttribute('class', 'button-up__item button-up__item_send');
    inputSendButton.setAttribute('type', 'button');
    inputSendButton.setAttribute('value', 'SEND');
    inputSendButton.setAttribute('id', 'send');

    form.append(inputSendButton);

    chat.append(form);

    chatBoard.append(chat);
}

function initHeader(name, email) {
    const headerName = document.getElementById("name_info");
    const headerEmail = document.getElementById("email_info");
    headerName.textContent = name;
    headerEmail.textContent = email;

}


function drawAccountPage() {
    const parent = document.getElementById("main");
    const child = document.getElementById("id1");

    parent.removeChild(child);

    const header = document.createElement('HEADER');
    header.setAttribute('class', 'global');

    const div = document.createElement('DIV');
    div.setAttribute('class', 'global__info global__info_position global__info_style');

    const pName = document.createElement('P');
    pName.setAttribute('id', 'name_info');

    const pEmail = document.createElement('P');
    pEmail.setAttribute('id', 'email_info');

    div.append(pName);
    div.append(pEmail);

    header.append(div);

    const button = setButton('logOut', 'button-up__item button-up__item_size button-up__item_size-header', 'LOG OUT');

    header.append(button);

    document.body.append(header);

    const main = document.createElement('MAIN');
    main.setAttribute('class', 'global');
    main.setAttribute('id', 'main2');

    const aside = document.createElement('ASIDE');
    aside.setAttribute('class', 'global__info global__info_position');

    const buttonAsideUsers = setButton('users', 'button-up__item button-up__item_size', 'Users');

    aside.append(buttonAsideUsers);

    const buttonAsideChat = setButton('chat', 'button-up__item button-up__item_size', 'Chat');

    aside.append(buttonAsideChat);

    main.append(aside);

    const table = createTable();

    main.append(table[0]);

    document.body.append(main);
}

function drawPage1Again() {
    const form = document.createElement('div');
    form.setAttribute('id', 'id1');
    form.setAttribute('class', 'form');

    const buttonUp = document.createElement('div');
    buttonUp.setAttribute('class', 'button-up');

    const logIn = setButton('logIn', 'button-up__item', 'Log In');
    const signIn = setButton('signIn', 'button-up__item', 'Sign In');

    buttonUp.append(logIn);
    buttonUp.append(signIn);

    form.append(buttonUp);

    const enterDataId = document.createElement('div');
    enterDataId.setAttribute('id', 'enterDataId');
    enterDataId.setAttribute('class', 'enter-data');

    const enterDataEmail = document.createElement('div');
    enterDataEmail.setAttribute('class', 'enter-data__item');

    const labelEmail = setLabel('email', 'Email');
    labelEmail.setAttribute('id', 'labelEmail');

    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'text');
    inputEmail.setAttribute('id', 'email');

    enterDataEmail.append(labelEmail);
    enterDataEmail.append(inputEmail);

    enterDataId.append(enterDataEmail);

    const enterDataPassword = document.createElement('div');
    enterDataPassword.setAttribute('class', 'enter-data__item');

    const labelPassword = setLabel('password', 'Password');

    const inputPassword = document.createElement('input');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('id', 'password');

    enterDataPassword.append(labelPassword);
    enterDataPassword.append(inputPassword);

    enterDataId.append(enterDataPassword);

    const input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', 'submitLogIn');
    input.setAttribute('class', 'button-up__item button-up__item_submit');
    input.setAttribute('value', 'SUBMIT');

    enterDataId.append(input);

    form.append(enterDataId);

    document.body.append(form);
}

function drawTable() {
    const main = document.getElementById('main2');

    main.lastChild.remove();

    const table = createTable();

    main.append(table[0]);
    console.log(`table[2]`);
    console.log(`table[2]`);
    console.log(`table[2]`);
    console.log(`table[2]`);
    console.log(`table[2]`);
    console.log(`table[2]`);
    console.log(table[2]);

    return table;
}

function logOut() {
    document.body.innerHTML = '';
    drawPage1Again();
}

function drawPageSignIn() {
    const name = document.createElement('div');
    name.setAttribute('class', 'enter-data__item');
    name.setAttribute('id', 'NAME');

    const labelName = setLabel('name', 'Name');

    name.append(labelName);

    const inputName = document.createElement('input');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('id', 'name');

    name.append(inputName);

    const enterDataId = document.getElementById('enterDataId');

    enterDataId.before(name);

    const child = document.createElement('DIV');
    child.classList = 'enter-data__item';
    child.setAttribute('id', 'temp');

    const label = setLabel('configPassword', 'Config password');

    child.appendChild(label);

    const input = document.createElement('input');
    input.setAttribute('type', 'password');
    input.setAttribute('id', 'configPassword');
    child.appendChild(input);

    const submitLogIn = document.getElementById('submitLogIn');
    submitLogIn.before(child);
    submitLogIn.setAttribute('id', 'submitSignIn');
}

function loading(id_circle, width_block, width_circle) {
    const circle = document.getElementById(id_circle);
    const widthBlock = width_block;
    const widthCircle = width_circle;
    let startX = id_circle === 'circle1' || id_circle === 'circle3' ? 75 : id_circle === 'circle2' ? 150 : 0;
    let startY = id_circle === 'circle2' || id_circle === 'circle4' ? 75 : id_circle === 'circle3' ? 150 : 0;
    let x = startX, y = startY;
    let goRightX = id_circle === 'circle1' || id_circle === 'circle4';
    let goBottomY = id_circle === 'circle1' || id_circle === 'circle2';

    const move = () => {
        if (goRightX && goBottomY) {
            if (x < widthBlock - widthCircle && y < (widthBlock - widthCircle) / 2) {
                x++;
                y++;
            } else {
                if (x >= widthBlock - widthCircle) {
                    goRightX = !goRightX;
                }
            }
        } else if (!goRightX && !goBottomY) {
            if (x > 0 && y > (widthBlock - widthCircle) / 2) {
                x--;
                y--;
            } else {
                if (x <= 0) {
                    goRightX = !goRightX;
                }
            }
        } else if (goRightX && !goBottomY) {
            if (y > 0) {
                x++;
                y--;
            } else {
                if (y <= 0) {
                    goBottomY = !goBottomY;
                }
            }
        } else if (!goRightX && goBottomY) {
            if (x > (widthBlock - widthCircle) / 2) {
                x--;
                y++;
            } else {
                if (y >= (widthBlock - widthCircle) / 2) {
                    goBottomY = !goBottomY;
                }
            }
        }

        circle.style.transform = `translate(${x - startX}px, ${y - startY}px)`;
        window.requestAnimationFrame(move);
    };

    window.requestAnimationFrame(move);
}