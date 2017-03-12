import React from 'react';
import {browserHistory} from 'react-router';
import SearchBar from './SearchBar';
import SearchSources from './SearchSources';
import {connect} from 'react-redux';
import {searchOnline,searchOnlineDone, changeSource} from '../OnlineSearchActions';
import {BatchAction, action, isApiActionLoading, getRandomColor} from '../../../../../common/AppUtils';
import {CATALOGING_DOMAIN, CATALOGING_DOMAIN_SEARCH_ONLINE} from '../../../../../common/AppConstants';
import {Fieldset} from '../../../../../common/AppComponents';
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
            <div class="content-header">
                <div class="row">
                    <SearchBar onChange={this.handleSearchOnChange.bind(this)}/>
                    <SearchSources onChange={this.handleSourceOnChange.bind(this)}/>
                </div>
            </div>
            <div></div>
            <div class="online-search-content large-10 large-offset-1">
                <Fieldset icon={isApiActionLoading(this.props.api, action(CATALOGING_DOMAIN, CATALOGING_DOMAIN_SEARCH_ONLINE)) ? <i className="fa fa-spin fa-spinner"/>:''} alwaysOpen={true}
                          legend={'Online Search'}>{this.props.searchContent}</Fieldset>
            </div>
        </div>)
    }
}