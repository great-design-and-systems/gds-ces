import React from 'react';
import {connect} from 'react-redux';

@connect(state => {
    return {
        api: state.api,
        manualEntry: state.manualEntry
    }
})
export default class Control extends React.Component {
    render() {

    }
}