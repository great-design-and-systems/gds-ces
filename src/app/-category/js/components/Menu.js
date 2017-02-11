import { AList, AListActions } from '../../../../common/AppComponents';

import { CATEGORY_DOMAIN } from '../../../../common/AppConstants';
import { Link } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';

@connect()
export default class Menu extends React.Component {
    constructor(props) {
        super();
        this.listManager = {
            root: {
                element: 'ul',
                props: {
                    className: 'common-links vertical menu'
                }
            },
            get: {
                action: '{' + CATEGORY_DOMAIN + '.getCategoryList}',
                eval: 'data.docs'
            },
            each: {
                preComponent: () =>
                    (<li key={'categoryItemMenu_preComponent'}><div class="row">
                        <div class="column"><Link to={'/home'}>
                            <i className={'link-icon fa fa-home'} />
                            <span class="link-label"> Home</span></Link>
                        </div>
                    </div></li>)
                ,
                component: (category, index) => {
                    const categoryLink = '/category/' + category._id;
                    let link = (<Link to={categoryLink}>
                        <i className={'link-icon ' + category.iconGlyph} />
                        <span class="link-label"> {category.name}</span></Link>);

                    if (this.props.location.pathname.indexOf(categoryLink) > -1) {
                        link = (<span> <i className={'link-icon ' + category.iconGlyph} />
                            <span class="link-label"> {category.name}</span></span>)
                    }
                    return (<li key={category._id}>
                        <div class="row">
                            <div class="column">
                                {link}
                            </div>
                        </div>
                    </li>)
                }
            }
        }
        this.actions = new AListActions('categoryItemMenu', props.dispatch);
    }
    componentWillMount() {
        this.actions.setDirty(true);
    }
    render() {
        return <AList id="categoryItemMenu" listManager={this.listManager} />
    }
}