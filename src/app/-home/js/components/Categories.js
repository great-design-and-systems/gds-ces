import { AList, AListActions } from '../../../../common/AppComponents';

import { CATEGORY_DOMAIN } from '../../../../common/AppConstants';
import { Link } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';
import { getRandomColor } from '../../../../common/AppUtils';

@connect()
export default class Categories extends React.Component {
    constructor(props) {
        super();
        this.actions = new AListActions('homeCategories', props.dispatch);
    }
    componentWillMount() {
        this.listManager = {
            root: {
                element: 'div',
                props: {
                    className: 'row small-up-2 medium-up-3 large-up-4 align-center align-middle'
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
        return (<div class="home-categories expanded small-10 small-offset-1">
            <AList id="homeCategories" listManager={this.listManager} />
        </div>);
    }
}