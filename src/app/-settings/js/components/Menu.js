import { Links } from '../../../../common/AppComponents';
import React from 'react';

export default class Menu extends React.Component {
    componentWillMount() {
        this.adminLinks = [
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

        this.cataloguingLinks = [
            {
                faIcon: 'fa fa-file-text-o fa-fw fa-lg',
                label: 'Manual entry',
                path: '/settings/cataloguing/manual_entry',
            },
            {
                faIcon: 'fa fa-barcode fa-fw fa-lg',
                label: 'Scan barcode',
                path: '/settings/cataloguing/scan_barcode',
            },
            {
                faIcon: 'fa fa-search fa-fw fa-lg',
                label: 'Online Search',
                path: '/settings/cataloguing/online_search',
            }
        ]
    }
    render() {
        return (<div class="settings-menu">
            <fieldset>
                <legend><h4 class="menu-legend"> <i class="fa fa-user fa-fw fa-lg" />Admin</h4></legend>
                <div class="menu-links">
                    <Links links={this.adminLinks}></Links>
                </div>
            </fieldset>
            <fieldset>
                <legend><h4 class="menu-legend"><i class="fa fa-archive fa-fw fa-lg" />Cataloguing</h4></legend>
                <div class="menu-links">
                    <Links links={this.cataloguingLinks}></Links>
                </div>
            </fieldset>
        </div>)
    }
}