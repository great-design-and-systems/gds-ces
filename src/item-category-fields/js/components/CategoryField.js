import React from 'react';

export default class CategoryField extends React.Component {
    componentWillReceiveProps(newProp) {
        if (newProp) {
            if (newProp.field) {
                this.setState({
                    name: newProp.field.name,
                    fieldType: newProp.field.fieldType,
                    isFilter: newProp.field.isFilter
                });
            }
        }
    }
    render() {
        return (
            <div>{this.renderFieldName()} {this.renderFieldType()} {this.renderFieldFilter()}</div>
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
    renderFieldName() {
        return (
            <label>
                Name
                 <input type="text" placeholder="Enter field name" value={this.state.name} onChange={this.handleFieldNameChange.bind(this)} />
            </label>);
    }
    renderFieldType() {
        return (
            <label>
                Type
            <select value={this.state.fieldType} onChange={this.handleFieldTypeChange.bind(this)}>
                    <option value="text">Text</option>
                    <option value="boolean">Boolean</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                </select>
            </label>)
    }
    renderFieldFilter(field) {
        return (
            <label>
                Filter
                <select value={this.state.isFilter} onChange={this.handleFieldFilterChange.bind(this)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </label>)
    }
}