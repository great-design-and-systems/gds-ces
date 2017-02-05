import IconGroup from './IconGroup';
import React from 'react';
import { wrapComponent } from '../../../AppUtils';

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
        return (<div class="icon-groups">
            {this.state.groups}
        </div>)
    }
    componentWillUnmount() {
        this.setState({});
    }
}