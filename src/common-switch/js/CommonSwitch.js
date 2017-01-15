import React from 'react';

export default class CommonSwitch extends React.Component {
    handleOnChange(event) {
        const isOn = $(event.target).is(':checked');
        if (this.props.onChange) {
            event.persist();
            event.target.value = isOn
            this.props.onChange(event);
        }
    }
    componentDidMount() {
        if (this.props.value === true) {
            $('input#' + this.props.id).attr('checked', true);
        } else {
            $('input#' + this.props.id).removeAttr('checked');
        }
    }
    componentWillMount() {
        this.setState({
            trueLabel: this.props.trueLabel || 'Yes',
            falseLabel: this.props.falseLabel || 'No',
            size: this.props.size || 'small'
        })
    }
    render() {
        return (<div className={'switch ' + this.state.size + ' ' + this.props.className}>
            <input onClick={this.handleOnChange.bind(this)} class="switch-input" id={this.props.id} type="checkbox" name={this.props.id} />
            <label class="switch-paddle" for={this.props.id}>
                <span class="switch-active" aria-hidden="true">{this.state.trueLabel}</span>
                <span class="switch-inactive" aria-hidden="true">{this.state.falseLabel}</span>
            </label>
        </div>)
    }
}