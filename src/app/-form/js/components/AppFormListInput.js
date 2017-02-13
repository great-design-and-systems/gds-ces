import { ListInput } from '../../../../common/AppComponents';
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
export default class AppFormListInput extends React.Component {
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

    handleOnChange(value) {
        this.props.formManager.setModelValue(this.props.field, value);
    }

    createComponent(field) {
        const fieldProps = field.getProperties();
        fieldProps.disabled = this.props.api.pending;
        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }
        return (
            <label key={fieldProps.name.hashCode()} for={fieldProps.id}
                class={fieldProps.tag}>
                {field.label}
                {field.isRequired() ? <span class="error"> *</span> : ''}
                <ListInput value={field.getValue()} onChange={fieldProps.onChange} />
            </label>
        )
    }
    render() {
        return this.createComponent(this.props.field);
    }
}