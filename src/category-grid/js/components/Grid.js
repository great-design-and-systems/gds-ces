import { AppList, AppListActions } from '../../../app-list/js/AppListComponent';

import GridItem from './GridItem';
import { ITEM_DOMAIN } from '../../../common/AppConstants';
import React from 'react';
import { action } from '../../../common/AppUtils';
import { connect } from 'react-redux';

const GET_ITEMS = 'getItems';
@connect()
export default class Grid extends React.Component {
    constructor(props) {
        super();
        this.listManager = {
            root: {
                element: 'div',
                props: {
                    className: 'category-grid grid'
                }
            },
            get: {
                action: action(ITEM_DOMAIN, GET_ITEMS),
                query: {
                    categoryId: props.params.categoryId
                },
                eval: 'data.docs'
            },
            each: {
                component: (categoryItem, index) => {
                    return <GridItem key={categoryItem._id} className={'column column-block'} categoryItem={categoryItem} />
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
        this.actions = new AppListActions('categoryGridList', props.dispatch);
    }
    componentWillMount() {
        this.actions.setDirty(true);
    }
    render() {
        return (<AppList id="categoryGridList" listManager={this.listManager} />)
    }
}