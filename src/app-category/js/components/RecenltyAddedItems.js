import { AppList, AppListActions } from '../../../app-list/js/AppListComponent';

import { ITEM_DOMAIN } from '../../../common/AppConstants';
import React from 'react';
import Slider from 'react-slick';
import { action } from '../../../common/AppUtils';
import { connect } from 'react-redux';

const GET_RECENTLY_ADDED = 'getRecentlyAdded';
@connect()
export default class RecenltyAddedItems extends React.Component {
    constructor(props) {
        super();
        this.actions = new AppListActions('recentlyAddedCarousel', props.dispatch);
    }
    componentWillMount() {
        this.setRecentlyAddedItemsState(this.props);
    }
    componentDidUpdate(prevProps) {
        if (this.prevProps.props.category._id !== this.props.props.category._id) {
            this.setRecentlyAddedItemsState(this.props);
        }
    }
    setRecentlyAddedItemsState(props) {
        this.listManager = {
            root: {
                element: 'Slider'
            },
            each: {
                component: item => {
                    return <div>{item.name}</div>
                }
            },
            get: {
                action: action(ITEM_DOMAIN, GET_RECENTLY_ADDED),
                query: {
                    categoryId: props.category._id,
                    page_limit: 10
                },
                eval: 'data.docs'
            },
            query: {
                limit: 'page_limit={limit}',
                start: 'page_offset={start}'
            }
        };
        this.actions.setDirty(true);
    }
    render() {
        return <AppList id="recentlyAddedCarousel" listManager={this.listManager} />;
    }
}