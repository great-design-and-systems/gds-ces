import AppInterceptor from '../../app-interceptor/AppInterceptor';
import CommonView from '../../common-view/js/CommonView';
import FullScreen from 'react-fullscreen';
import React from 'react';

export default class CommonBody extends React.Component {
    render() {
        let className = 'common-body row expanded';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (
            <CommonView load={AppInterceptor}>
                <div id={this.props.id} className={className}>
                    {this.props.children}
                </div>
            </CommonView>
        );
    }
}
