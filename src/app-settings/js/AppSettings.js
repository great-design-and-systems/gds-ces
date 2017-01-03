import { Body, Sidebar } from '../../common/AppComponents';

import AppInterceptor from '../../app-interceptor/AppInterceptor';
import Intercept from '../../common-view/js/Intercept';
import { Links } from './components/Components';
import React from 'react';
import { connect } from 'react-redux';

export default class AppSettings extends React.Component {
    render() {
        return (
            <Intercept load={AppInterceptor}>
                <Body>
                    <Sidebar>
                        <Links />
                    </Sidebar>
                    <div class="column">
                    </div>
                </Body>
            </Intercept>)
    }
}