import React from 'react';

export default class CommonSidebar extends React.Component {
    render() {
        return (<div class="common-sidebar columns large-3 end">
            {this.props.children}
        </div>)
    }
}