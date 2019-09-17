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

module.exports = {Validator};
