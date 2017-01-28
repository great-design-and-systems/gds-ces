import { Body, Content, Sidebar, View } from '../../common/AppComponents';

import AppInterceptor from '../../app-interceptor/AppInterceptor';
import React from 'react';
import { wrapComponent } from '../../common/AppUtils';

export default class AppHome extends React.Component {
    render() {
        return (<View load={AppInterceptor}>
            <Body id="homeBody">
                <Content>
                    <h3 class="content-title"><i class='fa fa-home fa-fw fa-lg' /></h3>
                    {this.props.homeContent}
                </Content>
            </Body>
        </View>)
    }
}