import { Body, Content, Sidebar, View } from '../../common/AppComponents';

import AppInterceptor from '../../app-interceptor/AppInterceptor';
import React from 'react';

export default class AppHome extends React.Component {
    render() {
        return (<View load={AppInterceptor}>
            <Body id="homeBody">
                <Content>
                    <h1>Home</h1>
                    {this.props.homeContent}
                </Content>
            </Body>
        </View>)
    }
}