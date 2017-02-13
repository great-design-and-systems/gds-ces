import { BatchAction, getActionData, isApiActionDone, splitActionFormat, wrapComponent } from '../../../common/AppUtils';
import { clearForm, formCleared, formReinstate, formRemoved, formSubmit, formSubmitted, getModel, modelSet, setManaged } from './AppFormActions';

import AppFormMessages from './components/AppFormMessages';
import AppModal from '../../-modal/js/AppModal';
import CreateModel from './control/CreateModel';
import DeleteModel from './control/DeleteModel';
import FormFields from './components/FormFields';
import GetModel from './control/GetModel';
import React from 'react';
import SetFieldValue from './control/SetFieldValue';
import SubmitModel from './control/SubmitModel';
import ValidateFields from './control/ValidateFields';
import { connect } from 'react-redux';

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
        this.props.dispatch(clearForm());
    }

    componentDidUpdate(prevProps) {
        if (this.props.form.clear) {
            this.clearFields();
            this.props.dispatch(formCleared());
        } else if (!this.props.api.pending) {
            if (this.props.form.name === this.props.id) {
                if (this.props.form.isSettingModel) {
                    this.props.form.batchProcessor.push(new BatchAction('SET_FORM_MODEL_VALUE', (done) => {
                        new SetFieldValue(this.props.form.model.name, this.props.formFields).setValue(this.props.form.model.value);
                        done();
                    }));
                    if (!this.props.form.batchProcessor.isRunning()) {
                        this.props.form.batchProcessor.execute(() => {
                            this.props.dispatch(modelSet());
                            if (this.props.onChange) {
                                this.props.onChange(new CreateModel(this.props.formFields, this.props.formManager).getModel());
                            }
                        });
                    }
                }
            }
            if (!this.props.form.pending) {
                if (!!this.props.form.formSubmit && this.props.form.name === this.props.id) {
                    new ValidateFields(this.props.formFields, this.props.dispatch).validate();
                    this.props.dispatch(formSubmitted(this.props.id));
                } else if (!!this.props.form.formRemove && this.props.form.name === this.props.id) {
                    this.props.dispatch(formRemoved(this.props.id));
                    this.onDelete();
                } else if (!!this.props.form.formSubmitted) {
                    if (this.props.form.valid) {
                        this.submit();
                    }
                    else {
                        this.props.dispatch(formReinstate());
                    }
                } else if (!!this.props.form.formRemoved) {
                    this.props.dispatch(formReinstate());
                }
            }
            if (this.props.form.id) {
                if (!!this.props.form.id && !this.props.form.managed) {
                    if (!this.props.api.error) {
                        const formFields = new GetModel(this.props.api, this.props.formFields, this.props.formManager).getFormFields();
                        this.setState({ formFields });
                        this.props.dispatch(setManaged(true));
                    }
                }
                else if (this.props.form.id !== prevProps.form.id) {
                    this.props.dispatch(getModel(this.props.formManager.get.action, this.props.form.id, this.props.formManager.get.params));
                    this.props.dispatch(setManaged(false));
                }
                else if (isApiActionDone(this.props.api, this.props.formManager.update.action)) {
                    this.handleSubmitComplete(this.props.formManager.update.action, 'update');
                }
            }
            else if (isApiActionDone(this.props.api, this.props.formManager.create.action)) {
                this.handleSubmitComplete(this.props.formManager.create.action, 'create');
            }
            else if (isApiActionDone(this.props.api, this.props.formManager.delete.action)) {
                this.handleSubmitComplete(this.props.formManager.delete.action, 'delete');
            }
        }
    }

    handleSubmitComplete(action, type) {
        const splitAction = splitActionFormat(action);
        const actionData = getActionData(this.props.api, splitAction.domain, splitAction.executable);
        if (actionData.error != null) {
            if (this.props.onSubmitFailed) {
                this.props.onSubmitFailed(actionData.error, type);
            }
        } else {
            if (this.props.onSubmitSuccess) {
                this.props.onSubmitSuccess(actionData, type);
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

        if (this.props.onSubmit) {
            this.props.onSubmitted(submitModel.model);
        }
    }

    onDelete() {
        new DeleteModel(this.props.dispatch, this.props.formManager, this.props.formFields, this.props.form.id);
    }

    clearFields() {
        if (this.state.formFields) {
            this.state.formFields.forEach(field => {
                field.properties.value = '';
            });
        }
    }

    render() {
        let className = 'app-form';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        const noButtonForm = !this.props.overrideSubmit ? React.createElement('button', {
            className: 'form-no-button',
            type: 'submit'
        }) : '';
        return (
            <div className={className}>
                {wrapComponent('AppForm', AppModal)({
                    id: 'appFormModal'
                })}
                <form class="expanded" noValidate={true} onSubmit={this.handleSubmit.bind(this)} name="appForm">
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

