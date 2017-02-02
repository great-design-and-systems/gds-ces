import { AppList, AppListActions } from '../../../app-list/js/AppListComponent';
import { BatchAction, action, getActionData, isApiActionDone } from '../../../common/AppUtils';
import { clear, query } from '../../../api/ApiActions';

import { CATEGORY_DOMAIN } from '../../../common/AppConstants';
import GridItem from './GridItem';
import React from 'react';
import { connect } from 'react-redux';
import { searchItemsDone } from '../../../app-category/js/AppCategoryActions';

const GET_ITEM_CATEGORY = 'getItemCategory';
const GET_CATEGORY_BY_ID = 'getCategoryById';
@connect(
    state => {
        return {
            api: state.api,
            appCategory: state.appCategory
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
                eval: 'data.docs'
            },
            each: {
                component: (categoryItem, index) => {
                    return <GridItem key={categoryItem._id} className={'column column-block'} fields={this.category.fields} categoryItem={categoryItem} />
                }
            },
            query: {
                limit: 'page_limit={limit}',
                start: 'page_offset={start}'
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
        else if (this.props.appCategory.search !== prevProps.appCategory.search || this.props.appCategory.field !== prevProps.appCategory.field) {
            this.props.appCategory.batchProcessor.push(
                new BatchAction('search_item', (done) => {
                    this.actions.setJson({
                        category: this.category.name,
                        query: {
                            $search: {
                                field: this.props.appCategory.field,
                                value: this.props.appCategory.search
                            }
                        }
                    });
                    done();
                })
            );
            if (!this.props.appCategory.batchProcessor.isRunning()) {
                this.props.appCategory.batchProcessor.execute(() => {
                    this.actions.setDirty(true);
                });
            }
        }
    }
    componentWillUnmount() {
        this.props.dispatch(clear(action(CATEGORY_DOMAIN, GET_ITEM_CATEGORY)));
    }
    componentWillMount() {
        this.category = getActionData(this.props.api, CATEGORY_DOMAIN, GET_CATEGORY_BY_ID, 'data.data');
        this.loadItems();
    }
    handleOnComplete() {
        this.props.dispatch(searchItemsDone());
    }
    render() {
        return (<AppList id="categoryGridList" onComplete={this.handleOnComplete.bind(this) } listManager={this.listManager} />)
    }
}