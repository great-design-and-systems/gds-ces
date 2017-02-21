import React from 'react';
import {browserHistory} from 'react-router';
import SearchBar from './SearchBar';
import SearchSources from './SearchSources';
import {connect} from 'react-redux';
import {searchOnline,searchOnlineDone, changeSource} from '../OnlineSearchActions';
import {BatchAction, action, isApiActionLoading, getRandomColor} from '../../../../../../common/AppUtils';
import {BOOK_DOMAIN, BOOK_DOMAIN_SEARCH_ONLINE} from '../../../../../../common/AppConstants';
import Loading from 'react-loading';
@connect(state => {
    return {
        onlineSearch: state.onlineSearch,
        api: state.api
    };
})
export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        browserHistory.push('/settings/cataloguing/online_search/results');
    }

    handleSearchOnChange(searchValue) {
        this.props.onlineSearch.batchProcessor.push(new BatchAction('search_online', (done) => {
            setTimeout(()=> {
                done(searchValue)
            }, 200);
        }));
        if (!this.props.onlineSearch.batchProcessor.isRunning()) {
            this.props.onlineSearch.batchProcessor.execute(result => {
                this.props.dispatch(searchOnline(result));
            })
        }
    }

    handleSourceOnChange(searchSource) {
        this.props.dispatch(changeSource(searchSource));
    }

    render() {
        return (<div class="online-search body">
            <div class="row header expanded">
                <h5 class="header-title">Online Search</h5>
                {isApiActionLoading(this.props.api, action(BOOK_DOMAIN, BOOK_DOMAIN_SEARCH_ONLINE)) ?
                    <Loading type="bubbles" color={getRandomColor()}/> : <div></div>}
                <div class="column"></div>
            </div>
            <div class="row search-container">
                <SearchBar onChange={this.handleSearchOnChange.bind(this)}/>
                <SearchSources onChange={this.handleSourceOnChange.bind(this)}/>
                <div class="column"></div>
            </div>

            {this.props.searchContent}
        </div>)
    }
}