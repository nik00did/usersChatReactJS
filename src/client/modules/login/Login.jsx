import React, { Component } from 'react';
import Platform from '../platform/Platform.jsx';
import './style.less';

export default class Login extends Component {
    state = {
        isPlatformPage: false,
        activeState: 'signIn',
    };

    sighInRef = React.createRef();
    sighUpRef = React.createRef();

    componentDidUpdate() {
        const { activeState, isPlatformPage } = this.state;

        if (!isPlatformPage) {
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
    }

    getLogInBody = () => {
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

    handleSubmit = isPlatformPage => {
        this.setState(state => ({
            ...state,
            isPlatformPage,
        }));
    };

    getPlatformPage = () => {
        return (
            <Platform/>
        );
    };

    getSignUpPage = () => {
        return (
            <div>
                SIGN UP
                <div>
                    Hello!
                </div>
            </div>
        );
    };

    getSignInPage = () => {
        return (
           <div>
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
                   <button
                       onClick={ () => this.handleSubmit(!this.state.isPlatformPage) }
                       className='button'>
                       Submit
                   </button>
               </div>
           </div>
        );
    };

    getLogInPage = () => {
        return (
            <div className='wrapper__wrapper-form wrapper-form'>
                <div className='wrapper-form__buttons-container buttons-container'>
                    <button ref = {this.sighInRef}
                            onClick = {() => this.handleSignButton('signIn')}
                            className='button active'>
                        Sign In
                    </button>
                    <button ref = {this.sighUpRef}
                            onClick = {() => this.handleSignButton('signUp')}
                            className='button'>
                        Sign Up
                    </button>
                </div>
                { this.getLogInBody() }
            </div>
        );
    };

    render() {
        return this.state.isPlatformPage ? this.getPlatformPage() : this.getLogInPage();
    }
}