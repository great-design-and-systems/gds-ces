import AppInterceptor from '../../app-interceptor/AppInterceptor';
import Intercept from '../../common-view/js/Intercept';
import React from 'react';

export default class CommonContent extends React.Component {
    render() {
        let className = 'common-content column';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (
            <Intercept load={AppInterceptor}>
                <div className={className}>
                    {this.props.children}
                </div>
            </Intercept>
        );
    }
}
