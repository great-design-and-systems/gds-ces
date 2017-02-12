import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import DatePicker from 'react-datepicker';
@connect(
    state => {
        return {
            api: state.api
        };
    }
)
export default class AppFormDate extends React.Component {
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

    handleOnChange(date) {
        this.props.formManager.setModelValue(this.props.field, date);
    }

    createComponent(field) {
        const fieldProps = field.getProperties();
        fieldProps.disabled = this.props.api.pending;
        if (!fieldProps.type) {
            fieldProps.type = 'text';
        }
        if (!fieldProps.id) {
            fieldProps.id = fieldProps.name;
        }
        return (
            <label key={fieldProps.name.hashCode()} for={fieldProps.id}
                   class={fieldProps.tag}>
                {field.label}
                {field.isRequired() ? <span class="error"> *</span> : ''}
                <DatePicker onChange={this.handleOnChange.bind(this)}
                            selected={field.getValue()} name={fieldProps.name}/>
            </label>
        )
    }

    render() {
        return this.createComponent(this.props.field);
    }
}