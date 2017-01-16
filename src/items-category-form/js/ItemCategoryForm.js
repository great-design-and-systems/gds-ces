import { AppList, AppListActions } from '../../app-list/js/AppListComponent';

import FormItemElement from './components/FormItemElement';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

export class ItemCategoryFormFields extends React.Component {
    componentWillMount() {
        console.log('ItemCategoryFormFields.mount', this.props);
    }
    componentDidUpdate() {
        console.log('ItemCategoryFormFields.update', this.props);
    }
    componentWillReceiveProps(nextProps) {
        console.log('ItemCategoryFormFields', nextProps);
    }
    render() {
        return (
            <fieldset>
                <legend>Connect</legend>
            </fieldset>)
    }
}

@connect()
export class ItemCategoryForm extends React.Component {
    constructor(props) {
        super();
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
            },
            query: {
                limit: 'page_limit={limit}',
                start: 'page_offset={start}',
                order: {
                    asc: 'page_sort={field}',
                    desc: 'page_sort=-{field}'
                },
                filter: 'page_filter={field}:{value}'
            },
            eval: {
                total: 'data.total'
            }
        };
        this.actions = new AppListActions('itemCategoryForm', props.dispatch);
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
        return (<AppList id="itemCategoryForm" listManager={this.listManager} />)
    }
}