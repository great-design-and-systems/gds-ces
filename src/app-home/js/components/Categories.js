import { AppList, AppListActions } from '../../../app-list/js/AppListComponent';

import { CATEGORY_DOMAIN } from '../../../common/AppConstants';
import { Link } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';
import { getRandomColor } from '../../../common/AppUtils';

@connect()
export default class Categories extends React.Component {
    constructor(props) {
        super();
        this.actions = new AppListActions('homeCategories', props.dispatch);
    }
    componentWillMount() {
        this.listManager = {
            root: {
                element: 'div',
                props: {
                    className: 'row expanded small-up-2 medium-up-3 large-up-4 align-center align-middle'
                }
            },
            get: {
                action: '{' + CATEGORY_DOMAIN + '.getCategoryList}',
                eval: 'data.docs'
            },
            each: {
                component: (category, index) => {
                    return (<Link to={'/category/' + category._id} style={{ background: getRandomColor() }} key={category._id} className={'column column-block'}>
                        <div class="category">
                            <h3> <i className={category.iconGlyph} /></h3>
                            <span class="grid-title">{category.name}</span>
                        </div>
                    </Link>)
                }
            }
        }
        this.actions.setDirty(true);
    }
    render() {
        return (<div class="home-categories large-9 large-offset-1 small-11 small-offset-2">
            <AppList id="homeCategories" listManager={this.listManager} />
        </div>);
    }
}