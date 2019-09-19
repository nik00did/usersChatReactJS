import React, { Component } from 'react';
import '../style.less';

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container container_right'>
                <div className='message message_flex-right'>
                    <div className='message__owner'>{this.props.owner}</div>
                    <p className='message__content'>{this.props.content}</p>
                    <div className='message__date'>{this.props.date}</div>
                </div>
            </div>
        );
    }
}