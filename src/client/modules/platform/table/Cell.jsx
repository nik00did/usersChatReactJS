import React, { Component } from 'react';
import './style.less';

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='cell'>
                <p>{this.props.children}</p>
            </div>
        );
    }
}