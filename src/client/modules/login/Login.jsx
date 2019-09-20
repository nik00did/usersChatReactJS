import React, {Component} from 'react';
import Platform from '../platform/Platform.jsx';
import './style.less';

export default class Login extends Component {


    // getRequest = (url, data) => {
    //
    //     const body = JSON.stringify(data);
    //     console.log(`this is body`);
    //     console.log(body);
    //     this.xhr.open(get, url, true);
    //     this.xhr.send(null);
    //
    //     this.xhr.onload = function () {
    //         if ( this.xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    //             console.log(`Ошибка ${ this.xhr.status}: ${ this.xhr.statusText}`);
    //             // alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    //         } else { // если всё прошло гладко, выводим результат
    //             console.log(`Готово, получили ${ this.xhr.response.length} байт`); // response -- это ответ сервера
    //             // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
    //         }
    //     };
    //
    //     this.xhr.onprogress = function (event) {
    //         if (event.lengthComputable) {
    //             console.log(`Получено ${event.loaded} из ${event.total} байт`);
    //             // alert(`Получено ${event.loaded} из ${event.total} байт`);
    //             console.log(`Получено ${ this.xhr.response} `);
    //             // alert(`Получено ${xhr.response} `);
    //
    //         } else {
    //             console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
    //             // alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
    //         }
    //     };
    //
    //     this.xhr.onerror = function () {
    //         console.log("Запрос не удался");
    //         // alert("Запрос не удался");
    //     };
    //
    // }


    state = {
        isPlatformPage: false,
        activeState: 'signIn',
        // xhr: new XMLHttpRequest()
    };

    sighInRef = React.createRef();
    sighUpRef = React.createRef();

    // componentDidMount() {
    //     this.connect();
    // }
    //
    // timeout = 250;
    //
    // connect = () => {
    //     let ws = new WebSocket("ws://localhost:3000/ws");
    //     let that = this; // cache the this
    //     let connectInterval;
    //     let clients = [];
    //
    //     // websocket onopen event listener
    //     ws.onopen = () => {
    //         console.log("connected websocket main component");
    //         clients.push(ws);
    //
    //         this.setState({ws: ws});
    //
    //         that.timeout = 250; // reset timer to 250 on open of websocket connection
    //         clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    //     };
    //
    //     ws.onclose = (e) => {
    //
    //         const index = clients.indexOf(ws);
    //         console.log(clients);
    //
    //         if (index > -1) {
    //             console.log('delete client');
    //             clients.splice(index, 1);
    //         }
    //         console.log('client is close');
    //         console.log('index');
    //         console.log(index);
    //     }
    //     console.log(
    //         `Socket is closed. Reconnect will be attempted in ${Math.min(
    //             10000 / 1000,
    //             (that.timeout + that.timeout) / 1000
    //         )} second.`,
    //         e.reason
    //     );
    //
    //     check = () => {
    //         const {ws} = this.state;
    //         if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    //     };
    //
    //
    // }
    //
    //


    componentDidUpdate() {
        const { activeState, isPlatformPage } = this.state;

        if (!isPlatformPage) {
            if (this.sighInRef.current && activeState === 'signIn') {
                this.sighInRef.current.classList.add('active');
            } else {
                this.sighInRef.current.classList.remove('active');
            }

            if (this.sighUpRef.current && activeState === 'signUp') {
                this.sighUpRef.current.classList.add('active');
            } else {
                this.sighUpRef.current.classList.remove('active');
            }
        }
    }

    getLogInBody = () => {
        const { activeState } = this.state;

        switch (activeState) {
            case 'signIn':
                return this.getSignInPage();
            case 'signUp':
                return this.getSignUpPage();
            default:
                return null;
        }
    };

    handleSignButton = activeState => {
        this.setState(state => ({
            ...state,
            activeState,
        }));
    };

    handleSubmit = isPlatformPage => {
        this.setState(state => ({
            ...state,
            isPlatformPage,
        }));
    };

    getPlatformPage = () => {
        return (
            <Platform websocket={this.state.xhr}/>
        );
    };

    getSignUpPage = () => {
        return (
            <div className='logIn-page__field'>
                <div className='logIn-page__input-data'>
                    <div className='logIn-page__input-data_data'>
                        <span>Name</span>
                        <input placeholder='Name' type='text'/>
                    </div>
                    <div className='logIn-page__input-data_data'>
                        <span>Email</span>
                        <input placeholder='Email' type='email'/>
                    </div>
                    <div className='logIn-page__input-data_data'>
                        <span>Password</span>
                        <input placeholder='Password' type='password'/>
                    </div>
                    <div className='logIn-page__input-data_data'>
                        <span>Config</span>
                        <input placeholder='Config' type='password'/>
                    </div>
                </div>
                <div className='logIn-page__button'>
                    <button
                        onClick={() => this.handleSignButton('signIn')}
                        className='button'>
                        Submit
                    </button>
                </div>
            </div>
        );
    };

    getSignInPage = () => {
        return (
            <div className='logIn-page__field'>
                <div className='logIn-page__input-data'>
                    <div className='logIn-page__input-data_data'>
                        <span>Email</span>
                        <input placeholder='Email' type='email'/>
                    </div>
                    <div className='logIn-page__input-data_data'>
                        <span>Password</span>
                        <input placeholder='Password' type='password'/>
                    </div>
                </div>
                <div className='logIn-page__button'>
                    <button
                        onClick={() => this.handleSubmit(!this.state.isPlatformPage)}
                        className='button'>
                        Submit
                    </button>
                </div>
            </div>
        );
    };

    getLogInPage = () => {
        return (
            <div className='logIn-page'>
                <div className='logIn-page__controller'>
                    <button ref={this.sighInRef}
                            onClick={() => this.handleSignButton('signIn')}
                            className='button button_logIn active'>
                        Log In
                    </button>
                    <button ref={this.sighUpRef}
                            onClick={() => this.handleSignButton('signUp')}
                            className='button'>
                        Sign Up
                    </button>
                </div>
                {this.getLogInBody()}
            </div>
        );
    };

    render() {
        return this.state.isPlatformPage ? this.getPlatformPage() : this.getLogInPage();
    }
}