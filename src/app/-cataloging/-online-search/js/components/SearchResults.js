import React from 'react';
import {AList, AListActions} from '../../../../../common/AppComponents';
import {connect} from 'react-redux';
import {CATALOGING_DOMAIN, CATALOGING_DOMAIN_SEARCH_ONLINE} from '../../../../../common/AppConstants';
import {action} from '../../../../../common/AppUtils';
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
                emptyComponent: () => (<tr>
                    <td colSpan={6}>No records.</td>
                </tr>),
                component: (record, index) => {
                    return (<tr key={record.controlField['001']}>
                        <td>{this.getRecordElement(record, 'title')}</td>
                        <td>{this.getRecordElement(record, 'author')}</td>
                        <td>{this.getRecordElement(record, 'date')}</td>
                        <td>{this.getRecordElement(record, 'edition')}</td>
                        <td>{this.getRecordElement(record, 'isbn')}</td>
                        <td><a href="#">import</a></td>
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

    getRecordElement(record, field) {
        let recordElement;
        const _245 = record.dataField['245'];
        const _246 = record.dataField['246'];
        const _260 = record.dataField['260'];
        switch (field) {
            case 'title':
            {
                if (_245 && !!_245.a) {
                    recordElement = _245.a;
                } else if (_246 && !!_246.a) {
                    recordElement = _246.a;
                }
                break;
            }
            case 'author':
            {
                if (_245) {
                    recordElement = _245.c;
                }
                break;
            }
            case 'edition':
            {
                const _250 = record.dataField['250'];
                if (_250) {
                    recordElement = _250.a;
                }
                break;
            }

            case 'isbn':
            {
                const _020 = record.dataField['020'];
                if (_020) {
                    recordElement = _020.a;
                }
                break;
            }
            case 'date':
            {
                if (_260) {
                    recordElement = _260.c;
                }
                break;
            }

        }
        return recordElement;
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
        this.actions.setParams({
            source: this.props.onlineSearch.source || 'LIBRARY_OF_CONGRESS'
        });
        this.actions.setQuery({
            query: this.props.onlineSearch.search
        });
        this.actions.setDirty(true);
    }

    render() {
        return (<table>
            <thead class="results-thead">
            <tr>
                <th>Title</th>
                <th>Contributor</th>
                <th>Date</th>
                <th>Edition</th>
                <th>ISBN</th>
                <th>Action</th>
            </tr>
            </thead>
            <AList listManager={this.listManager} id="search-results"/>
        </table>)
    }
}