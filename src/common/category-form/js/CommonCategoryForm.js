import { CommonAList, CommonAListActions } from '../../async-list/js/CommonAsyncList';

import FormItemElement from './components/FormItemElement';
import React from 'react';
import { connect } from 'react-redux';
import { get } from '../../../api/ApiActions';
import { isApiActionDone } from '../../AppUtils';
import lodash from 'lodash';

@connect()
export default class CommonCategoryForm extends React.Component {
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
        this.actions = new CommonAListActions(props.id, props.dispatch);
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
                    value = null;
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
            this.props.onChange(event, this.model, fieldConfig);
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
        return (<CommonAList onComplete={this.handleOnComplete.bind(this)} id={this.props.id} listManager={this.listManager} />)
    }
}