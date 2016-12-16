import React from 'react';
import lodash from 'lodash';
import {Field} from './AppForm';

export default class AppForm extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        if (!this.props.formModel) {
            throw new Error('Property formModel is required.');
        }
    }
    renderFields() {
        const fields = [];
        if (this.props.formFields) {
            const formModel = this.props.formModel;
            lodash.forEach(this.props.formFields, (formField) => {
                if (formField instanceof Field) {
                    const fieldProperties = formField.getProperties();
                    fieldProperties.onChange = (event) => {
                        
                    };
                    const formFieldElement = React.createElement(formField.tag, fieldProperties);
                    fields.push(<div class="medium-6 columns form-field" key={fieldProperties.name.hashCode() }>
                        <label for={fieldProperties.name}>
                            {formField.label}
                            {formFieldElement}
                        </label>
                    </div>);
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
                <h2>{this.props.headerTitle}</h2>
                <form name="appForm">
                    <div class="rows">
                        {this.renderFields() }
                    </div>
                </form>
            </div>
        )
    }
}