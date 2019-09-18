import React, { Component } from 'react';
import '../style.less';

export default class Chat extends Component {
    render() {
        return (
            <div className='container container_flex-left'>
                <div className='message '>
                    <div className='message__owner'>Owner</div>
                    <p className='message__content'>My text</p>
                    <div className='message__date'>Date</div>
                </div>
            </div>
        );
    }
}