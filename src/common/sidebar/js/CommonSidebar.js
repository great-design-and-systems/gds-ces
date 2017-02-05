import React from 'react';

export default class CommonSidebar extends React.Component {
    render() {
        return (<div class="common-sidebar align-stretch column flex-container flex-dir-column large-2 medium-4 small-12">
            {this.props.children}
        </div>)
    }
}