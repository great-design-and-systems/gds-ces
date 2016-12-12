import '../css/app.scss';
import React from 'react';

class App extends React.Component {
    constructor() { super(); }
    render() {
        return <div>Hello friends!</div>
    }
}


React.render(<App />, document.getElementsByTagName('body')[0]);