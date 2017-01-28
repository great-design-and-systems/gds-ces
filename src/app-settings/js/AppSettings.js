import { Body, Content, Sidebar, View } from '../../common/AppComponents';

import AppInterceptor from '../../app-interceptor/AppInterceptor';
import React from 'react';
import { Sticky } from 'react-sticky';
import { connect } from 'react-redux';

export default class AppSettings extends React.Component {
    render() {
        return (
            <View load={AppInterceptor}>
                <Body className={'app-settings'}>
                    <Content>
                        <h3 class="content-title">Settings <i class="fa fa-gears fa-fw fa-lg" /></h3>
                        {this.props.controls}
                        {this.props.settingsBody}
                    </Content>
                </Body>
            </View>)
    }
}