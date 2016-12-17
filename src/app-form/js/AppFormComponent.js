import { Field, FieldCreator } from './AppForm';

import React from 'react';
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
        const fields = [];
        if (this.props.formFields) {
            lodash.forEach(this.props.formFields, (formField) => {
                if (formField instanceof Field) {
                    const fieldProperties = formField.getProperties();
                    if (!formField.hasDivParent) {
                        formField.key = fieldProperties.name.hashCode();
                    }
                    const formFieldElement = new FieldCreator(formField, this.props.fieldTemplates).getElement();

                    fields.push(
                        formField.hasDivParent ?
                            <div class="form-field" key={fieldProperties.name.hashCode()}>
                                {formFieldElement}
                            </div> : formFieldElement);
                }
                else {
                    throw new Error('Element must be an instance of AppForm.Field');
                }
            });
        }
        return fields;
    }
    render() {
        return (
            <div class="app-form">
                <form onChange={this.onChangeForm.bind(this)} name="appForm">
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