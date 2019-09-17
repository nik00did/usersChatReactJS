function View() {
    this.page = 1;
    this.logIn = null;
    this.signIn = null;
    this.submitLogIn = null;
    this.submitSignIn = null;
    this.logOut = null;
    this.chat = null;
    this.users = null;
    this.send = null;
    this.passwordEnter = null;
    this.emailEnter = null;
    this.configPassword = null;
    this.name = null;
    this.chatBoard = null;


    this.getIdPage1 = () => {
        this.logIn = document.getElementById('logIn');
        this.signIn = document.getElementById('signIn');
        this.submitLogIn = document.getElementById('submitLogIn');
        this.passwordEnter = document.getElementById('password');
        this.emailEnter = document.getElementById('email');
    };

    this.getIdPage2 = () => {
        this.logOut = document.getElementById('logOut');
        this.users = document.getElementById('users');
        this.chat = document.getElementById('chat');
    };

    this.getIdPage3 = () => {
        this.logOut = document.getElementById('logOut');
        this.users = document.getElementById('users');
        this.chat = document.getElementById('chat');
        this.send = document.getElementById('send');
    };

    this.getIdPage4 = () => {
        this.logIn = document.getElementById('logIn');
        this.signIn = document.getElementById('signIn');
        this.submitSignIn = document.getElementById('submitSignIn');
        this.configPassword = document.getElementById('configPassword');
        this.name = document.getElementById('name');
    };
}
