import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect(
    state => {
        return {
            api: state.api
        };
    }
)
export default class AppFormRadio extends React.Component {
    createComponent(field) {
        const fieldProps = field.getProperties();
        const options = [];
        if (!fieldProps.onChange) {
            fieldProps.onChange = (event) => {
                this.props.formManager.setModelValue(field, event.target.value);
            }
        }

        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }

        if (field.validator) {
            this.props.formManager.validate(field, fieldProps, this.props.dispatch);
        }

        if (fieldProps.options) {
            lodash.forIn(fieldProps.options, (value, field) => {
                options.push(
                    <span key={value.hashCode()}>
                        <input name={fieldProps.name} disabled={this.props.api.pending}
                            type="radio" checked={fieldProps.value ? value === fieldProps.value : null}
                            onChange={fieldProps.onChange}
                            class={fieldProps.class} id={value.hashCode()}
                            value={value}></input>
                        <label for={value.hashCode()}>{field}</label>
                    </span>)
            });
        }

        return (
            <fieldset key={field.key} class={field.tag}>
                <legend>{field.label} {field.isRequired() ? <span class="error">*</span> : ''}</legend>
                {options}
            </fieldset>
        )
    }
    render() {
        return this.createComponent(this.props.field);
    }
}