import {Link} from 'react-router';
import React from 'react';

export default class Tabs extends React.Component {
    componentWillMount() {
        this.tabs = [{
            label: 'Basic',
            path: '/cataloging/entry/basic'
        }, {
            label: 'Additional',
            path: '/cataloging/entry/additional'
        }, {
            label: 'Copies',
            path: '/cataloging/entry/copies'
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