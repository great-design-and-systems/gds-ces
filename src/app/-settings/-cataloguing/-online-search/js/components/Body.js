import React from 'react';
import {browserHistory} from 'react-router';
import SearchBar from './SearchBar';
export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //  browserHistory.push('/settings/cataloguing/manual_entry/basic');
    }

    render() {
        return (<div class="online-search body">
            <div class="row header expanded">
                <h5 class="header-title">Online Search</h5>
                <div class="column"></div>
            </div>
            <SearchBar />
            {this.props.searchContent}
        </div>)
    }
}