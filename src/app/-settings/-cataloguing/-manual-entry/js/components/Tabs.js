import React from 'react';
import {Link} from 'react-router';

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

    getLinkClass(tab) {
        let className = 'tabs-title';
        if (this.props.location.pathname === tab.path) {
            className += ' is-active';
        }
        return className;
    }

    render() {
        const tabLinks = [];
        this.tabs.forEach(tab => {
            tabLinks.push(<li key={tab.label} className={this.getLinkClass(tab)}><Link
                to={tab.path}>{tab.label}</Link></li>)
        });
        return (
            <ul class="tabs" data-tabs>
                {tabLinks}
            </ul>
        )
    }
}