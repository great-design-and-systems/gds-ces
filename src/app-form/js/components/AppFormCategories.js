import { Categories } from '../../../common/AppComponents';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect(
    state => {
        return {
            api: state.api
        };
    }
)
export default class AppFormCategories extends React.Component {
    constructor() {
        super();
    }
    createComponent(field) {
        return (
            <label key={fieldProps.name.hashCode()} for={fieldProps.id}
                class={fieldProps.tag}>
                {field.label}
                {field.isRequired() ? <span class="error">*</span> : ''}
                <Categories />
            </label>
        )
    }
    render() {
        return this.createComponent(this.props.field);
    }
}