import React from 'react';
import { Switch } from '../../../common/AppComponents';

export default class BooleanElement extends React.Component {
    componentWillMount() {
        this.setTextElementState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setTextElementState(nextProps);
    }
    setTextElementState(props) {
        this.setState({
            value: props.value || false
        })
    }
    handleOnChange(event) {
        this.setState({
            value: event.target.value
        })
        if (this.props.onChange) {
            event.persist();
            this.props.onChange(event, this.props.field.name);
        }
    }
    render() {
        return (<label className={this.props.className} for={this.props.field._id}>
            {this.props.field.name} {this.props.field.isRequired ? <span class="error">*</span> : ''}
            <Switch id={this.props.field._id} onChange={this.handleOnChange.bind(this)} size={'medium'}
                value={this.state.value} />
        </label>)
    }
}