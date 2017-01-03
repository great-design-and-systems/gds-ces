import { Link } from 'react-router';
import React from 'react';

export default class SettingsLink extends React.Component {
    render() {
        return (
            <ul class="vertical menu">
                <li><Link to="/settings/general"><i class="fa fa-gears" />General</Link></li>
                <li><Link to="/settings/category"><i class="fa fa-book" />Category</Link></li>
            </ul>);
    }
}