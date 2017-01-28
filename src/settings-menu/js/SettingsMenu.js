import { Links } from '../../common/AppComponents';
import React from 'react';

export default class SettingsMenu extends React.Component {
    componentWillMount() {
        this.links = [
            {
                faIcon: 'fa fa-home fa-fw fa-lg',
                label: 'Home',
                path: '/home'
            },
            {
                faIcon: 'fa fa-puzzle-piece fa-fw fa-lg',
                label: 'Categories',
                path: '/settings/categories',
                createsNew: true,
                createPath: '/settings/categories/new'
            },
            {
                faIcon: 'fa fa-cube fa-fw fa-lg',
                label: 'Items',
                path: '/settings/items',
                createsNew: true,
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
        return <Links links={this.links}></Links>
    }
}