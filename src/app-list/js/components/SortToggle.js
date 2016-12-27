import React from 'react';
import { connect } from 'react-redux';
import { sort } from '../AppListActions';

@connect(state => {
    return {
        list: state.list
    }
})
export default class SortToggle extends React.Component {
    constructor() {
        super();
    }
    componentWillReceiveProp(nextProp) {

    }
    handleOnClick(event) {
        this.props.dispatch(sort(this.props.field));
    }
    render() {
        let orderIcon;
        if (this.props.list.order && this.props.list.field === this.props.field) {
            if (this.props.list.order != null) {
                orderIcon = React.createElement('i', {
                    className: this.props.list.order === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc'
                });
            }

        }
        return (<a onClick={this.handleOnClick.bind(this)}>{orderIcon} {this.props.label}</a>)
    }
}