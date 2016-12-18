import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect()
export default class AppFormRadio extends React.Component {
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

        if (field.validator) {
            this.props.validator.validate(this, field, fieldProps, this.props.dispatch);
        }

        if (fieldProps.options) {
            lodash.forIn(fieldProps.options, (value, field) => {
                options.push(
                    <span key={value.hashCode()}>
                        <input name={fieldProps.name}
                            type="radio" checked={value === fieldProps.value}
                            onChange={fieldProps.onChange}
                            class={fieldProps.class} id={value.hashCode()}
                            value={value}></input>
                        <label for={value.hashCode()}>{field}</label>
                    </span>)
            });
        }

        return (
            <fieldset key={field.key} class={field.tag}>
                <legend>{field.label}</legend>
                {options}
            </fieldset>
        )
    }
    render() {
        return this.createComponent(this.props.field);
    }
}