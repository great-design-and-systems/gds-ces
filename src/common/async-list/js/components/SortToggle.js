import { setDirty, sort } from '../CommonAsyncListActions';

import React from 'react';
import { connect } from 'react-redux';

@connect(state => {
    return {
        list: state.list
    }
})
export default class SortToggle extends React.Component {
    constructor(props) {
        super();
        if (!props.target) {
            throw new Error('Property target is required.');
        }
    }
    componentWillMount() {
        this.setState({
            order: null,
            field: null
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.target === nextProps.list.target) {
            const list = nextProps.list.getState(this.props.target);
            this.setState({
                field: list.field,
                order: list.order
            });
        }
    }
    handleOnClick(event) {
        this.props.dispatch(sort(this.props.field, this.props.target));
        this.props.dispatch(setDirty(true, this.props.target));
    }
    render() {
        let orderIcon;
        if (this.state.order && this.state.field === this.props.field) {
            orderIcon = React.createElement('i', {
                className: this.state.order === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc'
            });
        }
        return (<a onClick={this.handleOnClick.bind(this)}>{orderIcon} {this.props.label}</a>)
    }
}