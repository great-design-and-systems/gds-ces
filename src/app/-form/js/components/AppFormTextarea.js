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
export default class AppFormTextarea extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const fieldProps = this.props.field.getProperties();
        if (!fieldProps.onChange) {
            fieldProps.onChange = this.handleOnChange.bind(this);
        }
        if (this.props.field.validator) {
            this.props.formManager.validate(this.props.field, this.props.field.getProperties(), this.props.dispatch);
        }
    }

    handleOnChange(event) {
        this.props.formManager.setModelValue(this.props.field, event.target.value);
    }

    createComponent(field) {
        const fieldProps = field.getProperties();
        fieldProps.disabled = this.props.api.pending;
        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }
        const inputElement = React.createElement(field.tag, fieldProps);
        return (
            <label key={fieldProps.name.hashCode()} for={fieldProps.id}
                   class={fieldProps.tag}>
                {field.label}
                {field.isRequired() ? <span class="error"> *</span> : ''}
                {inputElement}
            </label>
        )
    }

    render() {
        return this.createComponent(this.props.field);
    }
}