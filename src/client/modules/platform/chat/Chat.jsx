import React, { Component } from 'react';
import Window from './Window.jsx';
import '../style.less';

export default class Chat extends Component {
    render() {
        return (
            <div className='chat'>
                <Window/>
                <div className='chat__controller'>
                    <input type='text' placeholder='Write here ...'/>
                    <div>Emoji</div>
                    <button className='button'>Send</button>
                </div>
            </div>
        );
    }
}