import AppFormCheckbox from '../../app-form/js/components/AppFormCheckbox';
import AppFormInput from './../../app-form/js/components/AppFormInput';
import AppFormSelect from './../../app-form/js/components/AppFormSelect';
import CategoryField from './components/CategoryField';
import { Field } from './../../app-form/js/AppForm';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

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
        console.log('component did mount', this);
        if (this.props.field.getValue() && this.props.field.getValue().length) {
            this.setState({ categoryFields: this.props.field.getValue() });
        } else {
            this.addField();
        }
    }
    createField() {
        return {
            name: { value: '' },
            fieldType: { value: 'text' },
            isFilter: { value: true }
        };
    }
    addField() {
        this.state.categoryFields.push(this.createField());
        this.props.formManager.setModelValue(this.props.field, this.state.categoryFields);
        this.forceUpdate();
    }
    createFieldForm(field, index) {
        const key = ('category_field_' + index).hashCode();
        const remove = () => {
            this.state.categoryFields.splice(index, 1);
            this.forceUpdate();
        }
        let className = 'category-field large-12 medium-12 small-12 end';
        if (index % 2 === 0) {
            className += ' even';
        } else {
            className += ' odd';
        }
        const buttons = [];
        if (index === this.state.categoryFields.length - 1) {
            buttons.push(<a key={('add' + index).hashCode()} class="add-button" onClick={this.addField.bind(this)}><i class="fa fa-plus"></i></a>);
            if (index > 0) {
                buttons.push(<a key={('remove' + index).hashCode()} class="remove-button" onClick={remove.bind(this)}><i class="fa fa-minus"></i></a>);
            }
        }
        return (
            <tr key={key} className={className}>
                <CategoryField />
                <td><div class="category-field-controls">{buttons}</div></td>
            </tr>)
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