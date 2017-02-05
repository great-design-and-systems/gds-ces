import React from 'react';

export default class CommonSwitch extends React.Component {
    handleOnChange(event) {
        const isOn = !this.state.checked;
        if (this.props.onChange) {
            this.props.onChange(isOn);
        }
        this.setState({ checked: isOn });
    }
    setSwitchState(props) {
        this.setState({ checked: props.value || false });
    }
    componentWillMount() {
        this.setState({
            trueLabel: this.props.trueLabel || 'Yes',
            falseLabel: this.props.falseLabel || 'No',
            size: this.props.size || 'small'
        })
        this.setSwitchState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setSwitchState(nextProps);
    }
    render() {
        return (<div className={'switch ' + this.state.size + ' ' + this.props.className}>
            <input onChange={this.handleOnChange.bind(this)} class="switch-input" id={this.props.id} type="checkbox" name={this.props.id} checked={this.state.checked} />
            <label class="switch-paddle" for={this.props.id}>
                <span class="switch-active" aria-hidden="true">{this.state.trueLabel}</span>
                <span class="switch-inactive" aria-hidden="true">{this.state.falseLabel}</span>
            </label>
        </div>)
    }
}