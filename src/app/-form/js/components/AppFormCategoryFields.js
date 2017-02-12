import { CategoryForm } from '../../../../common/AppComponents';
import React from 'react';
import { connect } from 'react-redux';
import { get } from '../../../../api/ApiActions';
import { isApiActionDone } from '../../../../common/AppUtils';
import lodash from 'lodash';

const CATEGORY_DOMAIN = 'Category';
@connect(state => {
    return {
        form: state.form,
        api: state.api
    }
})
export default class AppFormCategoryFields extends React.Component {
    componentWillMount() {
        this.setCategoryFormFieldsState(this.props);
    }
    componentWillUnmount() {
        this.loaded = false;
    }
    componentWillReceiveProps(nextProps) {
        if (this.updated) {
            nextProps.formManager.triggerValidateHandler(nextProps.field, nextProps.dispatch, 'onChange');
            this.updated = false;
        }
        this.setCategoryFormFieldsState(nextProps);
    }
    loadDataModelValue(props) {
        if (props.form.managed && !this.state.loading && !!props.field.properties.categoryId && !this.loaded) {
            this.setState({ loading: true });
            props.dispatch(get('{' + CATEGORY_DOMAIN + '.getCategoryItemData}', {
                categoryId: props.field.properties.categoryId,
                itemId: props.form.id
            }))
        } else if (!props.api.pending && !!this.state.loading && isApiActionDone(props.api, CATEGORY_DOMAIN + '.getCategoryItemData')) {
            const categoryApi = lodash.get(props.api, CATEGORY_DOMAIN);
            if (categoryApi && categoryApi.getCategoryItemData) {
                if (!categoryApi.getCategoryItemData.error) {
                    props.formManager.setModelValue(props.field, categoryApi.getCategoryItemData.data.data[0].item);
                }
                this.setState({ loading: false });
                this.loaded = true;
            }
        }
    }
    setCategoryFormFieldsState(props) {
        this.setState({
            value: props.field.properties.value || {},
            categoryId: props.field.properties.categoryId
        })
        this.loadDataModelValue(props);
    }
    handleChange(event, model, fieldConfig) {
        this.props.formManager.setModelValue(this.props.field, model);
        this.props.formManager.renderField(this.props.field.form, this.props.field.properties.name, { value: model });
        this.updated = true;
    }
    handleComplete(data, model) {
        this.props.field.fieldData = data;
        if (model) {
            this.props.formManager.setModelValue(this.props.field, model);
        }
    }
    render() {
        return (
            <fieldset>
                <legend>{this.props.field.label}</legend>
                <CategoryForm onComplete={this.handleComplete.bind(this)} value={this.state.value} onChange={this.handleChange.bind(this)} id={this.props.field.properties.name} categoryId={this.state.categoryId} />
            </fieldset>)
    }
}
