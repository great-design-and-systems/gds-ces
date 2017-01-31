import AppFormCheckbox from '../../app-form/js/components/AppFormCheckbox';
import AppFormInput from './../../app-form/js/components/AppFormInput';
import AppFormSelect from './../../app-form/js/components/AppFormSelect';
import CategoryField from './components/CategoryField';
import { Field } from './../../app-form/js/AppForm';
import React from 'react';
import { connect } from 'react-redux';
import { get } from '../../api/ApiActions';
import lodash from 'lodash';

@connect(state => {
    return {
        form: state.form,
        api: state.api
    }
})
export default class CategoriesFields extends React.Component {
    constructor() {
        super();
    }
    handleOnChange(event, value) {
        this.props.formManager.triggerValidateHandler(this.props.field, this.props.dispatch);
        this.props.formManager.setModelValue(this.props.field, value);
    }
    render() {
        return (<label>
            {this.props.field.label}
            {this.props.field.isRequired() ? <span class="error"> *</span> : ''}
            <CategoriesTable value={this.props.field.getValue()} onChange={this.handleOnChange.bind(this)} />
        </label>)
    }
}

class CategoriesTable extends React.Component {
    componentWillMount() {
        this.setCategoriesState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setCategoriesState(nextProps);
    }
    setCategoriesState(props) {
        this.setState({
            value: props.value || []
        })
    }
    createField() {
        return {
            name: '',
            fieldType: 'text',
            isFilter: true,
            isRequired: false,
            gridView: ''
        };
    }
    handleAddButtonClick(event) {
        const value = [...this.state.value];
        value.push(this.createField());
        this.setState({ value });
    }
    handleRemoveField(event, index) {
        this.state.value.splice(index, 1);
        const value = [...this.state.value];
        this.setState({ value });
    }
    handleOnChange(event, index) {
        const field = this.state.value[index];
        lodash.set(field, event.target.name, event.target.value);
        if (this.props.onChange) {
            this.props.onChange(event, [...this.state.value]);
        }
    }
    render() {
        const categoryFields = [];
        if (this.state.value) {
            this.state.value.forEach((field, index) => {
                categoryFields.push(<CategoryField onChange={this.handleOnChange.bind(this)} key={('field_' + index).hashCode()} index={index} onRemove={this.handleRemoveField.bind(this)} value={field} />)
            });
        }
        return (
            <table class="stripped categories-fields">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Filter</th>
                        <th>Require</th>
                        <th>Grid view</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryFields}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}><div class="row expanded"><button onClick={this.handleAddButtonClick.bind(this)} class="add-button" type="button" title="add field"><i class="fa fa-plus"></i></button></div></td>
                    </tr>
                </tfoot>
            </table>
        )
    }
}