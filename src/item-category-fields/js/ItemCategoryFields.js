import AppFormCheckbox from '../../app-form/js/components/AppFormCheckbox';
import AppFormInput from './../../app-form/js/components/AppFormInput';
import AppFormSelect from './../../app-form/js/components/AppFormSelect';
import { Field } from './../../app-form/js/AppForm';
import React from 'react';
import { connect } from 'react-redux';

@connect(state => {
    return {
        form: state.form
    }
})
export default class ItemCategoryFields extends React.Component {
    componentWillMount() {
        this.setState({ categoryFields: [] });
    }
    componentDidMount() {
        if (this.props.field.getValue()) {
            this.state.categoryFields = [];
            this.props.field.getValue().forEach((field, index) => {
                this.addField();
                const categoryField = this.state.categoryFields[index];
                categoryField.name.setValue(field.name);
                categoryField.fieldType.setValue(field.fieldType);
                categoryField.isFilter.setValue(field.isFilter);
            });
        } else {
            this.addField();
        }
    }
    componentWillReceiveProps(props) {
        if (props.form.lastTouch) {
            const fields = [];
            this.state.categoryFields.forEach(field => {
                fields.push(this.createValue(field));
            });
            this.props.formManager.setModelValue(this.props.field, fields);
        }
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
        let className = 'category-field column large-4 medium-12 small-12 end';
        if (index % 2 === 0) {
            className += ' even';
        } else {
            className += ' odd';
        }
        const buttons = [];
        if (index === this.state.categoryFields.length - 1) {
            buttons.push(<span key={('add' + index).hashCode() } ><a class="add-button"  onClick={this.addField.bind(this) }><i class="fa fa-plus"></i></a></span>);
            if (index > 0) {
                buttons.push(<span key={('remove' + index).hashCode() } ><a class="remove-button" onClick={remove.bind(this) }><i class="fa fa-minus"></i></a></span>);
            }
        }
        return (
            <div key={key} className={className}>
                {this.renderFieldName(field) }
                <span class="columns category-field-controls">
                    {buttons}
                </span>
            </div>)
    }
    addField() {
        const field = this.createField();
        this.state.categoryFields.push(field);
        this.forceUpdate();
    }
    createValue(field) {
        const value = {};
        value.name = field.name.getValue();
        value.fieldType = field.fieldType.getValue();
        value.isFilter = field.isFilter.getValue();
        return value;
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
    renderFieldName(field) {
        const fieldNameOnChange = (event) => {
            field.setValue(event.target.value);
        }
        return (<input type="text" onChange={fieldNameOnChange.bind(this) } />)
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