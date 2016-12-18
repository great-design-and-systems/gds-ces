import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect()
export default class AppFormInput extends React.Component {
    createComponent(field) {
        const fieldProps = field.getProperties();
        let invalid;
        if (!fieldProps.type) {
            fieldProps.type = 'text';
        }
        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }

        if (!fieldProps.onChange) {
            fieldProps.onChange = function (event) {
                field.setValue(event.target.value);
            }
        }

        if (field.validator) {
            this.props.validator.validate(this, field, fieldProps, this.props.dispatch);
        }

        const inputElement = React.createElement(field.tag, fieldProps);
        return (
            <label key={field.key} for={fieldProps.id}
                class={fieldProps.tag}>
                {field.label}
                {inputElement}
            </label>
        )
    }
    render() {
        return this.createComponent(this.props.field);
    }
}