import { setStart, setTarget } from '../AppListActions';

import React from 'react';
import { connect } from 'react-redux';

@connect(
    state => {
        return {
            list: state.list
        }
    }
)
export default class Pages extends React.Component {
    constructor(props) {
        super();
        if (!props.target) {
            throw new Error('Property target is required.');
        }
    }
    componentWillMount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.target === nextProps.list.target) {
            const list = nextProps.list;
            const total = list.total;
            const start = list.start;
            const limit = list.limit;
            const page = list.page;
            let pageCount = 1;
            if (limit < total) {
                pageCount = (total / limit) + 1;
            }
            this.setState({
                pageCount: pageCount
            });
        }
    }
    handleOnPageChange(event) {
        this.setState({
            page: event.target.value
        });
        this.props.dispatch(setTarget(this.props.target));
        let start = event.target.value ? event.target.value * this.props.list.limit : 0;
        if (start > this.props.list.total) {
            start = ((event.target.value - 1) * this.props.list.limit) + 1;
        }
        this.props.dispatch(setStart(start));
    }
    render() {
        const pages = [];
        if (this.state.pageCount) {
            for (let i = 1; i <= this.state.pageCount; i++) {
                pages.push(<option key={i} value={i}>{i}</option>);
            }
        }
        return (<ul class="pagination text-center" role="navigation" aria-label="Pagination">
            <li class="pagination-previous"><a href="#" aria-label="Previous page">Previous</a></li>
            <li><select value={this.state.page} onChange={this.handleOnPageChange.bind(this)}>{pages}</select></li>
            <li class="pagination-next"><a href="#" aria-label="Next page">Next</a></li>
        </ul>)
    }
}