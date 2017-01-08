import { clearForm, formReinstate, formRemoved, formSubmit, formSubmitted, getModel, modelSet, setManaged } from './AppFormActions';

import AppFormMessages from './components/AppFormMessages';
import AppModal from '../../app-modal/js/AppModal';
import DeleteModel from './control/DeleteModel';
import FormFields from './components/FormFields';
import GetModel from './control/GetModel';
import React from 'react';
import SetFieldValue from './control/SetFieldValue';
import SubmitModel from './control/SubmitModel';
import ValidateFields from './control/ValidateFields';
import { connect } from 'react-redux';
import { wrapComponent } from '../../common/AppUtils';

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
    componentWillUnmount() {
        this.setState({});
        this.props.dispatch(clearForm());
    }
    componentWillMount() {
        this.setState({});
        if (this.props.form.id) {
            this.props.dispatch(getModel(this.props.formManager.get.action, this.props.form.id, this.props.formManager.get.params));
        }
        if (this.props.formFields) {
            this.props.formFields.forEach(field => {
                field.form = this.props.id;
            });
        }

        this.setState({
            formFields: this.props.formFields,
            fieldTemplates: this.props.fieldTemplates
        });
    }

    componentWillUnmount() {
        this.setState({});
        this.props.dispatch(formReinstate());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.form.name === nextProps.id) {
            if (nextProps.form.isSettingModel) {
                new SetFieldValue(nextProps.form.model.name, nextProps.formFields).setValue(nextProps.form.model.value);
                this.props.dispatch(modelSet());
            }
        }
        if (!nextProps.api.pending) {
            if (!!nextProps.form.formSubmit && nextProps.form.name === this.props.id) {
                new ValidateFields(nextProps.formFields, nextProps.dispatch).validate();
                nextProps.dispatch(formSubmitted(nextProps.id));
            } else if (!!nextProps.form.formRemove && nextProps.form.name === this.props.id) {

            } else if (!!nextProps.form.formSubmitted) {
                if (nextProps.valid) {
                    this.submit();
                }
                else {
                    this.props.dispatch(formReinstate());
                }
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
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(formSubmit(this.props.id));
    }
    submit() {
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
                })}
                <form noValidate={true} onSubmit={this.handleSubmit.bind(this)} name="appForm">
                    {wrapComponent('AppForm', AppFormMessages)()}
                    {wrapComponent('AppForm', FormFields)({
                        formFields: this.state.formFields,
                        fieldTemplates: this.state.fieldTemplates
                    })}
                    {noButtonForm}
                </form>
            </div>
        )
    }

}
