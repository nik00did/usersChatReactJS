import React, { Component } from 'react';
import LeftMessage from './LeftMessage.jsx';
import RightMessage from './RightMessage.jsx';
import '../style.less';

export default class Window extends Component {
    state = {
        listMessage: [],
    };

    getOwner = () => {};

    getContent = () => {};

    getDate = () => {};

    render() {
        return (
            <div className='window'>
                <LeftMessage owner='owner' content='left' date='date'/>
                <RightMessage owner='owner' content='right' date='date'/>
                <LeftMessage owner='owner' content='left' date='date'/>
                <LeftMessage owner='owner' content='left' date='date'/>
                <RightMessage owner='owner' content='right' date='date'/>
            </div>
        );
    }
}