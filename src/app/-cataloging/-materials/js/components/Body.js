import React from 'react';
import {Fieldset,AList, AListActions, ListPages} from '../../../../../common/AppComponents';
import {connect} from 'react-redux';
import {action} from '../../../../../common/AppUtils';
import {CATALOGING_DOMAIN, CATALOGING_DOMAIN_GET_ITEMS} from '../../../../../common/AppConstants';
@connect()
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
                    <td><a href="#">view</a></td>
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

    render() {
        return (<div class="card-catalog">
            <div class="large-8 large-offset-2">
                <Fieldset alwaysOpen={true} legend="materials">
                    <table class="materials-results">
                        <thead class="thead-style">
                        <tr>
                            <td colSpan={4}>
                                <div class="thead-pages"><ListPages target="materials"/></div>
                            </td>
                        </tr>
                        <tr>
                            <th>Control Number</th>
                            <th>Title</th>
                            <th>Format</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <AList listManager={this.listManager} id="materials"/>
                    </table>
                </Fieldset>
            </div>
        </div>);
    }
}