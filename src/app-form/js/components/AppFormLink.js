import React from 'react';
import { browserHistory } from 'react-router';
import { clearForm } from '../AppFormActions';
import { connect } from 'react-redux';

@connect()
export default class AppFormLnk extends React.Component {
    render() {
        let className = '';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return <a className={className} onClick={this.handleOnLick.bind(this)}>{this.props.children}</a>
    }
    handleOnLick(event) {
        this.props.dispatch(clearForm());
        browserHistory.push(this.props.to);
    }
}