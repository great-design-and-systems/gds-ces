import React from 'react';
import { connect } from 'react-redux';

@connect(state => {
    return {
        api: state.api
    }
})
export default class AppList extends React.Component {
    render() {
        return (<div></div>);
    }
}