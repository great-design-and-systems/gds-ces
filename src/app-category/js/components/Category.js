import { Body, Content, Sidebar, View } from '../../../common/AppComponents';
import { ListLimit, ListPages } from '../../../app-list/js/AppListComponent';
import { action, isApiActionDone } from '../../../common/AppUtils';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import { CATEGORY_DOMAIN } from '../../../common/AppConstants';
import DisplayOptions from './DisplayOptions';
import React from 'react';
import SearchBar from './SearchBar';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { get } from '../../../api/ApiActions';
import { searchItems } from '../AppCategoryActions';

const GET_CATEGORY_BY_ID = 'getCategoryById';
@connect(state => {
    return {
        api: state.api
    }
})
export default class Category extends React.Component {
    componentWillMount() {
        this.setState({ loaded: false, category: {} });
        this.loadCategory();
    }
    loadCategory() {
        this.props.dispatch(get(action(CATEGORY_DOMAIN, GET_CATEGORY_BY_ID), {
            categoryId: this.props.params.categoryId
        }))
        this.loaded = false;
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.loaded && isApiActionDone(this.props.api, action(CATEGORY_DOMAIN, GET_CATEGORY_BY_ID))) {
            const categoryDomain = this.props.api[CATEGORY_DOMAIN][GET_CATEGORY_BY_ID];
            if (!categoryDomain.error) {
                this.setState({
                    loaded: true,
                    category: categoryDomain.data.data
                })
            }
            this.loaded = true;
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
                <Content loading={!this.state.loaded}>
                    <div class="app-category-controls row expanded">
                        <DisplayOptions className={'columns large-1'} onChange={this.handleOnChangeDiplay.bind(this)} category={this.state.category} />
                        <SearchBar className={'columns'} onChange={this.handleOnSearchChange.bind(this)} category={this.state.category} />
                        <div class="columns  large-1">
                            <ListLimit options={[25, 50, 75, 100]} target="categoryGridList" />
                        </div>
                        <div class="columns large-2">
                            <ListPages target="categoryGridList" />
                        </div>
                    </div>
                    {this.props.categoryContent}
                </Content>
            </Body>
        </View>)
    }
}