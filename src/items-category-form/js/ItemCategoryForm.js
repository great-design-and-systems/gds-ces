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
        this.setCategoryFormFieldsState(nextProps);
    }
    setCategoryFormFieldsState(props) {
        this.setState({
            categoryId: props.field.properties.categoryId
        })
    }
    render() {
        return (
            <fieldset>
                <legend>Connect</legend>
                <ItemCategoryForm id={this.props.field.properties.name.hashCode()} categoryId={this.state.categoryId} />
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
                    className: 'row expanded'
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
        if (!this.model) {
            this.model = {};
        }
        const model = { ...this.model };
        lodash.set(model, fieldName, event.target.value);
        this.model = model;
        if (this.props.onChange) {
            this.props.onChange(event, model);
        }
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
            this.categoryId = nextProps.categoryId;
        }
    }
    render() {
        return (<AppList id={this.props.id} listManager={this.listManager} />)
    }
}