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
                        <th>Pre Action</th>
                        <th>Action</th>
                        <th>Post Action</th>
                        <th>View </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="needsID" label="Needs ID" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="playVideo" label="Play Video" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="needsApproval" label="Needs Approval" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="GridLayout" label="Display as Grid" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="needsCredentials" label="Needs Credentials" rules={this.state.rules} />
                        <Rule onChange={this.handleRuleChange.bind(this)} name="viewDocument" label="View Document" rules={this.state.rules} />
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="listLayout" label="Display as List" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="schedule" label="Schedule" rules={this.state.rules} />
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="tableLayout" label="Display as Table" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="schedulePerHour" label="Schedule per hour" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="schedulePerDay" label="Schedule per day" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="displayPopular" label="Display Popular" rules={this.state.rules} />
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <Rule onChange={this.handleRuleChange.bind(this)} name="displayRecent" label="Display Recent" rules={this.state.rules} />
                    </tr>
                </tbody>
            </table>
        </div>)
    }
}

@connect()
export class CategoriesRulesField extends React.Component {
    componentWillMount() {
        this.setState({ rules: this.props.field.getValue() });
    }
    componentWilUnmount() {
        this.setState({});
    }
    componentWillReceiveProps(nextProps) {
        if (this.updated) {
            this.updated = false;
            this.props.formManager.triggerValidateHandler(this.props.field, this.props.dispatch);
        }
        if (nextProps.field.getValue()) {
            this.setState({ rules: nextProps.field.getValue() });
        }
    }
    handleOnChange(rules) {
        this.updated = true;
        this.props.formManager.setModelValue(this.props.field, rules);
    }
    render() {
        return (<label class="categories-rule-field">
            {this.props.field.label} {this.props.field.isRequired() ? <span class="error">*</span> : ''}
            <CategoriesRules value={this.state.rules} onChange={this.handleOnChange.bind(this)} />
        </label>)
    }
}