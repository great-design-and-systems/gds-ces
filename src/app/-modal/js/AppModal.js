import { hasOpened, reinstateModal } from './AppModalActions';

import Modal from 'react-modal';
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
            this.setState({
                message: nextProps.modal.message,
                title: nextProps.modal.title,
                okAction: nextProps.modal.okAction,
                cancelAction: nextProps.modal.cancelAction,
                okButton: nextProps.modal.okButton,
                cancelButton: nextProps.modal.cancelButton
            });
        }
        else if (nextProps.modal.reject != null) {
            nextProps.dispatch(reinstateModal());
        }
        else if (nextProps.modal.success != null) {
            nextProps.dispatch(reinstateModal());
        }
        this.setState({
            isOpen: nextProps.modal.isOpen
        });
    }

    handleOnOk(event) {
        if (this.state.okAction) {
            this.state.okAction(event);
        }
    }

    handleOnCancel(event) {
        if (this.state.cancelAction) {
            this.state.cancelAction(event);
        }
    }

    render() {
        return (<Modal isOpen={this.props.modal.isOpen} contentLabel="Form modal">
            <h2>{this.state.title}</h2>
            <p class="lead">{this.state.message}</p>
            <div class="button-group medium">
                <button class="button primary" onClick={this.handleOnOk.bind(this)}>{this.state.okButton}</button>
                <button class="button alert" onClick={this.handleOnCancel.bind(this)}>{this.state.cancelButton}</button>
            </div>
        </Modal>)
    }
}