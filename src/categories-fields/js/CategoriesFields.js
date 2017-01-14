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
    componentWillReceiveProps(nextProps) {
        this.setCategoriesFieldsProps(nextProps);
        if (this.updated) {
            nextProps.formManager.triggerValidateHandler(nextProps.field, nextProps.dispatch);
            this.updated = false;
        }
    }
    setCategoriesFieldsProps(nextProps) {
        if (nextProps.form.name === 'categoryForm') {
            if (!nextProps.api.pending && nextProps.form.id && this.loading) {
                this.loaded = true;
                this.loading = false;
                this.setState({
                    categoryFields: nextProps.api.Category.getFieldsByCategoryId.data.data
                });
                this.props.formManager.setModelValue(this.props.field, this.state.categoryFields);
            } else if (!nextProps.api.pending && nextProps.form.id && !this.loaded) {
                this.loading = true;
                nextProps.dispatch(get('{Category.getFieldsByCategoryId}', {
                    categoryId: nextProps.form.id
                }));
            }
        }
    }
    componentWillMount() {
        this.loaded = false;
        this.setState({
            categoryFields: []
        });
        this.setCategoriesFieldsProps(this.props);
    }

    componentWillUnmount() {
        this.loaded = undefined;
        this.setState({});
    }

    componentDidMount() {
        if (this.props.field.getValue() && this.props.field.getValue().length) {
            this.setState({ categoryFields: this.props.field.getValue() });
        } else {
            this.state.categoryFields.push(this.createField());
            this.props.formManager.setModelValue(this.props.field, this.state.categoryFields);
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
        return (<CategoryField index={index} key={key} field={field} handleRemove={remove.bind(this)} />)
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
                                    <h5>Fields {this.props.field.isRequired() ? <span class="error">*</span> : ''}</h5>
                                    <div class="column"></div>
                                    <a class="add-button" onClick={this.addField.bind(this)}><i class="fa fa-plus"></i></a>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderFields()}
                    </tbody>
                </table>
            </div>);
    }
}