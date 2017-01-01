import AppInterceptor from '../../app-interceptor/AppInterceptor';
import Intercept from '../../common-view/js/Intercept';
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
            <Intercept load={AppInterceptor}>
                {contentBody}
            </Intercept>)
    }
}