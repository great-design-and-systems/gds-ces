import AppInterceptor from '../../app-interceptor/AppInterceptor';
import CommonView from '../../common-view/js/CommonView';
import React from 'react';

export default class CommonContent extends React.Component {
    render() {
        let className = 'common-content column';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (
            <CommonView load={AppInterceptor}>
                <div className={className}>
                    {this.props.children}
                </div>
            </CommonView>
        );
    }
}
