import React, { Component } from 'react';
import '../style.less';

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <div className='message message_flex-left'>
                    <div className='message__owner'>{this.props.owner}</div>
                    <p className='message__content'>{this.props.content}</p>
                    <div className='message__date'>{this.props.date}</div>
                </div>
            </div>
        );
    }
}