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
            <div className='logIn-page__field'>
                <div className='logIn-page__input-data'>
                    <div className='logIn-page__input-data_data'>
                        <span >Name</span>
                        <input placeholder='Name' type='text'/>
                    </div>
                    <div className='logIn-page__input-data_data'>
                        <span >Email</span>
                        <input placeholder='Email' type='email'/>
                    </div>
                    <div className='logIn-page__input-data_data'>
                        <span >Password</span>
                        <input placeholder='Password' type='password'/>
                    </div>
                    <div className='logIn-page__input-data_data'>
                        <span>Config</span>
                        <input placeholder='Config' type='password'/>
                    </div>
                </div>
                <div className='logIn-page__button'>
                    <button
                        onClick={ () => this.handleSubmit(!this.state.isPlatformPage) }
                        className='button'>
                        Submit
                    </button>
                </div>
            </div>
        );
    };

    getSignInPage = () => {
        return (
           <div className='logIn-page__field'>
               <div className='logIn-page__input-data'>
                   <div className='logIn-page__input-data_data'>
                       <span>Email</span>
                       <input placeholder='Email' type='email'/>
                   </div>
                   <div className='logIn-page__input-data_data'>
                       <span>Password</span>
                       <input placeholder='Password' type='password'/>
                   </div>
               </div>
               <div className='logIn-page__button'>
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
            <div className='logIn-page'>
                <div className='logIn-page__controller'>
                    <button ref = {this.sighInRef}
                            onClick = {() => this.handleSignButton('signIn')}
                            className='button button_logIn active'>
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