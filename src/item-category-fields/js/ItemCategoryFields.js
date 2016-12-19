import AppFormCheckbox from '../../app-form/js/components/AppFormCheckbox';
import AppFormInput from './../../app-form/js/components/AppFormInput';
import AppFormSelect from './../../app-form/js/components/AppFormSelect';
import { Field } from './../../app-form/js/AppForm';
import React from 'react';
import { connect } from 'react-redux';

@connect()
export default class ItemCategoryFields extends React.Component {
    componentWillMount() {
        this.setState({
            categoryFields: [this.createField()]
        });
    }
    getTypeSelect(field) {
        return <AppFormSelect validator={this.props.validator} field={selectField} />
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
            buttons.push(<button key={('add' + index).hashCode()} class="button" type="button" onClick={this.addField.bind(this)}>Add</button>);
        } else {
            buttons.push(<button key={('remove' + index).hashCode()} class="button alert" type="button" onClick={remove.bind(this)}>Remove</button>);
        }

        return (
            <div key={key} className={className}>
                <div>
                    {this.withItemCategoryFields(AppFormInput)({
                        validator: this.props.validator,
                        field: field.name
                    })}
                </div>
                <div>
                    {this.withItemCategoryFields(AppFormSelect)({
                        validator: this.props.validator,
                        field: field.fieldType
                    })}
                    {this.withItemCategoryFields(AppFormCheckbox)({
                        validator: this.props.validator,
                        field: field.isFilter
                    })}
                    <div class="button-group">
                        {buttons}
                    </div>
                </div>
            </div>)
    }
    createField() {
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
        return {
            name: nameField,
            fieldType: typeField,
            isFilter: filterField
        };
    }
    addField() {
        this.state.categoryFields.push(this.createField());
        this.forceUpdate();
    }
    renderFields() {
        const fields = [];
        console.log('renderFields', this.state);
        this.state.categoryFields.forEach((field, index) => {
            fields.push(this.createFieldForm(field, index));
        });
        return fields;
    }
    render() {
        return (
            <fieldset class="item-category-fields">
                <legend>Fields</legend>
                {this.renderFields()}
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