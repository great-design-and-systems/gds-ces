import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect(state => {
    return {
        api: state.api,
        list: state.list
    }
})
export default class AppList extends React.Component {
    constructor() {
        super();
        this.query = {};
    }
    componentWillReceiveProps(nextProps) {
    }
    render() {
        return (<div></div>);
    }
}