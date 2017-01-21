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
        console.log('dateState', props.value);
        this.setState({
            value: props.value
        })
    }
    handleOnChange(date) {
        this.setState({
            value: date._d
        })
        if (this.props.onChange) {
            const event = {
                target: {
                    name: this.props.field._id,
                    value: date._d,
                    fieldName: this.props.field.name
                }
            }
            this.props.onChange(event, this.props.field.name);
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