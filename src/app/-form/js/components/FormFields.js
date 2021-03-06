import FormColumn from './FormColumn';
import FormFieldSet from './FormFieldSet';
import FormField from './FormField';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { wrapComponent } from '../../../../common/AppUtils';

@connect()
export default class FormFields extends React.Component {
    initFormFields(nextProps) {
        const {formFields, fieldTemplates} = nextProps;
        this.fields = [];
        this.columns = [];
        this.fieldSetComponents = [];
        if (formFields) {
            formFields.forEach((field, index) => {
                switch (field.tag) {
                    case 'fieldset':
                        this.fieldSetComponents.push(wrapComponent('FormFields', FormFieldSet)({
                            formField: field,
                            fields: this.columns.length > 0 ? this.columns : this.fields,
                            key: (field.form + '_' + index + '_' + 'form-field-set').hashCode()
                        }));
                        this.fields = [];
                        this.columns = [];
                        break;
                    case 'column':
                        this.columns.push(wrapComponent('FormFields', FormColumn)({
                            formField: field,
                            fields: this.fields,
                            key: (field.form + '_' + index + '_' + '_column').hashCode()
                        }));
                        this.fields = [];
                        break;
                    default:
                        this.fields.push(wrapComponent('FormFields', FormField)({
                            formField: field,
                            key: (field.properties.name.hashCode() + '_field').hashCode(),
                            fieldTemplates: fieldTemplates || {}
                        }));
                        break;
                }
            });
            if (this.columns.length > 0) {
                if (this.fields.length > 0) {
                    this.columns = this.columns.concat(this.fields);
                }
                this.setState({formFields: this.columns});
            } else if (this.fieldSetComponents.length > 0) {
                if (this.fields.length > 0) {
                    this.fieldSetComponents = this.fieldSetComponents.concat(this.fields);
                }
                this.setState({formFields: this.fieldSetComponents});
            } else {
                this.setState({formFields: this.fields});
            }
        }
    }

    constructor(props) {
        super();
        if (!props.formFields) {
            throw new Error('Property formFields is required.');
        }
    }

    componentWillMount() {
        this.setState({});
        this.initFormFields(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.initFormFields(nextProps);
    }

    render() {
        return (<div class="form-fields expanded">{this.state.formFields}</div>)
    }
}