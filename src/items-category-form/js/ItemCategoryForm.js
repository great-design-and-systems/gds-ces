import { AppList, AppListActions } from '../../app-list/js/AppListComponent';

import FormItemElement from './components/FormItemElement';
import React from 'react';
import { connect } from 'react-redux';
import { get } from '../../api/ApiActions';
import { isApiActionDone } from '../../common/AppUtils';
import lodash from 'lodash';

const CATEGORY_DOMAIN = 'Category';
@connect(state => {
    return {
        form: state.form,
        api: state.api
    }
})
export class ItemCategoryFormFields extends React.Component {
    componentWillMount() {
        this.setCategoryFormFieldsState(this.props);
    }
    componentWillUnmount() {
        this.loaded = false;
    }
    componentWillReceiveProps(nextProps) {
        if (this.updated) {
            nextProps.formManager.triggerValidateHandler(nextProps.field, nextProps.dispatch, 'onChange');
            this.updated = false;
        }
        this.setCategoryFormFieldsState(nextProps);
    }
    loadDataModelValue(props) {
        if (props.form.managed && !this.state.loading && !!props.field.properties.categoryId && !this.loaded) {
            this.setState({ loading: true });
            props.dispatch(get('{' + CATEGORY_DOMAIN + '.getCategoryItemData}', {
                categoryId: props.field.properties.categoryId,
                itemId: props.form.id
            }))
        } else if (!props.api.pending && !!this.state.loading && isApiActionDone(props.api, CATEGORY_DOMAIN + '.getCategoryItemData')) {
            const categoryApi = lodash.get(props.api, CATEGORY_DOMAIN);
            if (categoryApi && categoryApi.getCategoryItemData) {
                if (!categoryApi.getCategoryItemData.error) {
                    props.formManager.setModelValue(props.field, categoryApi.getCategoryItemData.data.data[0].item);
                }
                this.setState({ loading: false });
                this.loaded = true;
            }
        }
    }
    setCategoryFormFieldsState(props) {
        this.setState({
            value: props.field.properties.value || {},
            categoryId: props.field.properties.categoryId
        })
        this.loadDataModelValue(props);
    }
    handleChange(event, model, fieldConfig) {
        this.props.formManager.setModelValue(this.props.field, model);
        this.props.formManager.renderField(this.props.field.form, this.props.field.properties.name, { value: model });
        this.updated = true;
    }
    handleComplete(data, model) {
        this.props.field.fieldData = data;
        if (model) {
            this.props.formManager.setModelValue(this.props.field, model);
        }
    }
    render() {
        return (
            <fieldset>
                <legend>{this.props.field.label}</legend>
                <ItemCategoryForm onComplete={this.handleComplete.bind(this) } value={this.state.value} onChange={this.handleChange.bind(this) } id={this.props.field.properties.name} categoryId={this.state.categoryId} />
            </fieldset>)
    }
}

@connect()
export class ItemCategoryForm extends React.Component {
    constructor(props) {
        super();
        if (!props.id) {
            throw new Error('Property id is required.');
        }
        this.categoryId = props.categoryId;
        this.listManager = {
            root: {
                element: 'div',
                props: {
                    className: 'items-category-forms row expanded'
                }
            },
            get: {
                action: '{Category.getFieldsByCategoryId}',
                eval: 'data',
                params: {
                    categoryId: props.categoryId
                }
            },
            each: {
                component: (field, index) => <FormItemElement value={this.getFieldValue(field) } onChange={this.handleFormItemChange.bind(this) } key={field._id} field={field} />
            }
        };
        this.actions = new AppListActions(props.id, props.dispatch);
    }
    componentWillUnmount() {
        this.model = undefined;
    }
    getFieldValue(field) {
        let value = '';
        if (this.props.value) {
            value = lodash.get(this.props.value, field.name);
            this.setModelValue(field.name, value);
        } else {
            switch (field.fieldType) {
                case 'date':
                    value = null
                    break;
                case 'number':
                    value = 0;
                    break;
                case 'boolean':
                    value = false;
                    break;
            }
        }
        return value;
    }
    setModelValue(field, value) {
        if (!this.model) {
            this.model = {};
        }
        const model = { ...this.model };
        lodash.set(model, field, value);
        this.model = model;
    }
    handleFormItemChange(event, fieldName) {
        this.setModelValue(fieldName, event.target.value);
        if (this.props.onChange) {
            const fieldConfig = lodash.filter(this.fieldData, (field) => {
                return field.name === fieldName
            })[0];
            this.props.onChange(event, model, fieldConfig);
        }
    }
    componentWillMount() {
        this.setState({});
        this.actions.setDirty(true);
    }
    componentDidUpdate(prevProps) {
        if (this.props.categoryId !== prevProps.categoryId) {
            this.actions.setParams({
                categoryId: this.props.categoryId
            });
            this.categoryId = this.props.categoryId;
            this.actions.setDirty(true);
        }
    }
    handleOnComplete(data) {
        this.fieldData = data;
        if (this.props.onComplete) {
            this.props.onComplete(data, this.model);
        }
    }
    render() {
        return (<AppList onComplete={this.handleOnComplete.bind(this) } id={this.props.id} listManager={this.listManager} />)
    }
}