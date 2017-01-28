import React from 'react';

export default class CommonContent extends React.Component {
    render() {
        let className = 'common-content column';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return (<div id={this.props.id} className={className}>
            {this.props.children}
        </div>);
    }
}