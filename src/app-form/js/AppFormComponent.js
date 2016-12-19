import { Field, FieldCreator } from './AppForm';
import { openModal, rejectModal, successModal } from '../../app-modal/js/AppModalActions';

import AppFormMessages from './components/AppFormMessages';
import AppModal from '../../app-modal/js/AppModal';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect((state) => {
    return {
        form: state.form,
        api: state.api
    };
})
export default class AppForm extends React.Component {
    constructor() {
        super();
    }
    createModel() {
        const modProps = lodash.map(this.props.formFields, 'properties');
        const newModel = {};
        setNewModelProps(newModel, modProps);
        setNewModelFormId(newModel, this.formManager);
        this.model = newModel;
    }
    componentWillMount() {
        this.managed = this.props.formManager && !!this.props.formManager.id;
        this.createModel();
    }
    onChangeForm(event) {
        if (this.props.onFormUpdate) {
            this.createModel();
            this.props.onFormUpdate(this.model);
        }
    }
    renderFields() {
        let fields = [];
        const columns = [];
        let columnsProps = {};
        if (this.props.formFields) {
            lodash.forEach(this.props.formFields, (formField) => {
                const fieldProperties = formField.getProperties();
                if (formField.tag === 'column') {
                    fieldProperties.className = fieldProperties.className.replace('field-element', 'field-column');
                    columnsProps = fieldProperties;
                    columns.push(React.createElement('div', fieldProperties, fields));
                    fields = [];
                } else {
                    if (!formField.hasDivParent) {
                        formField.key = fieldProperties.name.hashCode();
                    }
                    const formFieldElement = new FieldCreator(this.props.formFields, formField, this.props.fieldTemplates).getElement();
                    fields.push(
                        formField.hasDivParent ?
                            <div class="form-field" key={fieldProperties.name.hashCode() }>
                                {formFieldElement}
                            </div> : formFieldElement);
                }
            });
        }
        if (columns.length && fields.length) {
            columns.push(React.createElement('div', columnsProps, fields));
            return columns;
        }
        return fields;
    }
    onSubmit(event) {
        event.preventDefault();
        const dispatch = this.props.dispatch;
        const formManager = this.props.formManager;
        if (this.managed) {
            dispatch({
                type: formManager.update.action,
                payload: { json: this.model, params: formManager.update.params }
            });
        } else {
            dispatch({
                type: formManager.create.action,
                payload: { json: this.model, params: formManager.create.params }
            });
        }
    }
    onDelete() {
        this.props.dispatch(openModal({
            id: 'appFormModal',
            title: this.props.formManager.deletePopup.title,
            message: this.props.formManager.deletePopup.message,
            okButton: this.props.formManager.deletePopup.okButton,
            cancelButton: this.props.formManager.deletePopup.cancelButton,
            okAction: (event) => {
                this.props.dispatch(successModal('appFormModal', 'Yes'));
                this.props.dispatch({
                    type: this.props.formManager.delete.action,
                    payload: {
                        params: this.props.formManager.delete.params
                    }
                });
            },
            cancelAction: (event) => {
                this.props.dispatch(rejectModal('appFormModal', 'No'));
            }
        }))
    }
    withAppForm(WrappedComponent) {
        function withAppForm(props) {
            return <WrappedComponent {...props} appForm />
        }
        const wrappedComponentName = WrappedComponent.displayName
            || WrappedComponent.name
            || 'Component';

        withAppForm.displayName = 'withAppForm(${wrappedComponentName})';
        return withAppForm;
    }
    render() {
        const buttons = [];
        buttons.push(<button disabled={this.props.form.invalid || this.props.api.pending} type="submit" class="button">
            {this.managed ? 'Update' : 'Save'}</button>);
        if (this.managed) {
            buttons.push(<button onClick={this.onDelete.bind(this) } type="button" class="button alert">Delete</button>);
        }
        return (
            <div class="app-form">
                {this.withAppForm(AppModal)({
                    id: 'appFormModal'
                }) }
                <form noValidate={this.props.noValidate} onSubmit={this.onSubmit.bind(this) } onChange={this.onChangeForm.bind(this) } name="appForm">
                    <div class="row">
                        {this.withAppForm(AppFormMessages)() }
                        {this.renderFields() }
                    </div>
                    <div class="row">
                        <div class="button-group">
                            {buttons}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


function setNewModelFormId(newModel, formManager) {
    if (formManager && formManager.id) {
        lodash.forIn(formManager.id, (value, field) => {
            lodash.set(newModel, field, value);
        });
    }
}

function setNewModelProps(newModel, props) {
    lodash.forEach(props, (prop) => {
        if (prop.name) {
            lodash.set(newModel, prop.name, prop.value);
        }
    });
}