import React from 'react';
import { connect } from 'react-redux';

export class CategoriesRules extends React.Component {
    render() {
        return (<div class="categories-rules row expanded">
            <div class="column large-6">
                <h5>In Use</h5>
            </div>
            <div class="column large-6">
                <h5>Rules</h5>
                <table></table>
            </div>
        </div>)
    }
}

export class CategoriesRulesField extends React.Component {
    render() {
        return (<label class="categories-rule-field">
            {this.props.field.label} {this.props.field.isRequired() ? <span class="error">*</span> : ''}
            <CategoriesRules />
        </label>)
    }
}