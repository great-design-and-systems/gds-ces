import { hasOpened, reinstateModal } from './AppModalActions';

import React from 'react';
import { connect } from 'react-redux';

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
        this.setState({});
    }
    componentWillUnmount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.modal.isOpen) {
            this.modal = new Foundation.Reveal($('#' + nextProps.modal.id))
            this.setState({
                message: nextProps.modal.message,
                title: nextProps.modal.title,
                okAction: nextProps.modal.okAction,
                cancelAction: nextProps.modal.cancelAction,
                okButton: nextProps.modal.okButton,
                cancelButton: nextProps.modal.cancelButton
            });
            this.modal.open();
            nextProps.dispatch(hasOpened());
        }
        else if (nextProps.modal.reject != null) {
            this.modal.destroy();
            nextProps.dispatch(reinstateModal());
        }
        else if (nextProps.modal.success != null) {
            this.modal.destroy();
            nextProps.dispatch(reinstateModal());
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