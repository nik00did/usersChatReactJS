import React, { Component } from 'react';
import Login from '../login/Login.jsx';
import Table from './table/Table.jsx';
import Chat from './chat/Chat.jsx';
// import '../login/style.less';
import './style.less';

export default class Platform extends Component {
    state = {
        isPlatformPage: true,
        activeState: 'users',
    };

    usersTableRef = React.createRef();
    chatRef = React.createRef();

    componentDidUpdate() {
        const { activeState, isPlatformPage } = this.state;

        if (isPlatformPage) {
            if (this.usersTableRef.current && activeState === 'users') {
                this.usersTableRef.current.classList.add('active');
            } else {
                this.usersTableRef.current.classList.remove('active');
            }

            if (this.chatRef.current && activeState === 'chat') {
                this.chatRef.current.classList.add('active');
            } else {
                this.chatRef.current.classList.remove('active');
            }
        }
    }

    getBody = () => {
        const { activeState } = this.state;

        switch (activeState) {
            case 'users':
                return this.getUsersTablePage();
            case 'chat':
                return this.getChatPage();
            default:
                return null;
        }
    };

    getUsersTablePage = () => {
        return (
            <Table/>
        );
    };

    getChatPage = () => {
        return (
            <Chat/>
        );
    };

    handleController = activeState => {
        this.setState(state => ({
            ...state,
            activeState,
        }));
    };

    handleLogOut = isPlatformPage => {
        this.setState(state => ({
            ...state,
            isPlatformPage,
        }));
    };

    getPlatformPage = () => {
        return (
            <div className='platform'>
                <div className='platform__header'>
                    <div className='platform__header-title'>
                        <p>Name</p>
                        <p>Email</p>
                    </div>
                    <button
                        onClick={ () => this.handleLogOut(!this.state.isPlatformPage)}
                        className='button'>
                        Log out
                    </button>
                </div>
                <div className='platform__main'>
                    <aside className='platform__main_controller'>
                        <button ref={ this.usersTableRef }
                                onClick={ () => this.handleController('users')}
                                className='button'>
                            Users
                        </button>
                        <button ref={ this.chatRef }
                                onClick={ () => this.handleController('chat')}
                                className='button'>
                            Chat
                        </button>
                    </aside>
                    { this.getBody() }
                </div>
            </div>
        );
    };

    getLogInPage = () => {
        return (
            <Login/>
        );
    };

    render() {
        return this.state.isPlatformPage ? this.getPlatformPage() : this.getLogInPage();
    }
}