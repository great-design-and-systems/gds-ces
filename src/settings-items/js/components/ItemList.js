import { AppList, AppListActions, ListSort } from '../../../app-list/js/AppListComponent';
import { setDirty, setTarget } from '../../../app-list/js/AppListActions';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import { Link } from 'react-router';
import React from 'react';
import { Sticky } from 'react-sticky';
import { View } from '../../../common/AppComponents';
import { connect } from 'react-redux';

@connect()
export default class CategoryList extends React.Component {
    constructor(props) {
        super();
        this.actions = new AppListActions('itemList', props.dispatch);
    }
    componentWillMount() {
        this.setState({});
        this.listManager = {
            root: {
                element: 'tbody'
            },
            get: {
                action: '{Items.getItems}',
                eval: 'data.docs'
            },
            each: {
                component: (item, index) => {
                    return (
                        <tr key={item._id}>
                            <td><Link to={'/settings/items/' + item._id}>{item.name}</Link></td>
                            <td>{item.categoryName}</td>
                        </tr>)
                }
            },
            query: {
                limit: 'page_limit={limit}',
                start: 'page_offset={start}',
                order: {
                    asc: 'page_sort={field}',
                    desc: 'page_sort=-{field}'
                },
                filter: 'page_filter={field}:{value}'
            },
            eval: {
                total: 'data.total'
            }
        }
        this.actions.setDirty(true);
    }
    componentWillUnmount() {
        this.setState({});
    }
    render() {
        return (<View load={AppInterceptor}>
            <div class="expanded">
                <h4>Items</h4>
                <table>
                    <thead>
                        <tr>
                            <th><ListSort target="itemList" field='name' label='Name' /></th>
                            <th><ListSort target="itemList" field='categoryName' label='Category' /></th>
                        </tr>
                    </thead>
                    <AppList id="itemList" listManager={this.listManager} />
                </table>
            </div>
        </View>);
    }
}