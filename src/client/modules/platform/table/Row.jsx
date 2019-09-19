import React, { Component } from 'react';
import Cell from './Cell.jsx';
import './style.less';

export default class Row extends Component {
    render() {
        return (
            <div className={this.props.row}>
                <Cell child={this.props.number}/>
                <Cell child={this.props.name}/>
                <Cell child={this.props.email}/>
            </div>
        );
    }
}