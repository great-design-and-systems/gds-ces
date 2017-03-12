import React from 'react';

export default class FormColumn extends React.Component {
    constructor(props) {
        super();
        if (!props.formField) {
            throw new Error('Property formField is required.');
        }
        if (!props.fields) {
            throw new Error('Property fields is required.');
        }
    }

    componentWillMount() {
        this.setFormColumnState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setFormColumnState(nextProps);
    }

    setFormColumnState(nextProps) {
        this.setState({
            formField: nextProps.formField,
            fields: nextProps.fields
        });
    }

    createColumn(formField, fields) {
        const fieldProperties = formField.getProperties();
        fieldProperties.className = fieldProperties.className.replace('field-element', 'field-column');
        return React.createElement('div', fieldProperties, fields);
    }

    render() {
        return this.createColumn(this.state.formField, this.state.fields);
    }
}