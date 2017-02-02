import { Body, Content, Sidebar, View } from '../../../common/AppComponents';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import React from 'react';
import { Sticky } from 'react-sticky';
import { connect } from 'react-redux';

export default class Settings extends React.Component {
    render() {
        return (
            <View load={AppInterceptor}>
                <Body className={'app-settings'}>
                    <h3 class="body-title">Settings <i class="fa fa-gears fa-fw fa-lg" /></h3>
                    <Content>
                        {this.props.controls}
                        {this.props.settingsBody}
                    </Content>
                </Body>
            </View>)
    }
}