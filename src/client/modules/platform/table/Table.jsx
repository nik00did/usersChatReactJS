import React, { Component } from 'react';
import Row from './Row.jsx';
import './style.less';
// import data from '../../model.js';

let array = [
    {
        name: 'Nikita',
        email: '1111111111111',
    },
    {
        name: 'Stas',
        email: '222222222222',
    },
    {
        name: 'Sasha',
        email: '333333333333',
    },
    {
        name: 'Jafar',
        email: '444444444444',
    },
    {
        name: 'Kostya',
        email: '555555555555555555',
    },
];

export default class Table extends Component {
    state = {
        listUsers: array,
    };

    // addItem = value => {
    //     //     const { lists } = this.state;
    //     //
    //     //     lists.push(value);
    //     //
    //     //     this.setState(state => ({
    //     //         ...state,
    //     //         lists,
    //     //     }));
    //     // };
    //
    // setListUsers = listUsers => {
    //     this.setState(state => ({
    //         ...state,
    //         listUsers,
    //     }));
    // };

    getBody = () => {
        //this.setListUsers(array);

        const { listUsers } = this.state;
        let i = 0;

        return listUsers.map((user) => (
            <Row row='row' key={i++} number={i} name={user.name} email={user.email}/>
        ));
    };

    render() {
        return (
            <div className='table'>
                <Row row='main-row' number='##' name='!!!Name' email='!!!Email'/>
                { this.getBody() }
            </div>
        );
    }
}