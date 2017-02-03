import {AppList} from '../../../app-list/js/AppListComponent';
import {ITEM_DOMAIN} from '../../../common/AppConstants';
import React from 'react';
import Slider from 'react-slider';
import {action} from '../../../common/AppUtils';
import {connect} from 'react-redux';

const GET_RECENTLY_ADDED = 'getRecentlyAdded';
@Connect()
export default class RecenltyAddedItems extends React.Component {
    constructor(props) {
        super();
        this.listManager = {
            root: {
                element: 'Slider',
                props: {

                }
            },
            get: {
                action: action(ITEM_DOMAIN, GET_RECENTLY_ADDED),
                query: {
                    categoryId: props.params.categoryId
                },
                eval: 'data.docs'
            }
        };
    }
    render() {
        return <AppList />;
    }
}