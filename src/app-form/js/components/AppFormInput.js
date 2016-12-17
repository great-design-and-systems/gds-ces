import React from 'react';
import lodash from 'lodash';

export default class AppFormInput extends React.Component {
    createComponent(field) {
        const fieldProps = field.getProperties();
        if (!fieldProps.type) {
            fieldProps.type = 'text';
        }

        if (!fieldProps.onChange) {
            fieldProps.onChange = function (event) {
                field.setValue(event.target.value);
            }
        }

        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }
        if (field.validator) {
            lodash.forIn(field.validator, (validator, fv) => {
                lodash.set(fieldProps, validator.event, (event) => {
                    validator.handler(event, (valid) => {
                        validator.valid = valid;
                    });
                });
            });
        }
        const inputElement = React.createElement(field.tag, fieldProps);
        return (
            <label key={field.key} for={fieldProps.id} class={field.tag}>
                {field.label}
                {inputElement}
            </label>
        )
    }
    render() {
        return this.createComponent(this.props.field);
    }
}