import { Field, FieldValidator } from '../../../../-form/js/AppForm';
import { action, wrapComponent } from '../../../../../common/AppUtils';
import { clearForm, setId, setManaged } from '../../../../-form/js/AppFormActions';
import AppFormComponent from '../../../../-form/js/AppFormComponent';
import AppInterceptor from '../../../../-interceptor/AppInterceptor';
import { ITEM_DOMAIN } from '../../../../../common/AppConstants';
import React from 'react';
import { View } from '../../../../../common/AppComponents';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { renderField } from '../../../../-form/-fields/js/FormFieldAction';

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
        });
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
        });
        formFields.push(field);

        field = new Field('column');
        field.setProperties({
            className: 'large-6 medium-6 small-12'
        });
        formFields.push(field);

        field = new Field('imageupload');
        field.setLabel('Image');
        field.setName('imageId');
        field.setRequired(true);
        field.setValidator({
            required: new FieldValidator('onChange', 'Item image is required', (value, done) => {
                done(!!value && value.length);
            })
        });
        formFields.push(field);

        field = new Field('column');
        field.setProperties({
            className: 'large-6 medium-6 small-12'
        });
        formFields.push(field);

        field = new Field('column');
        field.setProperties({
            className: 'large-12 medium-12 small-12'
        });
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
    handleSubmitSuccess() {
        browserHistory.push('/settings/items');
    }
    render() {
        return (
            <View load={AppInterceptor}>
                <div class="item-form row expanded">
                    {wrapComponent('ItemForm', AppFormComponent)({
                        id: 'itemForm',
                        formManager: this.formManager,
                        formFields: this.state.formFields,
                        className: 'column align-stretch',
                        onSubmitSuccess: this.handleSubmitSuccess.bind(this)
                    })}
                </div>
            </View>)
    }
}