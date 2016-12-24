import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect()
export default class AppFormInput extends React.Component {
    constructor() {
        super();
    }

    handleOnChange(event) {
        this.props.formManager.setModelValue(this.props.field, event.target.value);
    }

    createComponent(field) {
        const fieldProps = field.getProperties();

        if (!fieldProps.type) {
            fieldProps.type = 'text';
        }
        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }
        if (!fieldProps.onChange) {
            fieldProps.onChange = this.handleOnChange.bind(this);
        }
        if (field.validator) {
            this.props.formManager.validate(field, fieldProps, this.props.dispatch);
        }

        const inputElement = React.createElement(field.tag, fieldProps);
        return (
            <label key={fieldProps.name.hashCode()} for={fieldProps.id}
                class={fieldProps.tag}>
                {field.label}
                {field.isRequired() ? <span class="error">*</span> : ''}
                {inputElement}
            </label>
        )
    }
    render() {
        return this.createComponent(this.props.field);
    }
}