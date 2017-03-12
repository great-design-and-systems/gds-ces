import React from 'react';

export default class FormFieldSet extends React.Component {
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
        this.setFormFieldSetState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setFormFieldSetState(nextProps);
    }

    setFormFieldSetState(nextProps) {
        this.setState({
            formField: nextProps.formField,
            fields: nextProps.fields
        });

        const fieldProps = nextProps.formField.getProperties();
        this.setState({
            expand: fieldProps.expand
        });
    }

    handleLegendClick() {
        this.setState({
            expand: !this.state.expand
        });
    }

    createFieldSet(formField, fields, expand) {
        const fieldProperties = formField.getProperties();
        fieldProperties.className = fieldProperties.className.replace('field-element', 'field-FieldSet');
        const div = React.createElement('div', fieldProperties, fields);
        const contents = [];
        contents.push(<legend key={fieldProperties.title} onClick={this.handleLegendClick.bind(this)}>
            <i className={expand ? 'fa fa-caret-down fa-fw fa-lg': 'fa fa-caret-right fa-fw fa-lg'}/> {fieldProperties.title}
        </legend>);
        if (expand) {
            contents.push(div);
        }
        return React.createElement('fieldset', {className: 'form-field-set'}, contents);
    }

    render() {
        return this.createFieldSet(this.state.formField, this.state.fields, this.state.expand);
    }
}