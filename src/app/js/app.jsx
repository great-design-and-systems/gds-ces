import '../css/app.scss';

import { Api } from '../../api/ApiService';
import AppStores from '../../common/AppStores';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<div> Hello friends!</div>)
    }
}

new Api().init('http://localhost:3005/gds', err => {
    AppStores.dispatch({
        type: '{Students.getStudents}',
        payload: {
            query: { limit: 100 }
        }
    })
    if (!err) {
        ReactDOM.render(<Provider store={AppStores}><App /></Provider>, document.getElementsByTagName('app')[0]);
    }
    else {
        console.error(err);
    }
});


