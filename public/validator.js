function Validator(model) {

    const _model = model;

    this.isValid = (email, pass) => {
        if (check(email) || check(email))
            return true;
    };

    const check = (value) => {
        if (value === "" || value === undefined || value === null)
            return true;
    };

    this.isValidPassword = (pass, configPass) => {
        return !(pass === configPass);
    };


    this.isRegistrate = function(checkUser){
        for (let i = 0; i < _model.length; i++) {
            const temp = _model[i].getUsers().getUser();
            console.log(temp.name);
            console.log(temp.email);
            console.log(temp.password);
            console.log(temp.onLine);
            if (temp.name === checkUser.name && temp.email === checkUser.email
                && temp.password === checkUser.password && temp.onLine === checkUser.onLine) {
                return true;
            }
        }
        return false;
    }

}


