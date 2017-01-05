import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import IconGroup from './IconGroup';
import Intercept from '../../../common-view/js/Intercept';
import React from 'react';
import { wrapComponent } from '../../../common/AppUtils';

export default class IconGroups extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.iconGroups) {
            const groups = [];
            nextProps.iconGroups.forEach(group => {
                groups.push(wrapComponent('IconGroups', IconGroup)({
                    key: group.group,
                    group: group.group,
                    icons: group.icons,
                    handleSelect: nextProps.handleSelect
                }));
            });
            this.setState({
                groups: groups
            });
        }
    }
    render() {
        return (<Intercept load={AppInterceptor}>
            <div class="icon-groups">
                {this.state.groups}
            </div>
        </Intercept>)
    }
}