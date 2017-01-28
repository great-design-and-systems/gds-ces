import { AppList, AppListActions } from '../../app-list/js/AppListComponent';

import { CATEGORY_DOMAIN } from '../../common/AppConstants';
import React from 'react';
import { connect } from 'react-redux';

@connect()
export default class HomeCategories extends React.Component {
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
                    return (<div key={category._id} class="column column-block">
                        <div class="category">
                            <h3> <i className={category.iconGlyph} /></h3>
                            <span class="grid-title">{category.name}</span>
                        </div>
                    </div>)
                }
            }
        }
        this.actions.setDirty(true);
    }
    render() {
        return (<div class="home-categories">
            <AppList id="homeCategories" listManager={this.listManager} />
        </div>);
    }
}