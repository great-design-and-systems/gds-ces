import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import CommonView from '../../../common-view/js/CommonView';
import Icon from './Icon';
import React from 'react';
import { wrapComponent } from '../../../common/AppUtils';

export default class Icons extends React.Component {
    constructor() {
        super();
    }
    setIconsState(nextProps) {
        if (nextProps.icons) {
            const icons = [];
            nextProps.icons.forEach((icon, index) => {
                icons.push(wrapComponent('Icons', Icon)({
                    icon: icon,
                    key: (icon + '_' + index).hashCode(),
                    handleSelect: nextProps.handleSelect
                }));
            });
            this.setState({
                icons: icons
            });
        }

    }
    componentWillMount() {
        this.setIconsState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setIconsState(nextProps);
    }
    render() {
        return (<CommonView load={AppInterceptor}>
            <div class="icons row expanded">
                {this.state.icons}
            </div>
        </CommonView>)
    }
    componentWillUnmount() {
        this.setState({});
    }
}