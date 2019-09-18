import React, { Component } from 'react';
import LeftMessage from './LeftMessage.jsx';
import RightMessage from './RightMessage.jsx';
import '../style.less';

export default class Chat extends Component {
    render() {
        return (
            <div className='window'>
                <LeftMessage/>
                <RightMessage/>
            </div>
        );
    }
}