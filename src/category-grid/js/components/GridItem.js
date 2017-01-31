import { AppList, AppListActions } from '../../../app-list/js/AppListComponent';

import { CATEGORY_DOMAIN } from '../../../common/AppConstants';
import { Image } from './../../../common/AppComponents';
import React from 'react';
import { action } from '../../../common/AppUtils';
import { connect } from 'react-redux';
import lodash from 'lodash';

const GET_CATEGORY_ITEM_DATA = 'getCategoryItemData';
@connect()
export default class GridItem extends React.Component {
    constructor(props) {
        super();
    }
    componentWillMount() {
        this.setGridItemState();
    }
    componentDidUpdate(prevProps) {
        this.setGridItemState();
    }
    setGridItemState() {
        this.actions = new AppListActions('gridItemList_' + this.props.categoryItem._id, this.props.dispatch);
        this.listManager = {
            root: {
                element: 'figure',
                props: {
                    className: 'effect-goliath'
                }
            },
            get: {
                action: action(CATEGORY_DOMAIN, GET_CATEGORY_ITEM_DATA),
                eval: 'data',
                params: {
                    categoryId: this.props.categoryItem.category,
                    itemId: this.props.categoryItem._id
                }
            },
            each: {
                component: item => {
                    console.log('item-data', item);
                    return (<span key={item.item._id}>
                        <Image fileId={this.props.categoryItem.imageId} />
                        <figcaption>
                            {this.renderHeader(item)}
                            <p>{this.renderSubTitle(item)}</p>
                        </figcaption>
                    </span>);
                }
            }
        }
        this.actions.setDirty(true);
    }
    renderHeader(item) {
        let headerField = lodash.filter(item.fields, field => field.gridView === 'header');
        if (headerField.length) {
            return <h4>{item.item[headerField[0].name]}</h4>
        }
    }
    renderSubTitle(item) {
        let headerField = lodash.filter(item.fields, field => field.gridView === 'subTitle');
        if (headerField.length) {
            return <p>{item.item[headerField[0].name]}</p>
        }
    }
    render() {
        return <AppList listManager={this.listManager} id={'gridItemList_' + this.props.categoryItem._id} />;
    }
}