import { Body, Content, ListLimit, ListPages, Sidebar, View } from '../../../../common/AppComponents';
import { CATEGORY_DOMAIN, ITEM_DOMAIN } from '../../../../common/AppConstants';
import { action, getActionData, isApiActionDone } from '../../../../common/AppUtils';
import { get, query } from '../../../../api/ApiActions';

import AppInterceptor from '../../../../app-interceptor/AppInterceptor';
import DisplayOptions from './DisplayOptions';
import React from 'react';
import RecendlyAddedItems from './RecenltyAddedItems';
import SearchBar from './SearchBar';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { searchItems } from '../AppCategoryActions';

const GET_CATEGORY_BY_ID = 'getCategoryById';
const GET_RECENTLY_ADDED = 'getRecentlyAdded';
@connect(state => {
    return {
        api: state.api
    }
})
export default class Category extends React.Component {
    componentWillMount() {
        this.setState({ loaded: false, loadedRecentItems: false, category: {} });
        this.loadCategory();
    }
    loadCategory() {
        this.props.dispatch(get(action(CATEGORY_DOMAIN, GET_CATEGORY_BY_ID), {
            categoryId: this.props.params.categoryId
        }));
        this.loaded = false;
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.loaded && isApiActionDone(this.props.api, action(CATEGORY_DOMAIN, GET_CATEGORY_BY_ID))) {
            const categoryDomain = this.props.api[CATEGORY_DOMAIN][GET_CATEGORY_BY_ID];
            if (!categoryDomain.error) {
                this.setState({
                    loaded: true,
                    category: categoryDomain.data.data
                });
            }
            this.loaded = true;
            this.loadedRecentItems = false;
            this.props.dispatch(query(action(ITEM_DOMAIN, GET_RECENTLY_ADDED), {
                query: {
                    categoryId: this.props.params.categoryId,
                    page_limit: 10
                }
            }));
        }
        else if (!this.loadedRecentItems && isApiActionDone(this.props.api, action(ITEM_DOMAIN, GET_RECENTLY_ADDED))) {
            const recentItems = getActionData(this.props.api, ITEM_DOMAIN, GET_RECENTLY_ADDED, 'data.data.docs');
            this.setState({
                loadedRecentItems: true,
                recentItems
            });
            console.log('recentItems', recentItems);
            this.loadedRecentItems = true;
        }
        if (prevProps.params.categoryId !== this.props.params.categoryId) {
            this.loadCategory();
        }
    }
    handleOnChangeDiplay(display) {
        browserHistory.push('/category/' + this.props.params.categoryId + '/' + display);
    }
    handleOnSearchChange(search, fieldType) {
        this.props.dispatch(searchItems(search, fieldType));
    }
    render() {
        return (<View load={AppInterceptor}>
            <Body className={'app-category'} id="homeBody">
                <h3 class="body-title">{this.state.category.name}<i className={'fa fa-fw fa-lg' + this.state.category.iconGlyph} /></h3>
                <Content loading={!this.state.loaded || !this.state.loadedRecentItems}>
                    <div class="app-category-controls row expanded">
                        <DisplayOptions className={'columns'} onChange={this.handleOnChangeDiplay.bind(this)} category={this.state.category} />
                        <SearchBar className={'columns large-offset-1 large-4 small-12'} onChange={this.handleOnSearchChange.bind(this)} category={this.state.category} />
                        <div class="columns large-offset-5 large-1 no-left-padding">
                            <ListLimit options={[25, 50, 75, 100]} target="categoryGridList" />
                        </div>
                        <div class="columns large-2 no-side-padding">
                            <ListPages target="categoryGridList" />
                        </div>
                    </div>
                    {this.props.categoryContent}
                </Content>
            </Body>
        </View>)
    }
}