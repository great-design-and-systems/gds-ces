import DatePicker from 'react-datepicker';
import React from 'react';

export default class DateElement extends React.Component {
    componentWillMount() {
        this.setTextElementState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setTextElementState(nextProps);
    }
    setTextElementState(props) {
        this.setState({
            value: props.value
        })
    }
    handleOnChange(date) {
        this.setState({
            value: date
        })
        if (this.props.onChange) {
            const event = {
                target: {
                    name: this.props.field._id,
                    value: date
                }
            }
            this.props.onChange(event);
        }
    }
    render() {
        return (<div className={this.props.className}>
            <label for={this.props.field._id}> {this.props.field.name} {this.props.field.isRequired ? <span class="error">*</span> : ''}</label>
            <DatePicker onChange={this.handleOnChange.bind(this)}
                selected={this.state.value} name={this.props.field._id} />
        </div>)
    }
}