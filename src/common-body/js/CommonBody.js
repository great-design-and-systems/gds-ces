import AppInterceptor from '../../app-interceptor/AppInterceptor';
import Intercept from '../../common-view/js/Intercept';
import React from 'react';

export default class CommonBody extends React.Component {
    render() {
        return (
            <Intercept load={AppInterceptor}>
                <div class="common-body row expanded">
                    {this.props.children}
                </div>
            </Intercept>
        );
    }
}
