import AppFormMessages from './AppFormMessages';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect()
export default class AppFormSelect extends React.Component {
    createComponent(field) {
        const fieldProps = field.getProperties();
        const options = [];
        if (!fieldProps.onChange) {
            fieldProps.onChange = function (event) {
                field.setValue(event.target.value);
            }
        }

        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }
        if (fieldProps.options) {
            lodash.forIn(fieldProps.options, (value, field) => {
                options.push(<option key={value.hashCode()} value={value}>{field}</option>)
            });
        }
        if (field.validator) {
            this.props.validator.validate(this, field, fieldProps, this.props.dispatch);
        }
        return (
            <label key={field.key} for={fieldProps.id} class={field.tag}>
                {field.label}
                <select multiple={fieldProps.multiple} onChange={fieldProps.onChange} value={fieldProps.value} name={fieldProps.name} class={fieldProps.class} id={fieldProps.id}>
                    {options}
                </select>
            </label>
        )
    }
    render() {
        return this.createComponent(this.props.field);
    }
}