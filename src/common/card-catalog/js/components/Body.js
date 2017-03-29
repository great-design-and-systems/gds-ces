import React from 'react';
import Header from './Header';
import Description from './Description';
export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (<div class="card-catalog">
            <Header marc={this.props.marc}/>
            <Description marc={this.props.marc}/>
        </div>)
    }
}