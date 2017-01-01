import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import Intercept from '../../../common-view/js/Intercept';
import React from 'react';
import { connect } from 'react-redux';

export default class SettingsSearchBar extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({});
    }
    handleOnChange(event) {
        this.setState({
            searchValue: event.target.value
        });
    }
    render() {
        return (
            <Intercept load={AppInterceptor}>
                <li><input type="text" onChange={this.handleOnChange.bind(this)} placeholder="Search settings" /></li>
            </Intercept>);
    }
}