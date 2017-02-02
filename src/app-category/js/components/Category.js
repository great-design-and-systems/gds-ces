import { Body, Content, Sidebar, View } from '../../../common/AppComponents';
import { action, isApiActionDone } from '../../../common/AppUtils';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import { CATEGORY_DOMAIN } from '../../../common/AppConstants';
import DisplayOptions from './DisplayOptions';
import {ListPages} from '../../../app-list/js/AppListComponent';
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
                <Content loading={!this.state.loaded}>
                    <h3 class="content-title">{this.state.category.name}<i className={'fa fa-fw fa-lg' + this.state.category.iconGlyph} /></h3>
                    <DisplayOptions onChange={this.handleOnChangeDiplay.bind(this) } category={this.state.category} />
                    <ListPages target="categoryGridList" />
                    <SearchBar onChange={this.handleOnSearchChange.bind(this) } category={this.state.category} />
                    {this.props.categoryContent}
                </Content>
            </Body>
        </View>)
    }
}