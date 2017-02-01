import { Imageupload } from '../../../common/AppComponents';
import React from 'react';
import { connect } from 'react-redux';

@connect(state => {
    return {
        form: state.form,
        api: state.api
    }
})
export default class AppFormImageupload extends React.Component {
    constructor() {
        super();
    }
    componentWillReceiveProps(nextProps) {
        if (this.updated) {
            this.props.formManager.triggerValidateHandler(nextProps.field, nextProps.dispatch, 'onChange');
            this.updated = false;
        }
    }
    handleChange(value) {
        this.props.formManager.setModelValue(this.props.field, value);
        this.updated = true;
    }
    render() {
        return (<label class="app-icon-box">
            {this.props.field.label}   {this.props.field.isRequired() ? <span class="error"> *</span> : ''}
            <Imageupload name={this.props.field.properties.name}
                dislabed={this.props.api.pending || this.props.form.pending}
                value={this.props.field.getValue()}
                onChange={this.handleChange.bind(this)} />
        </label>)
    }
}   