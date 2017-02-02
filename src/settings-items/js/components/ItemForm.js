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
        if (this.props.params && this.props.params.itemId) {
            this.props.dispatch(setId(this.props.params.itemId));
        } else {
            this.props.dispatch(setId(null));
            this.props.dispatch(setManaged(false));
        }
    }
    createFormManager() {
        this.formManager = {
            create: {
                action: '{Items.createItemWithContent}'
            },
            update: {
                action: '{Items.updateItemWithContent}',
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

        field = new Field('input');
        field.setRequired(true);
        field.setLabel('Serial');
        field.setName('code');
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
                this.props.dispatch(renderField('itemForm', 'content', {
                    categoryId: event.target.value
                }));
            },
            onComplete: (value, data) => {
                if (!!value) {
                    this.props.dispatch(renderField('itemForm', 'content', {
                        categoryId: value
                    }));
                }
            }
        })
        formFields.push(field);

        field = new Field('column');
        field.setProperties({
            className: 'large-6 medium-6 small-12'
        })
        formFields.push(field);

        field = new Field('imageupload');
        field.setLabel('Image');
        field.setName('imageId');
        field.setRequired(true);
        field.setValidator({
            required: new FieldValidator('onChange', 'Item image is required', (value, done) => {
                done(!!value && value.length);
            })
        })
        formFields.push(field);

        field = new Field('column');
        field.setProperties({
            className: 'large-6 medium-6 small-12'
        })
        formFields.push(field);

        field = new Field('column');
        field.setProperties({
            className: 'large-12 medium-12 small-12'
        })
        formFields.push(field);

        field = new Field('categoryFields');
        field.setName('content');
        field.setLabel('Content');
        field.setValidator({
            required: new FieldValidator('onChange', 'Please fill out all the required contents', (value, done) => {
                let valid = true;
                let fieldInvalid;
                lodash.forIn(field.fieldData, fieldConfig => {
                    if (valid && fieldConfig.isRequired) {
                        const fieldValue = lodash.get(value, fieldConfig.name);
                        valid = !!fieldValue;
                        if (!valid) {
                            fieldInvalid = fieldConfig;
                        }
                    }
                });
                done(valid, fieldInvalid ? fieldInvalid.name + ' is required' : null);
            })
        });
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
                    }) }
                </div>
            </View>)
    }
}