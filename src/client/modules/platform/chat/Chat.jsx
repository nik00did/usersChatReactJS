import React, { Component } from 'react';
import Window from './Window.jsx';
import '../style.less';
import LocalStorage from '../../LocalStorage/LocalStorage';
export default class Chat extends Component {

    sendClick = (mes) => {
        if (mes === null || mes === '') {
            return;
        }
        let messages = JSON.parse(getLocalStorage('messages'));
        setLocalStorage('messages', JSON.stringify(messages.push(mes)));
    };

    render() {
        return (
            <div className='chat'>
                <Window/>
                <div className='chat__controller'>
                    <input className='chat__controller_input' type='text' placeholder='Write here ...'/>
                    <button className='button chat__controller_emoji'>(*_*)</button>
                    <button onClick={this.sendClick} className='button chat__controller_button'>Send</button>
                </div>
            </div>
        );
    }
}