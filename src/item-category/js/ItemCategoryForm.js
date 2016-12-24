import { Field, FieldValidator } from '../../app-form/js/AppForm';

import AppFormComponent from '../../app-form/js/AppFormComponent';
import ItemCategoryFields from '../../item-category-fields/js/ItemCategoryFields';
import React from 'react';
import { connect } from 'react-redux';

export default class ItemCategoryForm extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({
            category: {}
        });
        this.createFormManager();
        this.createFieldTemplates();
        this.createFormFields();
    }
    createFormManager() {
        this.formManager = {
            id: this.props.categoryId,
            create: {
                action: '{CATEGORY.createCategory}'
            },
            update: {
                action: '{CATEGORY.updateCategory}',
                params: { categoryId: this.props.categoryId }
            },
            delete: {
                action: '{CATEGORY.removeCategory}',
                params: { categoryId: this.props.categoryId }
            },
            deletePopup: {
                title: 'Category',
                message: 'Do you want to remove this item?',
                okButton: 'Oh yeah!',
                cancelButton: 'No, wait!'
            }
        };
    }
    createFieldTemplates() {
        this.fieldTemplates = {
            categoryFields: (field, formManager) => {
                return <ItemCategoryFields field={field} formManager={formManager} />
            }
        };
    }
    createFormFields() {
        this.formFields = [];
        let field = new Field('input');
        field.setName('name');
        field.setLabel('Category')
        field.setProperties({
            required: true,
            placeholder: 'Enter category name here'
        });
        
        field.setValidator({
            required: new FieldValidator('onChange', 'Category name is required.', (event, done) => {
                done(event.target.value != null && !!event.target.value.length);
            })
        });

        this.formFields.push(field);

        field = new Field('categoryFields');
        field.setName('fields');
        field.setLabel('Fields')
        this.formFields.push(field);
    }
    withItemCategoryForm(WrappedComponent) {
        function withItemCategoryForm(props) {
            return <WrappedComponent {...props} itemCategoryForm />
        }
        const wrappedComponentName = WrappedComponent.displayName
            || WrappedComponent.name
            || 'Component';

        withItemCategoryForm.displayName = 'withItemCategoryForm(${wrappedComponentName})';
        return withItemCategoryForm;
    }
    render() {
        return (
            <div>
                <div class="rows large-8 medium-12 small-12">
                    {this.withItemCategoryForm(AppFormComponent)({
                        formManager: this.formManager,
                        fieldTemplates: this.fieldTemplates,
                        formFields: this.formFields
                    })}
                </div>
            </div>)
    }
}