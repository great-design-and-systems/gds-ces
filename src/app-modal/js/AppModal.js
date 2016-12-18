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
    render() {
        return (
            <div class="reveal" id={this.props.id} data-reveal data-reset-on-close="true"
                data-close-on-esc="false"
                data-close-on-click="false">
                <h1>{this.props.modal.title}</h1>
                <p class="lead">{this.props.modal.message}</p>
                <div class="button-group">
                    <button class="button primary" onClick={this.props.modal.okAction}>{this.props.modal.okButton}</button>
                    <button class="button alert" onClick={this.props.modal.cancelAction}>{this.props.modal.cancelButton}</button>
                </div>
                <button class="close-button" onClick={this.props.modal.cancelAction} aria-label="Close modal" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>)
    }
}