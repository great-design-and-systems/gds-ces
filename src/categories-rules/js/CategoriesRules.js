import React from 'react';
import Rule from './components/Rule';
import { connect } from 'react-redux';

export class CategoriesRules extends React.Component {
    componentWillMount() {
        this.setState({ rules: this.props.value ? this.props.value : [] });
    }
    componentWilUnmount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            rules: nextProps.value
        });
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
                        <th>Input Type</th>
                        <th>Pre Action</th>
                        <th>Action</th>
                        <th>Post Action</th>
                        <th>View </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="input_form" label="Form" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="preaction_needsID" label="Needs ID" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="action_playVideo" label="Play Video" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="postaction_needsApproval" label="Needs Approval" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="view_gridLayout" label="Display as Grid" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="input_import_marc" label="Import from MARC" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="preaction_needsCredentials" label="Needs Credentials" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="action_viewDocument" label="View Document" rules={this.state.rules} />
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="view_listLayout" label="Display as List" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="input_import_isbn" label="Import from ISBN" rules={this.state.rules} />
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="action_schedule" label="Schedule" rules={this.state.rules} />
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="view_tableLayout" label="Display as Table" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="view_schedulePerHour" label="Schedule per hour" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="view_schedulePerDay" label="Schedule per day" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="view_displayPopular" label="Display Popular" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="view_displayRecent" label="Display Recent" rules={this.state.rules} />
                    </tr>
                </tbody>
            </table>
        </div>)
    }
}

@connect(state => {
    return {
        form: state.form,
        api: state.api
    }
})
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
            <CategoriesRules value={this.props.field.getValue()} onChange={this.handleOnChange.bind(this)} />
        </label>)
    }
}