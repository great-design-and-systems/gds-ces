import AppInterceptor from '../../app-interceptor/AppInterceptor';
import {View} from '../../common/AppComponents';
import React from 'react';
import { connect } from 'react-redux';

export default class AppContent extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            contentBody: nextProps.contentBody
        });
    }
    render() {
        let contentBody = this.state.contentBody;
        if (!contentBody) {
            contentBody = <div></div>
        }
        return (
            <View load={AppInterceptor}>
                {contentBody}
            </View>)
    }
}