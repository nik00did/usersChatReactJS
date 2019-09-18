import React, { Component } from 'react';

export default class Login extends Component {
    state = {
        activeState: 'signIn',
    };

    sighInRef = React.createRef();
    sighUpRef = React.createRef();

    componentDidUpdate() {
        const { activeState } = this.state;

        if (this.sighInRef.current && activeState === 'signIn') {
            this.sighInRef.current.classList.add('active');
        } else {
            this.sighInRef.current.classList.remove('active');
        }

        if (this.sighUpRef.current && activeState === 'signUp') {
            this.sighUpRef.current.classList.add('active');
        } else {
            this.sighUpRef.current.classList.remove('active');
        }
    }

    getBody = () => {
        const { activeState } = this.state;

        switch (activeState) {
            case 'signIn':
                return this.getSignInPage();
            case 'signUp':
                return this.getSignUpPage();
            default:
                return null;
        }
    };

    handleSignButton = activeState => {
        this.setState(state => ({
            ...state,
            activeState,
        }));
    };

    getSignUpPage = () => {
        return (
            <div> SIGN UP </div>
        );
    };

    getSignInPage = () => {
        return (
           <>
               <div className='wrapper-form__fields-container fields-container'>
                   <div className='fields-container__field field'>
                       <span className='field__span'>Email</span>
                       <input className='field__input' placeholder='Email'/>
                   </div>
                   <div className='fields-container__field field'>
                       <span className='field__span'>Password</span>
                       <input className='field__input' placeholder='Password'/>
                   </div>
               </div>
               <div className='wrapper-form__submit-container submit-container'>
                   <button className='submit-container__button'> Submit </button>
               </div>
           </>
        );
    };

    render() {
        return (
            <div className='wrapper__wrapper-form wrapper-form'>
                <div className='wrapper-form__buttons-container buttons-container'>
                    <button ref = {this.sighInRef}
                            onClick = {() => this.handleSignButton('signIn')}
                            className='buttons-container__button active'>
                        Sign In
                    </button>
                    <button ref = {this.sighUpRef}
                            onClick = {() => this.handleSignButton('signUp')}
                            className='buttons-container__button'>
                        Sign Up
                    </button>
                </div>
                { this.getBody() }
            </div>
        );
    }
}