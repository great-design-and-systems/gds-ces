import { Links } from '../../../common/AppComponents';
import React from 'react';

export default class Menu extends React.Component {
    componentWillMount() {
        this.links = [
            {
                faIcon: 'fa fa-puzzle-piece fa-fw fa-lg',
                label: 'Categories',
                path: '/settings/categories',
                createPath: '/settings/categories/new'
            },
            {
                faIcon: 'fa fa-cube fa-fw fa-lg',
                label: 'Items',
                path: '/settings/items',
                createPath: '/settings/items/new'
            },
            {
                faIcon: 'fa fa fa-history fa-fw fa-lg',
                label: 'Logs',
                path: '/settings/logs',
                createsNew: false
            }];
    }
    render() {
        return (<div class="settings-menu">
            <fieldset>
                <legend><h4 class="menu-legend"> <i class="fa fa-user fa-fw fa-lg" />Admin</h4></legend>
                <div class="menu-links">
                    <Links links={this.links}></Links>
                </div>
            </fieldset>
        </div>)
    }
}