import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import CommonView from '../../../common-view/js/CommonView';
import IconGroup from './IconGroup';
import React from 'react';
import { wrapComponent } from '../../../common/AppUtils';

export default class IconGroups extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setIconGroupsState(this.props);
    }
    setIconGroupsState(nextProps) {
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
    componentWillReceiveProps(nextProps) {
        this.setIconGroupsState(nextProps);
    }
    render() {
        return (<CommonView load={AppInterceptor}>
            <div class="icon-groups">
                {this.state.groups}
            </div>
        </CommonView>)
    }
    componentWillUnmount() {
        this.setState({});
    }
}