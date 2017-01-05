import { Body, Content, Sidebar } from '../../common/AppComponents';

import AppInterceptor from '../../app-interceptor/AppInterceptor';
import Intercept from '../../common-view/js/Intercept';
import { Links } from './components/Components';
import React from 'react';
import { connect } from 'react-redux';

export default class AppSettings extends React.Component {
    componentWillMount() {
        this.links = [{
            faIcon: 'fa fa-book fa-fw fa-lg',
            label: 'Categories',
            path: '/settings/categories',
            createsNew: true,
            createPath: '/settings/categories/new'
        }];
    }
    render() {
        return (
            <Intercept load={AppInterceptor}>
                <Body className={'app-settings'}>
                    <Sidebar>
                        <Links links={this.links} />
                    </Sidebar>
                    <Content>
                        {this.props.controls}
                        {this.props.settingsBody}
                    </Content>
                </Body>
            </Intercept>)
    }
}