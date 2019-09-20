import React, { Component } from 'react';
import Login from './modules/login/Login.jsx';
import Platform from './modules/platform/Platform.jsx';
import './styles.less';

export default class App extends Component {
    state = {
        activePage: 'login',
    };

    getBody = () => {
        // const { activePage } = this.state;
        //
        // switch (activePage) {
        //     case 'login':
                return <Login/>;
        //     case 'platform':
        //         return <Platform/>;
        //     default:
        //         return null;
        // }
    };

    render() {
        return (
            <div className='wrapper'>
                { this.getBody() }
            </div>
        );
    }
}