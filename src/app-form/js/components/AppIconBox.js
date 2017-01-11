import { IconBox } from '../../../common/AppComponents';
import React from 'react';
import { connect } from 'react-redux';
import {wrapComonent} from '../../../common/AppUtils';

@connect()
export default class AppIconBox extends React.Component {
    constructor(props) {
        super();
    }
    componentWillReceiveProps(nextProps) {
        if (this.updated) {
            this.props.formManager.triggerValidateHandler(nextProps.field, nextProps.dispatch);
            this.updated = false;
        }
    }
    handleChange(value) {
        this.props.formManager.setModelValue(this.props.field, value);
        this.updated = true;
    }
    render() {
        return (<label class="app-icon-box">
            {this.props.field.label}   {this.props.field.isRequired() ? <span class="error">*</span> : ''}
            <IconBox value={this.props.field.properties.value}
                onChange={this.handleChange.bind(this) }/>
        </label>)
    }
}   