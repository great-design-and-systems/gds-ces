import React from 'react';
import {connect} from 'react-redux';
import {CardCatalog} from '../../../../../common/AppComponents';

@connect(state => {
    return {
        cataloging: state.cataloging
    }
})
export default class Body extends React.Component {
    componentWillMount() {

    }

    render() {
        return (<div class="card-view"></div>)
    }
}








