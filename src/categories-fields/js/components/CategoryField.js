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
            isRequired: props.value.isRequired
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
    componentWillUnmount() {
        this.setState({});
    }
    render() {
        return (
            <tr>
                <td><div class="row"><a class="remove-button" onClick={this.handleRemove.bind(this)} title="remove field"><i class="fa fa-close" /></a><div class="column"><input name="name" type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)} /></div></div></td>
                <td><select name="fieldType" value={this.state.fieldType} onChange={this.handleFieldTypeChange.bind(this)}>
                    <option value="text">Text</option>
                    <option value="boolean">Boolean</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                </select></td>
                <td>
                    <select name="isFilter" value={this.state.isFilter} onChange={this.handleFieldFilterChange.bind(this)}>
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
            </tr>)
    }
}