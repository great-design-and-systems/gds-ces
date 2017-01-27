import AppFormMessages from './AppFormMessages';
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
export default class AppFormSelect extends React.Component {
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
        if (fieldProps.options) {
            lodash.forIn(fieldProps.options, (value, field) => {
                options.push(<option key={value.hashCode() } value={value}>{field}</option>)
            });
        }
        if (field.validator) {
            this.props.formManager.validate(field, fieldProps, this.props.dispatch);
        }
        return (
            <label key={field.key} for={fieldProps.id} class={field.tag}>
                {field.label}{field.isRequired() ? <span class="error"> *</span> : ''}
                <select disabled={this.props.api.pending} multiple={fieldProps.multiple} onChange={fieldProps.onChange} value={fieldProps.value} name={fieldProps.name} class={fieldProps.class} id={fieldProps.id}>
                    {options}
                </select>
            </label>
        )
    }
    render() {
        return this.createComponent(this.props.field);
    }
}