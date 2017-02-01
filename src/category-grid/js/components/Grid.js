import { AppList, AppListActions } from '../../../app-list/js/AppListComponent';
import { action, getActionData, isApiActionDone } from '../../../common/AppUtils';

import { CATEGORY_DOMAIN } from '../../../common/AppConstants';
import GridItem from './GridItem';
import React from 'react';
import { connect } from 'react-redux';
import {query} from '../../../api/ApiActions';

const GET_ITEM_CATEGORY = 'getItemCategory';
const GET_CATEGORY_BY_ID = 'getCategoryById';
@connect(
    state => {
        return {
            api: state.api
        }
    }
)
export default class Grid extends React.Component {
    constructor(props) {
        super();

        this.actions = new AppListActions('categoryGridList', props.dispatch);
    }
    loadItems() {
        this.listManager = {
            root: {
                element: 'div',
                props: {
                    className: 'category-grid grid'
                }
            },
            get: {
                action: action(CATEGORY_DOMAIN, GET_ITEM_CATEGORY),
                json: {
                    category: this.category.name
                },
                eval: 'data'
            },
            each: {
                component: (categoryItem, index) => {
                    return <GridItem key={categoryItem._id} className={'column column-block'} fields={this.category.fields} categoryItem={categoryItem} />
                }
            },
            query: {
                limit: 'page_limit={limit}',
                start: 'page_offset={start}',
                order: {
                    asc: 'sort={field}',
                    desc: 'sort=-{field}'
                },
                filter: 'page_filter={field}:{value}'
            },
            eval: {
                total: 'data.total'
            }
        };
        this.actions.setDirty(true);
    }
    componentDidUpdate(prevProps) {
        if (this.props.params.categoryId !== prevProps.params.categoryId) {
            this.loadItems();
        }
    }
    componentWillMount() {
        this.category = getActionData(this.props.api, CATEGORY_DOMAIN, GET_CATEGORY_BY_ID, 'data.data');
        this.loadItems();
    }
    render() {
        return (<AppList id="categoryGridList" listManager={this.listManager} />)
    }
}