import React, { Component } from 'react';
import Cell from './Cell.jsx';
import './style.less';

export default class Table extends Component {
    render() {
        return (
            <div className={this.props.row}>
                <Cell children={'№'}/>
                <Cell children={'Name'}/>
                <Cell children={'Email'}/>
            </div>
        );
    }
}