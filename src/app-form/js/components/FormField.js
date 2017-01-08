import { FieldCreator } from '../AppForm';
import React from 'react';
import { connect } from 'react-redux';

@connect()
export default class FormField extends React.Component {
    constructor(props) {
        super();
        if (!props.formField) {
            throw new Error('Property formField is required.');
        }
    }

    componentWillMount() {
        this.setState({});
        if (this.props.formField) {
            this.setState({ field: this.createField(this.props.formField, this.props.fieldTemplates, this.props.dispatch) });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formField) {
            this.setState({ field: this.createField(nextProps.formField, nextProps.fieldTemplates, nextProps.dispatch) });
        }
    }

    createField(formField, fieldTemplates, dispatch) {
        const fieldProperties = formField.getProperties();
        const formFieldElement = new FieldCreator(formField, dispatch, fieldTemplates).getElement();
        if (!formField.hasDivParent) {
            formField.key = fieldProperties.name.hashCode();
            return formFieldElement;
        }
        return this.createFieldRenderWithDivParent(fieldProperties, formFieldElement);
    }

    createFieldRenderWithDivParent(fieldProperties, formFieldElement) {
        return (<div class="form-field" key={fieldProperties.name.hashCode()}>
            {formFieldElement}
        </div>);
    }

    render() {
        return <div class="field">{this.state.field}</div>;
    }
}