import { Field, FieldCreator } from './AppForm';

import AppFormMessages from './components/AppFormMessages';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

export default class AppForm extends React.Component {
    constructor() {
        super();
    }
    onChangeForm(event) {
        if (this.props.onFormUpdate) {
            const modProps = lodash.map(this.props.formFields, 'properties');
            const newModel = {};
            lodash.forEach(modProps, (prop) => {
                lodash.set(newModel, prop.name, prop.value);
            });
            this.props.onFormUpdate(newModel);
        }
    }
    renderFields() {
        let fields = [];
        const columns = [];
        let columnsProps = {};
        if (this.props.formFields) {
            lodash.forEach(this.props.formFields, (formField) => {
                if (formField instanceof Field) {
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
                                <div class="form-field" key={fieldProperties.name.hashCode()}>
                                    {formFieldElement}
                                </div> : formFieldElement);
                    }
                }
                else {
                    throw new Error('Element must be an instance of AppForm.Field');
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
        this.forceUpdate();
    }
    render() {
        return (
            <div class="app-form">
                <AppFormMessages />
                <form noValidate={this.props.noValidate} onSubmit={this.onSubmit.bind(this)} onChange={this.onChangeForm.bind(this)} name="appForm">
                    <div class="row">
                        {this.renderFields()}
                    </div>
                    <div class="row">
                        <button type="submit" class="float-right button">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}