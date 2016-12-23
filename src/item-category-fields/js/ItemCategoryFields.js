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
    constructor() {
        super();
    }

    componentWillMount() {
        this.setState({
            categoryFields: []
        });
    }

    componentDidMount() {
        if (this.props.field.getValue() && this.props.field.getValue().length) {
            this.setState({ categoryFields: this.props.field.getValue() });
        } else {
            this.addField();
        }
    }

    createField() {
        return {
            name: '',
            fieldType: 'text',
            isFilter: true,
            isRequired: false
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
        let className = 'category-field row';
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
            <div key={key} className={className}>
                <CategoryField field={field} />
                <div class="category-field-controls columns large-1">{buttons}</div>
            </div>)
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