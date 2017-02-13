import React from 'react';

export default class InputField extends React.Component {

    render() {
        return (<div class="input-field">
            <input type="text" value={this.state.value} onChange={this.handleChange.bind(this) } />
            <a class="input-field-add" onClick={this.handleOnClick.bind(this) }><i class="fa fa-plus fa-fw fa-lg"/></a>
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
    handleOnClick() {
        if (this.props.onAdd) {
            this.props.onAdd();
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