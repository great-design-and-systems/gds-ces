import Menu from 'react-burger-menu';
import React from 'react';
import { connect } from 'react-redux';

@connect(state => {
    return { sidebar: state.sidebar }
})
export default class AppSidebar extends React.Component {
    render() {
        return (<Menu.scaleRotate
            outerContainerId={this.props.outerContainerId}
            pageWrapId={this.props.pageWrapId}
            isOpen={this.props.sidebar.isOpen} >
            {this.props.children}
        </Menu.scaleRotate>);
    }
}