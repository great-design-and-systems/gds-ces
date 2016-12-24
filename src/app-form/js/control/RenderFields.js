import { FieldCreator } from '../AppForm';
import React from 'react';
import lodash from 'lodash';

export default class RenderFields {
    constructor(dispatch, formFields, fieldTemplates) {
        this.columnProps = [];
        this.columns = [];
        this.fields = [];
        lodash.forEach(formFields, formField => {
            if (formField.tag === 'column') {
                createColumn(formField, this);
            } else {
                createField(dispatch, formField, fieldTemplates, this);
            }
        });
    }
    render() {
        if (this.columns.length && this.fields.length) {
            this.columns.push(React.createElement('div', this.columnProps, this.fields));
            return this.columns;
        }
        return this.fields;
    }
}

function createColumn(formField, context) {
    const fieldProperties = formField.getProperties();
    fieldProperties.className = fieldProperties.className.replace('field-element', 'field-column');
    context.columnProps = fieldProperties;
    context.columns.push(React.createElement('div', fieldProperties, context.fields));
    context.fields = [];
}

function createField(dispatch, formField, fieldTemplates, context) {
    const fieldProperties = formField.getProperties();
    if (!formField.hasDivParent) {
        formField.key = fieldProperties.name.hashCode();
    }
    const formFieldElement = new FieldCreator(formField, dispatch, fieldTemplates).getElement();
    context.fields.push(
        formField.hasDivParent ?
            createFieldRenderWithDivParent(fieldProperties, formFieldElement) : formFieldElement);
}

function createFieldRenderWithDivParent(fieldProperties, formFieldElement) {
    return (<div class="form-field" key={fieldProperties.name.hashCode()}>
        {formFieldElement}
    </div>);
}