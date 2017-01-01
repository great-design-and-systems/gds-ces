import React from 'react';
import SettingsMenu from '../../app-settings/js/components/SettingsMenu';

export default class AppMenu extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <ul class="menu align-right">
                <SettingsMenu />
            </ul>)
    }
}