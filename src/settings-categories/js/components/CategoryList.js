import { AppList, AppListActions, ListSort } from '../../../app-list/js/AppListComponent';
import { setDirty, setTarget } from '../../../app-list/js/AppListActions';

import AppInterceptor from '../../../app/-interceptor/AppInterceptor';
import { Link } from 'react-router';
import React from 'react';
import { Sticky } from 'react-sticky';
import { View } from '../../../common/AppComponents';
import { connect } from 'react-redux';

@connect()
export default class CategoryList extends React.Component {
    constructor(props) {
        super();
        this.actions = new AppListActions('categoryList', props.dispatch);
    }
    componentWillMount() {
        this.setState({});
        this.listManager = {
            root: {
                element: 'tbody'
            },
            get: {
                action: '{Category.getCategoryList}',
                eval: 'data.docs'
            },
            each: {
                component: (category, index) => {
                    return (
                        <tr key={category._id}>
                            <td><Link to={'/settings/categories/' + category._id}>{category.name}</Link></td>
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
    componentWillReceiveProps(){
        console.log('update');
    }
    componentWillUnmount() {
        this.setState({});
    }
    render() {
        return (<View load={AppInterceptor}>
            <div class="expanded">
                <table>
                    <thead>
                        <tr>
                            <th><Sticky topOffset={95}><ListSort target="categoryList" field='name' label='Name' /></Sticky></th>
                        </tr>
                    </thead>
                    <AppList id="categoryList" listManager={this.listManager} />
                </table>
            </div>
        </View>);
    }
}