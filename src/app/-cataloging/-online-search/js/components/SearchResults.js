import React from 'react';
import {AList, AListActions, ListPages} from '../../../../../common/AppComponents';
import {connect} from 'react-redux';
import {CATALOGING_DOMAIN, CATALOGING_DOMAIN_SEARCH_ONLINE} from '../../../../../common/AppConstants';
import {browserHistory} from 'react-router';
import {action} from '../../../../../common/AppUtils';
import lodash from 'lodash';
import {setMarc} from '../../../js/CatalogingActions';
import GetRecordElement from '../control/GetRecordElement';
@connect(state => {
    return {
        onlineSearch: state.onlineSearch
    };
})
export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.actions = new AListActions('search-results', this.props.dispatch);
        this.loadItems();
    }

    handleOnImport(record) {
        this.props.dispatch(setMarc(record));
        browserHistory.push('/cataloging/import');
    }

    loadItems() {
        this.listManager = {
            root: {
                element: 'tbody',
                props: {
                    className: 'search-results'
                }
            },
            get: {
                action: action(CATALOGING_DOMAIN, CATALOGING_DOMAIN_SEARCH_ONLINE),
                eval: 'data.data'
            },
            each: {
                emptyComponent: () => (<tr key={'no_records_key'}>
                    <td colSpan={6}>No records.</td>
                </tr>),
                component: record => {
                    return (<tr key={record.controlField['001']}>
                        <td><p>
                            {GetRecordElement(record, 'title')}
                            {GetRecordElement(record, 'description')}
                        </p></td>
                        <td>{GetRecordElement(record, 'author')}</td>
                        <td>{GetRecordElement(record, 'date')}</td>
                        <td>{GetRecordElement(record, 'edition')}</td>
                        <td>{GetRecordElement(record, 'isbn')}</td>
                        <td><a onClick={this.handleOnImport.bind(this, record)} class="clicker">import</a></td>
                    </tr>);
                }
            },
            query: {
                limit: 'maximumRecords={limit}',
                start: 'startRecord={start}'
            },
            eval: {
                total: 'data.totalRecords'
            }
        };
    }

    componentWillMount() {
        if (this.props.onlineSearch.search) {
            this.executeSearch();
        }
    }

    componentDidUpdate(prevprops) {
        if (this.props.onlineSearch.search !== prevprops.onlineSearch.search) {
            this.executeSearch();
        } else if (!!this.props.onlineSearch.search && (this.props.onlineSearch.source !== prevprops.onlineSearch.source)) {
            this.executeSearch();
        }
    }

    executeSearch() {
        const source = this.props.onlineSearch.source || 'LIBRARY_OF_CONGRESS'
        this.actions.setParams({
            source: source
        });
        const search = this.props.onlineSearch.search;

        if (search) {
            const splitSearch = search.split('=');
            const searchType = splitSearch[0];
            const keyMap = SourceKeyMap[source][searchType];
            this.actions.setQuery({
                query: keyMap + '.' + search
            });
        } else {
            this.actions.setQuery({
                query: this.props.onlineSearch.search
            });
        }

        this.actions.setDirty(true);
    }

    render() {
        return (<table class="search-results">
            <thead class="results-thead">
            <tr>
                <th colSpan={6}>
                    <div class="search-results-controls">
                        <ListPages target="search-results"/>
                    </div>
                </th>
            </tr>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Edition</th>
                <th>ISBN</th>
                <th>Action</th>
            </tr>
            </thead>
            <AList listManager={this.listManager} id="search-results"/>
            <tfoot class="results-thead">
            <tr>
                <td>Title</td>
                <td>Author</td>
                <td>Date</td>
                <td>Edition</td>
                <td>ISBN</td>
                <td>Action</td>
            </tr>
            <tr>
                <td colSpan={6}>
                    <div class="search-results-controls">
                        <ListPages target="search-results"/>
                    </div>
                </td>
            </tr>
            </tfoot>
        </table>)
    }
}


const SourceKeyMap = {
    LIBRARY_OF_CONGRESS: {
        isbn: 'bath',
        title: 'dc',
        author: 'dc',
        subject: 'dc'
    }
};