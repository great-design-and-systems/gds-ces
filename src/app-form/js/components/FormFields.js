import FormColumn from './FormColumn';
import FormField from './FormField';
import React from 'react';
import {connect} from 'react-redux';
import lodash from 'lodash';
import {wrapComponent} from '../../../common/AppUtils';

@connect()
export default class FormFields extends React.Component {
    constructor(props) {
        super();
        if (!props.formFields) {
            throw new Error('Property formFields is required.');
        }
        if (!props.fieldTemplates) {
            throw new Error('Property fieldTemplates is required.');
        }
    }

    componentWillMount() {
        this.setState({});
    }

    componentWillReceiveProps(nextProps) {
        const {formFields, fieldTemplates} = nextProps;
        this.fields = [];
        this.columns = [];
        if (formFields) {
            formFields.forEach(field => {
                switch (field.tag) {
                    case 'column':
                        this.columnField = lodash.clone(field);
                        this.columns.push(wrapComponent('FormFields', FormColumn)({
                            formField: field,
                            fields: this.fields,
                            key: (field.properties.name.hashCode() + '_column').hashCode()
                        }));
                        this.fields = [];
                        break;
                    default:
                        this.fields.push(wrapComponent('FormFields', FormField)({
                            formField: field,
                            key: (field.properties.name.hashCode() + '_field').hashCode(),
                            fieldTemplates: fieldTemplates
                        }));
                        break;
                }
            });

            if (this.columns.length && this.fields.length) {
                this.columns.push(wrapComponent('FormFields', FormColumn)({
                    formField: this.columnField,
                    fields: this.fields,
                    key: (field.properties.name.hashCode() + '_last_column').hashCode()
                }));
                this.setState({ formFields: this.columns });
            } else {
                this.setState({ formFields: this.fields });
            }
        }
    }

    render() {
        return this.state.formFields;
    }
}