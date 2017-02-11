import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { setFilter } from '../CommonAsyncListActions';

@connect()
export default class FilterBox extends React.Component {
    constructor(props) {
        super();
        if (!props.target) {
            throw new Error('Property target is required.');
        }
    }
    componentWillMount() {
        this.setState({
            options: this.props.options
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            options: nextProps.options
        });
    }
    handleOnChangeField(event) {
        this.setState({
            field: event.target.value
        });
        if (this.props.handleOnChangeField) {
            this.props.handleOnChangeField(event.target.value);
        }
    }
    handleOnChangeText(event) {
        this.props.dispatch(setFilter(this.state.field, event.target.value, this.props.target));
        if (this.props.handleOnChangeText) {
            this.props.handleOnChangeText(event.target.value);
        }
    }
    render() {
        const options = [];
        if (this.state.options) {
            lodash.forIn(this.state.options, (value, field) => {
                options.push(<option key={field.hashCode()} value={value}>{field}</option>);
            });
        }
        return (
            <div class="filter-box row">
                <div class="text-div columns large-7 medium-12 small-12"> <input type="text" disabled={!this.state.field} onChange={this.handleOnChangeText.bind(this)} /></div>
                <div class="select-div columns large-5 medium-12 small-12"> <select onChange={this.handleOnChangeField.bind(this)}>{options}</select> </div>
            </div>)
    }
}