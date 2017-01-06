import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import {View} from '../../../common/AppComponents';
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
            <View load={AppInterceptor}>
                <li><input type="text" onChange={this.handleOnChange.bind(this)} placeholder="Search settings" /></li>
            </View>);
    }
}