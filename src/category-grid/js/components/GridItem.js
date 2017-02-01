import { AppList, AppListActions } from '../../../app-list/js/AppListComponent';

import { Image } from './../../../common/AppComponents';
import React from 'react';
import lodash from 'lodash';

export default class GridItem extends React.Component {
    constructor(props) {
        super();
    }
    renderHeader(item) {
        let headerField = lodash.filter(this.props.fields, field => field.gridView === 'header');
        if (headerField.length) {
            return <h4>{item[headerField[0].name]}</h4>
        }
    }
    renderSubTitle(item) {
        let headerField = lodash.filter(this.props.fields, field => field.gridView === 'subTitle');
        if (headerField.length) {
            return <p>{item[headerField[0].name]}</p>
        }
    }
    render() {
        return (<figure class="effect-goliath">
            <Image fileId={this.props.categoryItem.itemImageId} />
            <figcaption>
                {this.renderHeader(this.props.categoryItem) }
                {this.renderSubTitle(this.props.categoryItem) }
            </figcaption>
        </figure>);
    }
}