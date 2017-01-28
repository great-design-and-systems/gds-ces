import React from 'react';
import SettingsMenu from '../../app-settings/js/components/SettingsMenu';

export default class HomeMenu extends React.Component {
    render() {
        return (<ul class="home-menu">
            <SettingsMenu />
        </ul>)
    }
}