import { Body, Content, Sidebar, View } from '../../common/AppComponents';

import AppInterceptor from '../../app-interceptor/AppInterceptor';
import React from 'react';

export default class AppHome extends React.Component {
    render() {
        return (<View load={AppInterceptor}>
            <Body id="homeBody">
                <Content>
                    {this.props.homeBody}
                </Content>
            </Body>
        </View>)
    }
}