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
                eval: 'data.results',
                query: {
                    fo: 'json'
                }
            },
            each: {
                component: (resultItem, index) => {
                    const contributor = [];
                    if (resultItem.contributor) {
                        resultItem.contributor.forEach(contr=> {
                            contributor.push(<div>{contr}</div>);
                        });
                    }
                    return (<tr key={(resultItem.id+'_'+index).hashCode()}>
                        <td>{resultItem.title}</td>
                        <td>{contributor}</td>
                    </tr>)
                }
            },
            query: {
                limit: 'c={limit}',
                start: 'si={start}'
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
        this.actions.setParams({
            format: 'books',
            source: this.props.onlineSearch.source || 'LIBRARY_OF_CONGRESS'
        });
        this.actions.setQuery({
            q: this.props.onlineSearch.search
        });
        this.actions.setDirty(true);
    }

    render() {
        return (<table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Contributor</th>
            </tr>
            </thead>
            <AList listManager={this.listManager} id="search-results"/>
        </table>)
    }
}