import { Links } from '../../common/AppComponents';
import React from 'react';
import SettingsMenu from '../../app-settings/js/components/SettingsMenu';

export default class HomeMenu extends React.Component {
    componentWillMount() {
        this.links = [
            {
                faIcon: 'fa fa-ticket fa-fw fa-lg',
                label: 'Tickets',
                path: '/settings'
            },
            {
                faIcon: 'fa fa-gears fa-fw fa-lg',
                label: 'Settings',
                path: '/settings'
            }];
    }
    render() {
        return (<div>
            <Links links={this.links} />
        </div>)
    }
}