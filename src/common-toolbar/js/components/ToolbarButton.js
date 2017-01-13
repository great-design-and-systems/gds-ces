import CommonView from '../../../common-view/js/CommonView';
import React from 'react';
import {connect} from 'react-redux';

@connect(state => {
    return {
        form: state.api,
        api: state.api
    }
})
export default class ToolbarButton extends React.Component {
    componentWillMount() {
        this.setState({
            label: this.props.control.label,
            iconClass: this.props.control.iconClass,
            disabled: false, visible: true
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.control.isVisible) {
            this.setState({ visible: nextProps.control.isVisible(nextProps) });
        }
        if (nextProps.control.isDisabled) {
            this.setState({ disabled: nextProps.control.isDisabled(nextProps) });
        }
    }
    handleClick(event) {
        event.persist();
        if (this.props.action) {
            this.props.action(event, this.props.control.name);
        }
    }
    render() {
        return (<CommonView if={this.state.visible}>
            <button className={'common-toolbar-button button ' + this.props.control.buttonClass} name={this.props.control.name} onClick={this.handleClick.bind(this) } disabled={this.state.disabled} type="button">
                <CommonView if={!!this.state.iconClass}>
                    <i className={'common-toolbar-icon ' + this.state.iconClass}/></CommonView> {this.state.label}</button></CommonView>)
    }
}