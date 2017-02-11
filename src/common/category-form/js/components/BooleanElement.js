import CommonSwitch from '../../../switch/js/CommonSwitch';
import React from 'react';

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
    handleOnChange(value) {
        this.setState({
            value: value
        })
        if (this.props.onChange) {
            this.props.onChange({
                target: {
                    value: value
                }
            }, this.props.field.name);
        }
    }
    render() {
        return (<label className={this.props.className} for={this.props.field._id}>
            {this.props.field.name} {this.props.field.isRequired ? <span class="error">*</span> : ''}
            <CommonSwitch id={this.props.field._id} onChange={this.handleOnChange.bind(this)} size={'medium'}
                value={this.state.value} />
        </label>)
    }
}