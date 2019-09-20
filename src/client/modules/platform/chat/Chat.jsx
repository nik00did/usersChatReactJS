import React, { Component } from 'react';
import Window from './Window.jsx';
import '../style.less';

export default class Chat extends Component {
    render() {
        return (
            <div className='chat'>
                <Window/>
                <div className='chat__controller'>
                    <input className='chat__controller_input' type='text' placeholder='Write here ...'/>
                    <button className='button chat__controller_emoji'>(*_*)</button>
                    <button className='button chat__controller_button'>Send</button>
                </div>
            </div>
        );
    }
}