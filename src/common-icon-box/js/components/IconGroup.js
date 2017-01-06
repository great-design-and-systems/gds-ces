import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import Icons from './Icons';
import CommonView from '../../../common-view/js/CommonView';
import React from 'react';
import { wrapComponent } from '../../../common/AppUtils';

export default class IconGroup extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            group: nextProps.group,
            icons: nextProps.icons,
            handleSelect: nextProps.handleSelect
        });
    }
    render() {
        return (<CommonView load={AppInterceptor}>
            <div class="icon-group callout">
                <h4 class="icon-group-title">{this.state.group}</h4>
                {wrapComponent('IconGroup', Icons)({
                    icons: this.state.icons,
                    handleSelect: this.state.handleSelect
                })}
            </div>
        </CommonView>)
    }
}