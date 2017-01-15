import { AppList, AppListActions } from '../../app-list/js/AppListComponent';

import FormItemElement from './components/FormItemElement';
import React from 'react';
import { connect } from 'react-redux';

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
                component: (field, index) => <FormItemElement onChange={this.handleFormItemChange.bind(this)} key={field._id} field={field} />
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
    handleFormItemChange(event) {
        console.log('onChange', event.target);
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