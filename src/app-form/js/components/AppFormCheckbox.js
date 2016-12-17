import React from 'react';

export default class AppFormCheckBox extends React.Component {
    createComponent(field) {
        const fieldProps = field.getProperties();
        if (field.getValue() === true) {
            fieldProps.value = 'on';
        }
        else {
            fieldProps.value = undefined;
        }
        fieldProps.type = 'checkbox'
        if (!fieldProps.onChange) {
            fieldProps.onChange = function (event) {
                field.setValue(!field.getValue());
            }
        }
        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }
        const element = React.createElement('input', fieldProps);
        return (
            <span key={field.key} >
                {element}
                <label for={fieldProps.id}>
                    {field.label}
                </label>
            </span>
        )

    }

    render() {
        return this.createComponent(this.props.field);
    }
}