import { Toolbar, View } from '../../../common/AppComponents';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import React from 'react';
import { browserHistory } from 'react-router';
import { wrapComponent } from '../../../common/AppUtils';

export default class CategoryListControls extends React.Component {
    constructor() {
        super();
        this.controls = [
            {
                name: 'settings',
                iconClass: 'fa fa-gears',
                label: 'Settings'
            },
            {
                name: 'create',
                iconClass: 'fa fa-plus',
                label: 'New'
            }
        ];
    }
    handleClick(event, action, dispatch) {
        switch (action) {
            case 'settings':
                browserHistory.push('/settings');
                break;
            case 'create':
                browserHistory.push('/settings/categories/new');
                break;
        }
    }
    render() {
        return (<View load={AppInterceptor}>
            <Toolbar onClick={this.handleClick.bind(this)} controls={this.controls} />
        </View>)
    }
}