import { Field, FieldValidator } from '../../../app-form/js/AppForm';

import AppFormComponent from '../../../app-form/js/AppFormComponent';
import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import CategoriesFields from '../../../categories-fields/js/CategoriesFields';
import React from 'react';
import { View } from '../../../common/AppComponents';
import { connect } from 'react-redux';
import { setId } from '../../../app-form/js/AppFormActions';
import { wrapComponent } from '../../../common/AppUtils';

@connect()
export default class CategoryForm extends React.Component {
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
        if (this.props.params && this.props.params.categoryId) {
            this.props.dispatch(setId(this.props.params.categoryId));
        }
    }
    createFormManager() {
        this.formManager = {
            create: {
                action: '{Category.createCategory}'
            },
            update: {
                action: '{Category.updateCategory}',
                params: { categoryId: '{id}' }
            },
            delete: {
                action: '{Category.removeCategory}',
                params: { categoryId: '{id}' }
            },
            get: {
                action: '{Category.getCategoryById}',
                params: { categoryId: '{id}' },
                eval: 'data.category'
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
                return <CategoriesFields field={field} formManager={formManager} />
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
            required: new FieldValidator('onChange', 'Category name is required.', (value, done) => {
                done(value != null && !!value.length);
            })
        });
        this.formFields.push(field);

        field = new Field('categoryFields');
        field.setName('fields');
        field.setLabel('Fields');
        this.formFields.push(field);

    }
    render() {
        return (
            <View load={AppInterceptor}>
                <div class="category-form row expanded">
                    {wrapComponent('CategoryForm', AppFormComponent)({
                        id: 'categoryForm',
                        formManager: this.formManager,
                        fieldTemplates: this.fieldTemplates,
                        formFields: this.formFields,
                        className: 'column align-stretch'
                    })}
                </div>
            </View>)
    }
}