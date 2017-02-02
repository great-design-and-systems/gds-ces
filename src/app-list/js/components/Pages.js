import { setDirty, setStart } from '../AppListActions';

import { BatchAction } from '../../../common/AppUtils';
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
    componentDidUpdate(prevProps, prevState) {
        if (this.props.target === this.props.list.target) {
            const batchProcessor = this.props.list.batchProcessor;
            batchProcessor.push(new BatchAction('UPDATE_LIST_PATE', (done) => {
                const list = this.props.list.getState(this.props.target);
                const total = list.total;
                const start = list.start;
                const limit = list.limit;
                let page = Math.round(list.start % list.limit === 0 ? list.start / list.limit : ((list.start / list.limit) + 1));
                let pageCount = 1;
                if (limit < total) {
                    pageCount = (total / limit) + 1;
                } console.log('page', page);
                console.log('limit', limit); console.log('pageCount', pageCount);
                console.log('(page * limit) ', (page * limit));
                done({
                    pageCount: pageCount,
                    page: page,
                    hasNext: ((page + 1) * limit) < total,
                    hasPrevious: start > 0
                });
            }));

            if (!batchProcessor.isRunning()) {
                batchProcessor.execute((result) => {
                    if (prevState.pageCount !== result.pageCount ||
                        prevState.page !== result.page ||
                        prevState.hasNext !== result.hasNext ||
                        prevState.hasPrevious !== result.hasPrevious) {
                        this.setState({
                            pageCount: result.pageCount,
                            page: result.page,
                            hasNext: result.hasNext,
                            hasPrevious: result.hasPrevious
                        });
                    }
                });
            }
        }


    }
    updatePage(page) {
        const list = this.props.list.getState(this.props.target);
        handleStart(this.props.dispatch, page, list.limit,
            list.total, this.props.target);
        this.props.dispatch(setDirty(true, this.props.target));
    }
    handleNext() {
        const newPage = this.state.page + 1;
        this.updatePage(newPage);
    }
    handlePrevious() {
        const newPage = this.state.page - 1;
        this.updatePage(newPage);
    }
    handleOnPageChange(event) {
        this.setState({
            page: event.target.value
        });
        this.updatePage(event.target.value);
    }
    render() {
        const pages = [];
        let nextLi, previousLi;
        if (this.state.pageCount) {
            for (let i = 0; i < this.state.pageCount; i++) {
                pages.push(<option key={i} value={i}>{i + 1}</option>);
            }
        }
        if (this.state.hasNext) {
            nextLi = (<li class="pagination-next"><a onClick={this.handleNext.bind(this)} aria-label="Next page">Next</a></li>);
        } else {
            nextLi = (<li class="pagination-next disabled">Next <span class="show-for-sr">page</span></li>);
        }

        if (this.state.hasPrevious) {
            previousLi = (<li class="pagination-previous"><a onClick={this.handlePrevious.bind(this)} aria-label="Previous page">Previous</a></li>);
        } else {
            previousLi = (<li class="pagination-previous disabled">Previous <span class="show-for-sr">page</span></li>);
        }
        return (<ul class="pagination text-center" role="navigation" aria-label="Pagination">
            {previousLi}
            <li><select value={this.state.page} onChange={this.handleOnPageChange.bind(this)}>{pages}</select></li>
            {nextLi}
        </ul>)
    }
}

function handleStart(dispatch, value, limit, total, target) {
    let start = value ? value * limit : 0;
    if (start > total) {
        start = ((value - 1) * limit) + 1;
    }
    dispatch(setStart(start, target));
}