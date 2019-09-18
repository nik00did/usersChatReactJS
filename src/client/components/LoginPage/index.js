import React, { Component } from 'react';
import './style.css';

export default class LoginPage extends Component {
    // componentDidMount() {
    //   // fetch('/api/getUsername')
    //   //     .then(res => res.json())
    //   //     .then(user => this.setState({ username: user.username }));
    // }
  
    render() {
      return (
          <div>
            <div className='id1 form'>
              <div className='button-up'>
                <button className='logIn button-up__item'>Log In</button>
                <button className='signIn button-up__item'>Sign In</button>
              </div>
            </div>
          </div>
      );
    }
  }