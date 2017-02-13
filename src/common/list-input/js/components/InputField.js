import React from 'react';

export default class InputField extends React.Component {

    render() {
        return (<div class="input-field input-group">
            <input type="text" class="input-group-field" value={this.state.value} onChange={this.handleChange.bind(this)} />
            {this.props.index === (this.props.size - 1) ?
                <a class="input-group-button input-field-add" title="add more" onClick={this.handleOnClickAdd.bind(this)}><i class="fa fa-plus fa-fw fa-lg" /></a> :
                <a class="input-group-button input-field-remove" title={'remove ' + this.state.value} onClick={this.handleOnClickRemove.bind(this)}><i class="fa fa-close fa-fw fa-lg" /></a>}
        </div>)
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
        if (this.props.onChange) {
            event.persist();
            this.props.onChange(event, this.props.index);
        }
    }
    handleOnClickAdd() {
        if (this.props.onAdd) {
            this.props.onAdd();
        }
    }
    handleOnClickRemove() {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.index);
        }
    }
    setInputField(props) {
        this.setState({
            value: props.value
        });
    }
    componentWillMount() { this.setInputField(this.props); }
    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setInputField(this.props);
        }
    }
}