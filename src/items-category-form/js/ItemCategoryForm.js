import { AppList, AppListActions } from '../../app-list/js/AppListComponent';

import FormItemElement from './components/FormItemElement';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect()
export class ItemCategoryFormFields extends React.Component {
    componentWillMount() {
        this.setCategoryFormFieldsState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (this.updated) {
            nextProps.formManager.triggerEventHandler(nextProps.field, nextProps.dispatch, 'onChange');
            this.updated = false;
        } else {
            this.setCategoryFormFieldsState(nextProps);
        }
    }
    setCategoryFormFieldsState(props) {
        this.setState({
            value: props.field.properties.value || {},
            categoryId: props.field.properties.categoryId
        })
    }
    handleChange(event, model, fieldConfig) {
        this.props.formManager.setModelValue(this.props.field, model);
        this.updated = true;
    }
    handleComplete(data) {
        this.props.field.fieldData = data;
    }
    render() {
        return (
            <fieldset>
                <legend>{this.props.field.label}</legend>
                <ItemCategoryForm onComplete={this.handleComplete.bind(this)} value={this.state.value} onChange={this.handleChange.bind(this)} id={this.props.field.properties.name} categoryId={this.state.categoryId} />
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
                component: (field, index) => <FormItemElement value={this.getFieldValue(field)} onChange={this.handleFormItemChange.bind(this)} key={field._id} field={field} />
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
    handleFormItemChange(event, fieldName) {
        console.log('fieldName', fieldName);
        console.log('event', event);
        if (!this.model) {
            this.model = {};
        }
        const model = { ...this.model };
        lodash.set(model, fieldName, event.target.value);
        this.model = model;
        if (this.props.onChange) {
            const fieldConfig = lodash.filter(this.fieldData, (field) => {
                return field.name === fieldName
            })[0];
            this.props.onChange(event, model, fieldConfig);
        }
        console.log('model', model);
    }
    componentWillMount() {
        this.setState({});
        this.actions.setDirty(true);
    }
    componentWillReceiveProps(nextProps) {
        if (this.categoryId !== nextProps.categoryId) {
            this.actions.setParams({
                categoryId: nextProps.categoryId
            });
            this.actions.setDirty(true);
            this.categoryId = nextProps.categoryId;
        }
    }
    handleOnComplete(data) {
        this.fieldData = data;
        if (this.props.onComplete) {
            this.props.onComplete(data);
        }
    }
    render() {
        return (<AppList onComplete={this.handleOnComplete.bind(this)} id={this.props.id} listManager={this.listManager} />)
    }
}