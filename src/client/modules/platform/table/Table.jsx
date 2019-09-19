import React, { Component } from 'react';
import Row from './Row.jsx';
import './style.less';

export default class Table extends Component {
    render() {
        return (
            <div className='table'>
                <Row row='main-row'/>
                <Row row='row'/>
                <Row row='row'/>
                
            </div>
        );
    }
}