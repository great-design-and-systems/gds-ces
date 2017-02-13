import { Body, Content, Sidebar, View } from '../../../../common/AppComponents';

import AppInterceptor from '../../../-interceptor/AppInterceptor';
import { Link } from 'react-router';
import React from 'react';
import { Sticky } from 'react-sticky';
import { connect } from 'react-redux';

export default class Settings extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View load={AppInterceptor}>
                <Body className={'app-settings'}>
                    <h3 class="body-title">Settings <Link title={'Go to home'} to={'/home'}><i class="fa fa-home fa-fw fa-lg" /></Link> <i class="fa fa-gears fa-fw fa-lg active" /></h3>
                    <Content>
                        {this.props.controls}
                        {this.props.settingsBody}
                    </Content>
                </Body>
            </View>)
    }
}