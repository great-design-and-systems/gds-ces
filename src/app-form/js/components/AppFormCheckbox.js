import React from 'react';
import { connect } from 'react-redux';

@connect()
export default class AppFormCheckBox extends React.Component {
    createComponent(field) {
        const fieldProps = field.getProperties();
        if (field.getValue() === true) {
            fieldProps.checked = 'checked';
        }
        else {
            fieldProps.checked = undefined;
        }
        fieldProps.type = 'checkbox'
        if (!fieldProps.onChange) {
            fieldProps.onChange = (event) => {
                this.props.formManager.setModelValue(field, !!event.target.checked);
            }
        }
        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }
        if (field.validator) {
            this.props.formManager.validate(field, fieldProps, this.props.dispatch);
        }
        const element = React.createElement('input', fieldProps);
        return (
            <span key={field.key} >
                {element}
                <label for={fieldProps.id}>
                    {field.label}{field.isRequired() ? <span class="error">*</span> : ''}
                </label>
            </span>
        );
    }

    render() {
        return this.createComponent(this.props.field);
    }
}