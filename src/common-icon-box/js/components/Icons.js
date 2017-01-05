import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import Icon from './Icon';
import Intercept from '../../../common-view/js/Intercept';
import React from 'react';
import { wrapComponent } from '../../../common/AppUtils';

export default class Icons extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
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
    render() {
        return (<Intercept load={AppInterceptor}>
            <div class="icons row expanded">
                {this.state.icons}
            </div>
        </Intercept>)
    }
}