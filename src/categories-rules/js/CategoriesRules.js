import React from 'react';
import { connect } from 'react-redux';
import Rule from './components/Rule';
export class CategoriesRules extends React.Component {
    componentWillMount() {
        this.setState({ rules: [] });
    }
    handleRuleChange() {
        if (this.props.onChange) {
            this.props.onChange(this.state.rules);
        }
    }
    render() {
        return (<div class="categories-rules row expanded">
            <table>
                <thead>
                    <tr>
                        <th>Pre Action</th>
                        <th>Action</th>
                        <th>View </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Rule onChange={this.handleRuleChange.bind(this) } name="needsApproval" label="Needs Approval" rules={this.state.rules}/>
                        <Rule onChange={this.handleRuleChange.bind(this) } name="playVideo" label="Play Video" rules={this.state.rules}/>
                        <Rule onChange={this.handleRuleChange.bind(this) } name="displayGrid" label="Display as Grid" rules={this.state.rules}/>
                    </tr>
                    <tr>
                        <Rule onChange={this.handleRuleChange.bind(this) } name="needsCredentials" label="Needs Credentials" rules={this.state.rules}/>
                        <Rule onChange={this.handleRuleChange.bind(this) } name="viewDocument" label="View Document" rules={this.state.rules}/>
                        <Rule onChange={this.handleRuleChange.bind(this) } name="displayList" label="Display as List" rules={this.state.rules}/>
                    </tr>
                    <tr>
                        <Rule onChange={this.handleRuleChange.bind(this) } name="needsSchedule" label="Needs Schedule" rules={this.state.rules}/>
                    </tr>
                </tbody>
            </table>
        </div>)
    }
}

export class CategoriesRulesField extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.updated) {
            this.updated = false;
            this.props.formManager.triggerValidateHandler(this.props.field, this.props.dispatch);
        }
    }
    handleOnChange(rules) {
        this.updated = true;
        this.props.formManager.setModelValue(this.props.field, rules);
    }
    render() {
        return (<label class="categories-rule-field">
            {this.props.field.label} {this.props.field.isRequired() ? <span class="error">*</span> : ''}
            <CategoriesRules onChange={this.handleOnChange.bind(this) } />
        </label>)
    }
}