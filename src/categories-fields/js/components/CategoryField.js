import React from 'react';

export default class CategoryField extends React.Component {
    componentWillMount() {
        this.setCategoryFieldState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setCategoryFieldState(nextProps);
    }
    setCategoryFieldState(props) {
        this.setState({
            name: props.value.name,
            fieldType: props.value.fieldType,
            isFilter: props.value.isFilter,
            isRequired: props.value.isRequired,
            gridView: props.value.gridView || 'none'
        })
    }
    handleNameChange(event) {
        this.setState({
            name: event.type.value
        });
        if (this.props.onChange) {
            event.persist();
            this.props.onChange(event, this.props.index);
        }
    }
    handleFieldTypeChange(event) {
        this.setState({
            fieldType: event.type.value
        });
        if (!this.getFilterValue(event.type.value)) {
            this.setState({
                isFilter: false
            });
        }
        if (this.props.onChange) {
            event.persist();
            this.props.onChange(event, this.props.index);
        }
    }
    handleFieldFilterChange(event) {
        this.setState({
            isFilter: event.target.value
        });
        if (this.props.onChange) {
            event.persist();
            this.props.onChange(event, this.props.index);
        }
    }
    handleFieldRequireChange(event) {
        this.setState({
            isRequired: event.target.value
        });
        if (this.props.onChange) {
            event.persist();
            this.props.onChange(event, this.props.index);
        }
    }
    handleRemove(event) {
        if (this.props.onRemove) {
            this.props.onRemove(event, this.props.index);
        }
    }
    handleFieldGridViewChange(event) {
        this.setState({
            gridView: event.target.value
        });
        if (this.props.onChange) {
            event.persist();
            this.props.onChange(event, this.props.index);
        }
    }
    componentWillUnmount() {
        this.setState({});
    }
    getFilterValue(fieldType) {
        return !(fieldType === 'date' || fieldType === 'boolean' || fieldType === 'document');
    }
    render() {
        return (
            <tr>
                <td><div class="input-group">
                    <a class="input-group-label remove-button" onClick={this.handleRemove.bind(this)} title="remove field"><i class="fa fa-close" /></a>
                    <input class="input-group-field" name="name" type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
                </div>
                </td>
                <td><select name="fieldType" value={this.state.fieldType} onChange={this.handleFieldTypeChange.bind(this)}>
                    <option value="text">Text</option>
                    <option value="boolean">Boolean</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="document">Document</option>
                </select></td>
                <td>
                    <select disabled={!this.getFilterValue(this.state.fieldType)} name="isFilter" value={this.state.isFilter} onChange={this.handleFieldFilterChange.bind(this)}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </td>
                <td>
                    <select name="isRequired" value={this.state.isRequired} onChange={this.handleFieldRequireChange.bind(this)}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </td>
                <td>
                    <select name="gridView" value={this.state.gridView} onChange={this.handleFieldGridViewChange.bind(this)}>
                        <option value="none">None</option>
                        <option value="header">Header</option>
                        <option value="subTitle">Sub Title</option>
                    </select>
                </td>
            </tr>)
    }
}