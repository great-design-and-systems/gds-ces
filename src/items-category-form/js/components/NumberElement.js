import React from 'react';

export default class NumberElement extends React.Component {
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
            <div class="input-group">
                <span class="input-group-label"><i class="fa fa-hashtag fa-fw fa-lg" aria-hidden="true"></i></span>
                <input required={this.props.field.isRequired} onChange={this.handleOnChange.bind(this)}
                    value={this.state.value} name={this.props.field._id} class="input-group-field" type="number" />
            </div>
        </label>)
    }
}