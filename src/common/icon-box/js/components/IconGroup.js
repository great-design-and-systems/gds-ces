import Icons from './Icons';
import React from 'react';
import { wrapComponent } from '../../../AppUtils';

export default class IconGroup extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setIconGroupState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setIconGroupState(nextProps);
    }
    setIconGroupState(nextProps) {
        this.setState({
            group: nextProps.group,
            icons: nextProps.icons,
            handleSelect: nextProps.handleSelect
        });
    }
    render() {
        return (<div class="icon-group callout">
            <h4 class="icon-group-title">{this.state.group}</h4>
            {wrapComponent('IconGroup', Icons)({
                icons: this.state.icons,
                handleSelect: this.state.handleSelect
            })}
        </div>)
    }
    componentWillUnmount() {
        this.setState({});
    }
}