import { Categories } from '../../../common/AppComponents';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect()
export default class AppFormCategories extends React.Component {
    constructor(props) {
        super();
        this.fieldProps = props.field.getProperties();
    }
    handleCategoryChange(event) {
        this.props.formManager.setModelValue(this.props.field, event.target.value);
        this.updated = true;
        if (this.fieldProps.onChange) {
            event.persist();
            this.fieldProps.onChange(event);
        }
    }
    render() {
        return (<label for={this.fieldProps.name} class={this.props.field.tag}>
            {this.props.field.label}
            {this.props.field.isRequired() ? <span class="error">*</span> : ''}
            <Categories onChange={this.handleCategoryChange.bind(this)} value={this.props.field.getValue()} id={this.fieldProps.name.hashCode()} name={this.fieldProps.name} dispatch={this.props.dispatch} />
        </label>);
    }
}