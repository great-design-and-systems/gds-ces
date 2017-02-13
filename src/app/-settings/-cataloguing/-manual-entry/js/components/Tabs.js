import {Link} from 'react-router';
import React from 'react';

export default class Tabs extends React.Component {
    componentWillMount() {
        this.tabs = [{
            label: 'Basic',
            path: '/settings/cataloguing/manual_entry/basic'
        }, {
                label: 'Additional',
                path: '/settings/cataloguing/manual_entry/additional'
            }, {
                label: 'Copies',
                path: '/settings/cataloguing/manual_entry/copies'
            }]
    }

    isActive(tab) {
        return this.props.location.pathname === tab.path;
    }

    render() {
        const tabLinks = [];
        this.tabs.forEach(tab => {
            tabLinks.push(<Link disabled={this.isActive(tab) } key={tab.label} className={'button primary'}
                to={tab.path}>{tab.label}</Link>)
        });
        return (
            <div class="button-group">
                {tabLinks}
            </div>
        )
    }
}