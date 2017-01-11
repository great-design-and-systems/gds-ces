import { IconBox } from '../../../common/AppComponents';
import React from 'react';
import { connect } from 'react-redux';
import {wrapComonent} from '../../../common/AppUtils';

@connect()
export default class AppIconBox extends React.Component {
    constructor(props) {
        super();
    }
    handleChange(event) {

    }
    render() {
        return (<label class="app-icon-box">
            {this.props.field.label}   {field.isRequired() ? <span class="error">*</span> : ''}
            <IconBox value={this.props.field.properties.value}
                onChange={this.handleChange.bind(this) }/>
        </label>)
    }
}   