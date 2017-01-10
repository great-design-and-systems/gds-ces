import AppFormCheckbox from '../../app-form/js/components/AppFormCheckbox';
import AppFormInput from './../../app-form/js/components/AppFormInput';
import AppFormSelect from './../../app-form/js/components/AppFormSelect';
import CategoryField from './components/CategoryField';
import { Field } from './../../app-form/js/AppForm';
import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

@connect(state => {
    return {
        form: state.form
    }
})
export default class CategoriesFields extends React.Component {
    constructor() {
        super();
    }

    componentWillReceiveProps(nextProps) {
        if (this.updated) {
            console.log('field', nextProps.field);
            nextProps.formManager.triggerValidateHandler(nextProps.field, nextProps.dispatch);
            this.updated = false;
        }
    }

    componentWillMount() {
        this.setState({
            categoryFields: []
        });
    }

    componentDidMount() {
        if (this.props.field.getValue() && this.props.field.getValue().length) {
            this.setState({ categoryFields: this.props.field.getValue() });
        } else {
            this.addField();
        }
    }

    createField() {
        return {
            name: '',
            fieldType: 'text',
            isFilter: true,
            isRequired: false
        };
    }

    addField() {
        this.state.categoryFields.push(this.createField());
        this.props.formManager.setModelValue(this.props.field, this.state.categoryFields);
        this.updated = true;
    }

    createFieldForm(field, index) {
        const key = ('category_field_' + index).hashCode();
        const remove = () => {
            this.state.categoryFields.splice(index, 1);
            this.props.formManager.setModelValue(this.props.field, this.state.categoryFields);
            this.updated = true;
        }
        return (<CategoryField index={index} key={key} field={field} handleRemove={remove.bind(this) } />)
    }
    renderFields() {
        const fields = [];
        this.state.categoryFields.forEach((field, index) => {
            fields.push(this.createFieldForm(field, index));
        });
        return fields;
    }
    render() {
        return (
            <div class="categories-fields">
                <table class="striped">
                    <thead>
                        <tr>
                            <th colSpan="5">
                                <div class="fields-title-bar row expanded">
                                    <h5>Fields</h5>
                                    <div class="column"></div>
                                    <a class="add-button" onClick={this.addField.bind(this) }><i class="fa fa-plus"></i></a>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderFields() }
                    </tbody>
                </table>
            </div>);
    }
}