import React from 'react';
import { connect } from 'react-redux';
import { setLimit } from '../AppListActions';

@connect()
export default class LimitDropdown extends React.Component {
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
    handleOnChange(event) {
        this.props.dispatch(setLimit(event.target.value, this.props.target));
        if (this.props.handleOnChange) {
            this.props.handleOnChange(event.target.value);
        }
    }
    render() {
        const options = [<option key={'none'}>--limit--</option>];
        if (this.state.options) {
            this.state.options.forEach(option => {
                options.push(<option key={option} value={option}>{option}</option>);
            });
        }
        return (<select onChange={this.handleOnChange.bind(this) }>{options}</select>)
    }
}