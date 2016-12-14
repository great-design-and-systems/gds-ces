import '../css/app.scss';

import { Api } from '../../common/ApiService';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return <div>Hello friends!</div>
    }
}

new Api().init('https://demo-gds-api.herokuapp.com/gds', err => {
    if (!err) {
        ReactDOM.render(<App />, document.getElementsByTagName('app')[0]);
    }
    else {
        console.error(err);
    }
});


