import Menu from 'react-burger-menu';
import React from 'react';
import { connect } from 'react-redux';

@connect(state => {
    return { sidebar: state }
})
export default class AppSidebar extends React.Component {
    render() {
        return (<Menu.pushRotate
            outerContainerId={this.props.outerContainerId}
            pageWrapId={this.props.pageWrapId}
            isOpen={this.props.sidebar.isOpen}>
            <h4 class="app-sidebar-header">
                <img height="78" width="78" src="/src/app/-sidebar/img/libcat.png" aria-label="LibCat" />
                <span>alog</span>
            </h4>
            {this.props.children}
        </Menu.pushRotate>);
    }
}