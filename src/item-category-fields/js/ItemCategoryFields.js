import React from 'react';
import {connect} from 'react-redux';
import {Field} from './../../app-form/js/AppForm';
import AppFormInput from './../../app-form/js/components/AppFormInput';
import AppFormSelect from './../../app-form/js/components/AppFormSelect';
import AppFormCheckbox from '../../app-form/js/components/AppFormCheckbox';
@connect()
export default class ItemCategoryFields extends React.Component {
    componentWillMount() {
        this.categoryFields = [];
        this.addField();
    }
    getTypeSelect(field) {
        return <AppFormSelect validator={this.props.validator} field={selectField}/>
    }
    createFieldForm(field) {
        return (<div class="category-field rows">
            <div class="columns">
                {this.withItemCategoryFields(AppFormInput)({
                    validator: this.props.validator,
                    field: field.name
                }) }
            </div>
            <div class="columns">
                {this.withItemCategoryFields(AppFormSelect)({
                    validator: this.props.validator,
                    field: field.fieldType
                }) }
                {this.withItemCategoryFields(AppFormCheckbox)({
                    validator: this.props.validator,
                    field: field.isFilter
                }) }
            </div>
        </div>)
    }
    addField() {
        const nameField = new Field('input');
        nameField.setLabel('Field name');
        nameField.setName('name');
        nameField.setProperties({
            placeholder: 'Enter field name here'
        });
        nameField.setRequired(true);
        const typeField = new Field('select');
        typeField.setLabel('Field type');
        typeField.setName('fieldType');
        typeField.setProperties({
            options: {
                'Text': 'text',
                'YesOrNo': 'yesNo',
                'Number': 'number',
                'Date': 'date'
            }
        });
        typeField.setValue('number');
        typeField.setRequired(true);
        const filterField = new Field('checkbox');
        filterField.setLabel('Has filter');
        filterField.setName('isFilter');
        filterField.setValue(true);
        filterField.setHasDivParent(false);
        this.categoryFields.push({
            name: nameField,
            fieldType: typeField,
            isFilter: filterField
        });
    }
    renderFields() {
        const fields = [];
        this.categoryFields.forEach(field => {
            fields.push(this.createFieldForm(field));
        });
        return fields;
    }
    render() {
        return (
            <fieldset>
                <legend>Fields</legend>
                {this.renderFields() }
            </fieldset>);
    }
    withItemCategoryFields(WrappedComponent) {
        function withItemCategoryFields(props) {
            return <WrappedComponent {...props} itemCategoryForm/>
        }
        const wrappedComponentName = WrappedComponent.displayName
            || WrappedComponent.name
            || 'Component';

        withItemCategoryFields.displayName = 'withItemCategoryFields(${wrappedComponentName})';
        return withItemCategoryFields;
    }
}