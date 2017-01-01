import AppInterceptor from '../../app-interceptor/AppInterceptor';
import CommonSidebar from '../../common-sidebar/js/CommonSidebar';
import Intercept from '../../common-view/js/Intercept';
import React from 'react';
import { connect } from 'react-redux';

export default class AppSettings extends React.Component {
    render() {
        return (
            <Intercept load={AppInterceptor}>
                <div class="expanded row">
                    <CommonSidebar>
                        <div>Hello</div>
                    </CommonSidebar>
                    <div class="columns large-9">
                    </div>
                </div>
            </Intercept>)

    }
}