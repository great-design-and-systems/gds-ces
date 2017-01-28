import AppInterceptor from '../../app-interceptor/AppInterceptor';
import React from 'react';
import { View } from '../../common/AppComponents';

export default class AppContent extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.componentWillReceiveProps(this.props);
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