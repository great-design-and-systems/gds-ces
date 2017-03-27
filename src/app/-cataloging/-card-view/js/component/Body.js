import { CATALOGING_DOMAIN, CATALOGING_DOMAIN_GET_ITEM_CATEGORY } from '../../../../../common/AppConstants';
import { action, getActionData, isApiActionDone } from '../../../../../common/AppUtils';

import { CardCatalog } from '../../../../../common/AppComponents';
import React from 'react';
import { connect } from 'react-redux';
import { query } from '../../../../../api/ApiActions';

@connect(state => {
    return {
        api: state.api
    }
})
export default class Body extends React.Component {

    componentWillMount() {
        this.setViewState(this.props);
    }

    setViewState(props) {
        const itemId = props.params.itemId;
        if (itemId) {
            props.dispatch(query(action(CATALOGING_DOMAIN, CATALOGING_DOMAIN_GET_ITEM_CATEGORY), {
                json: {
                    category: props.params.category,
                    query: {
                        itemId: itemId
                    }
                }
            }));
        }
    }

    render() {
        const isDone = isApiActionDone(this.props.api, action(CATALOGING_DOMAIN, CATALOGING_DOMAIN_GET_ITEM_CATEGORY));
        if (isDone) {
            console.log('done', this);
        }
        return (<div class="card-view large-10 large-offset-1">

        </div>)
    }
}








