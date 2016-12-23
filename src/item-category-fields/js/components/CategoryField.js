import React from 'react';

export default class CategoryField extends React.Component {
    constructor() {
        super();
    }
    copyStateToField() {
        this.props.field.name = this.state.name;
        this.props.field.fieldType = this.state.fieldType;
        this.props.field.isFilter = this.state.isFilter;
        this.props.field.isRequired = this.state.isRequired;
    }
    componentDidUpdate() {
        this.copyStateToField();
    }
    componentWillMount() {
        this.setState({
            name: this.props.field.name,
            fieldType: this.props.field.fieldType,
            isFilter: this.props.field.isFilter,
            isRequired: this.props.field.isRequired
        });
    }
    componentWillReceiveProps(newProp) {
        if (newProp) {
            if (newProp.field) {
                this.setState({
                    name: newProp.field.name,
                    fieldType: newProp.field.fieldType,
                    isFilter: newProp.field.isFilter,
                    isRequired: newProp.field.isRequired
                });
            }
        }
    }
    render() {
        return (
            <div class="columns large-11 end">{this.renderFieldName()} {this.renderFieldType()} {this.renderFieldFilter()} {this.renderFieldRequire()}</div>
        )
    }
    handleFieldNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }
    handleFieldTypeChange(event) {
        this.setState({
            fieldType: event.target.value
        });
    }
    handleFieldFilterChange(event) {
        this.setState({
            isFilter: event.target.value
        });
    }
    handleFieldRequireChange(event) {
        this.setState({
            isRequired: event.target.value
        });
    }
    renderFieldName() {
        return (
            <label class="columns large-3 end">
                Name
                 <input type="text" placeholder="Enter field name" value={this.state.name} onChange={this.handleFieldNameChange.bind(this)} />
            </label>);
    }
    renderFieldType() {
        return (
            <label class="columns large-3 end">
                Type
            <select value={this.state.fieldType} onChange={this.handleFieldTypeChange.bind(this)}>
                    <option value="text">Text</option>
                    <option value="boolean">Boolean</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                </select>
            </label>)
    }
    renderFieldFilter() {
        return (
            <label class="columns large-3 end">
                Filter
                <select value={this.state.isFilter} onChange={this.handleFieldFilterChange.bind(this)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </label>)
    }
    renderFieldRequire() {
        return (
            <label class="columns large-3 end">
                Require
                <select value={this.state.isRequired} onChange={this.handleFieldRequireChange.bind(this)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </label>)
    }
}