import { Field, FieldValidator } from '../../../app-form/js/AppForm';
import { clearForm, setId, setManaged } from '../../../app-form/js/AppFormActions';

import AppFormComponent from '../../../app-form/js/AppFormComponent';
import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import { ItemCategoryFormFields } from '../../../items-category-form/js/ItemCategoryForm';
import React from 'react';
import { View } from '../../../common/AppComponents';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { renderField } from '../../../form-fields/js/FormFieldAction';
import { wrapComponent } from '../../../common/AppUtils';

@connect()
export default class ItemForm extends React.Component {
    constructor() {
        super();
    }
    componentWillReceiveProps(nextProps) {
        nextProps.dispatch(clearForm());
        if (nextProps.params && nextProps.params.itemId) {
            nextProps.dispatch(setId(nextProps.params.itemId));
        } else {
            nextProps.dispatch(setId(null));
            nextProps.dispatch(setManaged(false));
        }
    }
    componentWillMount() {
        this.setState({
            item: {}
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
                action: '{Items.createItem}'
            },
            update: {
                action: '{Items.updateItem}',
                params: { itemId: '{id}' }
            },
            delete: {
                action: '{Items.removeItem}',
                params: { itemId: '{id}' }
            },
            get: {
                action: '{Items.getItemsById}',
                params: { itemId: '{id}' },
                eval: 'data'
            },
            deletePopup: {
                title: 'Item',
                message: 'Do you want to remove this item?',
                okButton: 'Yes',
                cancelButton: 'No, wait!'
            }
        };
    }
    createFieldTemplates() {
        this.fieldTemplates = {
            categoryFields: (field, formManager) => {
                return <ItemCategoryFormFields field={field} formManager={formManager} />
            }
        };
    }
    createFormFields() {
        const formFields = [];
        let field = new Field('input');
        field.setLabel('Name');
        field.setName('name');
        field.setRequired(true);
        field.setValidator({
            required: new FieldValidator('onChange', 'Item name is required', (value, done) => {
                done(!!value && value.length);
            })
        })
        formFields.push(field);

        field = new Field('categories');
        field.setRequired(true);
        field.setLabel('Category');
        field.setName('category');
        field.setValidator({
            required: new FieldValidator('onChange', 'Category is required', (value, done) => {
                done(!!value && value.length > 0);
            })
        })
        field.setProperties({
            onChange: (event) => {
                this.props.dispatch(renderField('itemForm', 'fields', {
                    categoryId: event.target.value
                }));
            }
        })
        formFields.push(field);

        field = new Field('categoryFields');
        field.setName('fields');
        field.setLabel('Content');
        formFields.push(field);

        this.setState({
            formFields
        });
    }
    componentWillUnmount() { this.setState({}); }
    render() {
        return (
            <View load={AppInterceptor}>
                <div class="item-form row expanded">
                    {wrapComponent('ItemForm', AppFormComponent)({
                        id: 'itemForm',
                        formManager: this.formManager,
                        fieldTemplates: this.fieldTemplates,
                        formFields: this.state.formFields,
                        className: 'column align-stretch'
                    })}
                </div>
            </View>)
    }
}