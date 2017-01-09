import React from 'react';
import { connect } from 'react-redux';
import {reinstateModal} from './AppModalActions';

@connect((state) => {
    return {
        modal: state.modal
    }
})
export default class AppModal extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        if (this.props.modal.isOpen) {
            this.setState({
                message: this.props.modal.message,
                title: this.props.modal.title,
                okAction: this.props.modal.okAction,
                cancelAction: this.props.modal.cancelAction,
                okButton: this.props.modal.okButton,
                cancelButton: this.props.modal.cancelButton,
                modal: new Foundation.Reveal($('#' + action.payload.id))
            });
            this.modal.open();
        } else if (this.props.model.success != null) {

        } else if (this.props.model.error != null) {

        } else {

        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.modal) {
            this.setState({
                message: nextProps.modal.message,
                title: nextProps.modal.title,
                okAction: nextProps.modal.okAction,
                cancelAction: nextProps.modal.cancelAction,
                okButton: nextProps.modal.okButton,
                cancelButton: nextProps.modal.cancelButton,
            });
        }
    }
    render() {
        return (
            <div class="reveal" id={this.props.id} data-reveal data-reset-on-close="true"
                data-close-on-esc="false"
                data-close-on-click="false">
                <h1>{this.state.title}</h1>
                <p class="lead">{this.state.message}</p>
                <div class="button-group">
                    <button class="button primary" onClick={this.state.okAction}>{this.state.okButton}</button>
                    <button class="button alert" onClick={this.state.cancelAction}>{this.state.cancelButton}</button>
                </div>
                <button class="close-button" onClick={this.state.cancelAction} aria-label="Close modal" type="button">
                    <span aria-hidden="true">&times; </span>
                </button>
            </div>)
    }
}