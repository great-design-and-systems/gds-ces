import '../css/app.scss';
import React from 'react';
import {Api} from '../../common/ApiService';

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return <div>Hello friends!</div>
    }
}

new Api().init('/api.json', err => {
    if (!err) {
        React.render(<App />, document.getElementsByTagName('body')[0]);
    }
    else {
        console.error(err);
    }
});


