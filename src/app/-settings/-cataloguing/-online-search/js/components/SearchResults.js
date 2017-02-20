import React from 'react';
import {AList, AListActions} from '../../../../../../common/AppComponents';
import {connect} from 'react-redux';
import {BOOK_DOMAIN, BOOK_DOMAIN_SEARCH_ONLINE} from '../../../../../../common/AppConstants';
import {action} from '../../../../../../common/AppUtils';
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
                action: action(BOOK_DOMAIN, BOOK_DOMAIN_SEARCH_ONLINE),
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
                        <td>{this.getRecordElement(record, 'publisher')}</td>
                        <td>{this.getRecordElement(record, 'date')}</td>
                        <td>{this.getRecordElement(record, 'language')}</td>
                        <td>{this.getRecordElement(record, 'description')}></td>
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
    getRecordElement(record, field){

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
            <thead>
            <tr>
                <th>Title</th>
                <th>Contributor</th>
                <th>Publisher</th>
                <th>Date</th>
                <th>Language</th>
                <th>Description</th>
            </tr>
            </thead>
            <AList listManager={this.listManager} id="search-results"/>
        </table>)
    }
}