import React from 'react';
import {AList, AListActions} from '../../../../../common/AppComponents';
import {connect} from 'react-redux';
import {CATALOGING_DOMAIN, CATALOGING_DOMAIN_SEARCH_ONLINE} from '../../../../../common/AppConstants';
import {action} from '../../../../../common/AppUtils';
import lodash from 'lodash';

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
                component: record => {
                    return (<tr key={record.controlField['001']}>
                        <td><p>
                            {this.getRecordElement(record, 'title')}
                            {this.getRecordElement(record, 'description')}
                        </p></td>
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
            case 'description':
            {
                if (_245 && !!_245.b) {
                    recordElement = _245.b;
                } else if (_246 && !!_246.b) {
                    recordElement = _246.b;
                }
                break;
            }
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
                const contributorFields = ['100', '400', '600', '700', '800'];
                let index = 0;
                let authorField;
                do {
                    authorField = record.dataField[contributorFields[index]];
                    if (authorField) {
                        if (authorField instanceof Array) {
                            recordElement = '';
                            lodash.forEach(authorField, (value, index)=> {
                                if (index > 0) {
                                    recordElement += ', ';
                                }
                                recordElement += value.a;
                            });
                        } else {
                            recordElement = authorField.a;
                        }
                    }
                    index++;
                } while (!authorField && index < contributorFields.length);
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
                    if (_020 instanceof Array) {
                        recordElement = '';
                        lodash.forEach(_020, (value, index)=> {
                            if (index > 0) {
                                recordElement += ', ';
                            }
                            recordElement += value.a;
                        });
                    } else {
                        recordElement = _020.a;
                    }
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
        return (<table>
            <thead class="results-thead">
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