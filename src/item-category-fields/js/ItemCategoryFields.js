import AppFormCheckbox from '../../app-form/js/components/AppFormCheckbox';
import AppFormInput from './../../app-form/js/components/AppFormInput';
import AppFormSelect from './../../app-form/js/components/AppFormSelect';
import { Field } from './../../app-form/js/AppForm';
import React from 'react';
import { connect } from 'react-redux';

@connect()
export default class ItemCategoryFields extends React.Component {
    componentWillMount() {
        this.setState({ categoryFields: [] });
        if (this.props.field.getValue()) {
            this.state.categoryFields = [];
            this.props.field.getValue().forEach((field, index) => {
                this.addField();
                const categoryField = this.state.categoryFields[index];
                categoryField.name.setValue(field.name);
                categoryField.fieldType.setValue(field.fieldType);
                categoryField.isFilter.setValue(field.isFilter);
            });
        } 
    }
    componentWillUpdate() {
        const fieldValue = [];
        if (this.state.categoryFields) {
            this.state.categoryFields.forEach(field => {
                const value = {};
                value.name = field.name.getValue();
                value.fieldType = field.fieldType.getValue();
                value.isFilter = field.isFilter.getValue();
                fieldValue.push(value);
            });
        }
        this.props.field.setValue(fieldValue);
    }
    createField() {
        const nameField = new Field('input');
        nameField.setLabel('Field name');
        nameField.setName('name');
        nameField.setProperties({
            id: 'name_' + this.state.categoryFields.length,
            placeholder: 'Enter field name here'
        });
        nameField.setRequired(true);
        const typeField = new Field('select');
        typeField.setLabel('Field type');
        typeField.setName('fieldType');
        typeField.setProperties({
            id: 'fieldType_' + this.state.categoryFields.length,
            options: {
                'Text': 'text',
                'Boolean': 'boolean',
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
        filterField.setProperties({
            id: 'isFilter_' + this.state.categoryFields.length
        });
        return {
            name: nameField,
            fieldType: typeField,
            isFilter: filterField
        };
    }
    createFieldForm(field, index) {
        const key = ('category_field_' + index).hashCode();
        const remove = () => {
            this.state.categoryFields.splice(index, 1);
            this.forceUpdate();
        }
        let className = 'category-field column large-12 medium-12 small-12 end';
        if (index % 2 === 0) {
            className += ' even';
        } else {
            className += ' odd';
        }
        const buttons = [];
        if (index === this.state.categoryFields.length - 1) {
            buttons.push(<span key={('add' + index).hashCode() } ><a onClick={this.addField.bind(this) }>Add</a></span>);
            if (index > 0) {
                buttons.push(<span key={('remove' + index).hashCode() } ><a class="error" onClick={remove.bind(this) }>Remove</a></span>);
            }
        }
        return (
            <div key={key} className={className}>
                <div class="category-field-controls float-right">
                    {buttons}
                </div>
                <div>
                    {this.withItemCategoryFields(AppFormInput)({
                        validator: this.props.validator,
                        field: field.name
                    }) }
                </div>
                <div>
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
        this.state.categoryFields.push(this.createField());
        this.forceUpdate();
    }
    renderFields() {
        const fields = [];
        this.state.categoryFields.forEach((field, index) => {
            fields.push(this.createFieldForm(field, index));
        });
        return fields;
    }
    render() {
        return (
            <fieldset class="item-category-fields">
                <legend>Fields</legend>
                {this.renderFields() }
            </fieldset>);
    }
    withItemCategoryFields(WrappedComponent) {
        function withItemCategoryFields(props) {
            return <WrappedComponent {...props} itemCategoryForm />
        }
        const wrappedComponentName = WrappedComponent.displayName
            || WrappedComponent.name
            || 'Component';

        withItemCategoryFields.displayName = 'withItemCategoryFields(${wrappedComponentName})';
        return withItemCategoryFields;
    }
}