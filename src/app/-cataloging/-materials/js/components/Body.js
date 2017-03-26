import { AList, AListActions, Fieldset, ListPages } from '../../../../../common/AppComponents';
import { BatchAction, action, isApiActionLoading } from '../../../../../common/AppUtils';
import { CATALOGING_DOMAIN, CATALOGING_DOMAIN_GET_ITEMS } from '../../../../../common/AppConstants';

import { Link } from 'react-router';
import React from 'react';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';

@connect(state => {
    return { cataloging: state.cataloging, api: state.api }
})
export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.actions = new AListActions('materials', this.props.dispatch);
        this.loadItems();
    }

    componentWillMount() {
        this.actions.setDirty(true);
    }

    loadItems() {
        this.listManager = {
            root: {
                element: 'tbody',
                props: {
                    className: 'materials'
                }
            },
            get: {
                action: action(CATALOGING_DOMAIN, CATALOGING_DOMAIN_GET_ITEMS),
                eval: 'data.docs'
            },
            each: {
                emptyComponent: () => (<tr key={'no_records_key'}>
                    <td colSpan={4}>No records.</td>
                </tr>),
                component: record => (<tr>
                    <td>{record.controlNumber}</td>
                    <td><p>
                        {record.title}
                        {record.remainderOfTitle}
                    </p></td>
                    <td>{record.categoryName}</td>
                    <td><Link to={'/cataloging/card-view/' + record.categoryName + '/' + record._id}>view</Link></td>
                </tr>)
            },
            query: {
                limit: 'page_limit={limit}',
                start: 'page_offset={start}'
            },
            eval: {
                total: 'data.limit'
            }
        };
    }

    handleSearchOnChange(searchValue) {
        this.props.cataloging.batchProcessor.push(new BatchAction('search_online', (done) => {
            setTimeout(() => {
                done(searchValue)
            }, 200);
        }));
        if (!this.props.cataloging.batchProcessor.isRunning()) {
            this.props.cataloging.batchProcessor.execute(result => {
                this.actions.setQuery({ search: result });
                this.actions.setDirty(true);
            });
        }
    }

    render() {
        return (<div class="materials">
            <div class="content-header">
                <div class="row">
                    <div><SearchBar onChange={this.handleSearchOnChange.bind(this)} /></div>
                </div>
            </div>
            <div class="materials-content large-10 large-offset-1">
                <Fieldset alwaysOpen={true} legend="Materials"
                    icon={isApiActionLoading(this.props.api, action(CATALOGING_DOMAIN, CATALOGING_DOMAIN_GET_ITEMS)) ? <i className="fa fa-spin fa-spinner" /> : ''}>
                    <table class="materials-results">
                        <thead class="thead-style">
                            <tr>
                                <td colSpan={4}>
                                    <div class="row">
                                        <div class="thead-pages"><ListPages target="materials" /></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Control Number</th>
                                <th>Title</th>
                                <th>Format</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <AList listManager={this.listManager} id="materials" />
                    </table>
                </Fieldset>
            </div>
        </div>);
    }
}