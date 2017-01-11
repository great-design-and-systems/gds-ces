import { Field, FieldValidator } from '../../../app-form/js/AppForm';
import { clearForm, setId, setManaged } from '../../../app-form/js/AppFormActions';

import AppFormComponent from '../../../app-form/js/AppFormComponent';
import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import CategoriesFields from '../../../categories-fields/js/CategoriesFields';
import React from 'react';
import { View } from '../../../common/AppComponents';
import { connect } from 'react-redux';
import { wrapComponent } from '../../../common/AppUtils';

@connect()
export default class CategoryForm extends React.Component {
    constructor() {
        super();
    }
    componentWillReceiveProps(nextProps) {
        nextProps.dispatch(clearForm());
        if (nextProps.params && nextProps.params.categoryId) {
            nextProps.dispatch(setId(nextProps.params.categoryId));
        } else {
            nextProps.dispatch(setId(null));
            nextProps.dispatch(setManaged(false));
        }
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
        } else {
            this.props.dispatch(setId(null));
            this.props.dispatch(setManaged(false));
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
        const formFields = [];
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
        formFields.push(field);

        field = new Field('iconBox');
        field.setName('icon');
        field.setLabel('Icon');
        formFields.push(field);

        field = new Field('categoryFields');
        field.setName('fields');
        field.setLabel('Fields');
        field.setValidator({
            required: new FieldValidator('onChange', 'Aleast one field is added.', (value, done) => {
                done(value && !!value.length && value.length > 0);
            }),
            fieldName: new FieldValidator('onChange', 'Field name is required.', (value, done) => {
                if (!value || value.length === 0) {
                    done();
                } else {
                    let valid = true;
                    value.forEach(item => {
                        if (valid) {
                            valid = !!item.name;
                        }
                    });
                    done(valid);
                }
            })
        });
        formFields.push(field);
        this.setState({ formFields });
    }
    render() {
        return (
            <View load={AppInterceptor}>
                <div class="category-form row expanded">
                    {wrapComponent('CategoryForm', AppFormComponent)({
                        id: 'categoryForm',
                        formManager: this.formManager,
                        fieldTemplates: this.fieldTemplates,
                        formFields: this.state.formFields,
                        className: 'column align-stretch'
                    }) }
                </div>
            </View>)
    }
}