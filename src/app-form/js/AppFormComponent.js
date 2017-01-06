import {formReinstate, getModel, setManaged} from './AppFormActions';

import AppFormMessages from './components/AppFormMessages';
import AppModal from '../../app-modal/js/AppModal';
import DeleteModel from './control/DeleteModel';
import FormFields from './components/FormFields';
import GetModel from './control/GetModel';
import React from 'react';
import RenderFields from './control/RenderFields';
import SubmitModel from './control/SubmitModel';
import {connect} from 'react-redux';
import {wrapComponent} from '../../common/AppUtils';

@connect((state) => {
    return {
        form: state.form,
        api: state.api
    };
})
export default class AppForm extends React.Component {
    constructor(props) {
        super();
        if (!props) {
            throw new Error('Property id is required.');
        }
    }

    componentWillMount() {
        this.setState({});
        if (this.props.form.id) {
            this.props.dispatch(getModel(this.props.formManager.get.action, this.props.form.id, this.props.formManager.get.params));
        }
    }

    componentWillUnmount() {
        this.setState({});
    }

    componentWillReceiveProps(nextProps) {
        if (!!nextProps.form.formSubmit && nextProps.form.name === this.props.id) {
            this.setState({ formSubmit: true });
        } else if (!!nextProps.form.formRemove && nextProps.form.name === this.props.id) {

        }
        if (nextProps.form.id) {
            if (!!this.props.form.id && !nextProps.form.managed) {
                if (!nextProps.api.pending && !nextProps.api.error) {
                    new GetModel(nextProps.api, nextProps.formFields, nextProps.formManager);
                    nextProps.dispatch(setManaged(true));
                }
            }
            if (this.props.form.id != nextProps.form.id && !nextProps.api.pending) {
                nextProps.dispatch(getModel(nextProps.formManager.get.action, nextProps.form.id, nextProps.formManager.get.params));
                nextProps.dispatch(setManaged(false));
            }
        }
    }

    onSubmit(event) {
        event.preventDefault();
        //TODO: Validate before submit
        const submitModel = new SubmitModel(this.props.dispatch, this.props.formFields,
            this.props.formManager, this.props.form.id);
        if (this.props.form.managed) {
            submitModel.update();
        } else {
            submitModel.create();
        }
        this.props.dispatch(formReinstate());
    }

    onDelete() {
        new DeleteModel(this.props.dispatch, this.props.formManager, this.props.formFields, this.props.form.id);
    }

    render() {
        const buttons = [];
        buttons.push(<button key="submit_button"
            disabled={this.props.form.invalid || this.props.api.pending || this.props.form.pending}
            type="submit" class="button">
            {this.props.form.managed ? 'Update' : 'Save'}</button>);
        if (this.props.form.managed) {
            buttons.push(<button key="delete_button" disabled={this.props.api.pending || this.props.form.pending}
                onClick={this.onDelete.bind(this) } type="button" class="button alert">
                Delete</button>);
        }
        let className = 'app-form';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        const noButtonForm = React.createElement('button', {
            className: 'form-no-button',
            type: 'submit'
        });
        return (
            <div className={className}>
                {wrapComponent('AppForm', AppModal)({
                    id: 'appFormModal'
                }) }
                <form noValidate={true} onSubmit={this.onSubmit.bind(this) } name="appForm">
                    {wrapComponent('AppForm', AppFormMessages)() }
                    {wrapComponent('AppForm', FormFields)({
                        formFields: this.props.formFields,
                        formTemplates: this.props.fieldTemplates
                    }) }
                    {noButtonForm}
                </form>
            </div>
        )
    }

}
