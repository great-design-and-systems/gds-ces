import { AppList, ListSort } from '../../../app-list/js/AppListComponent';
import { setDirty, setTarget } from '../../../app-list/js/AppListActions';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import Intercept from '../../../common-view/js/Intercept';
import { Link } from 'react-router';
import React from 'react';
import { Sticky } from 'react-sticky';
import { connect } from 'react-redux';

@connect()
export default class CategoryList extends React.Component {
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
        this.props.dispatch(setTarget('categoryList'));
        this.props.dispatch(setDirty(true));
    }
    render() {
        return (<Intercept load={AppInterceptor}>
            <table>
                <thead>
                    <tr>
                        <th><Sticky topOffset={95}><ListSort target="categoryList" field='name' label='Name' /></Sticky></th>
                    </tr>
                </thead>
                <AppList id="categoryList" listManager={this.listManager} />
            </table>
        </Intercept>);
    }
}