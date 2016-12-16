import React from 'react';
import AppFormComponent from '../../app-form/js/AppFormComponent';
import {Field} from '../../app-form/js/AppForm';
export default class ItemCategoryFormComponent extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({
            category: {
                categoryName: 'HI'
            }
        });
        this.headerTitle = 'Create category';
    }
    render() {
        const formFields = [];
        let field = new Field('input');
        field.setName('categoryName');
        field.setType('text');
        field.setLabel('Category')
        formFields.push(field);
        return (
            <div>
                <AppFormComponent formModel={this.state.category} formFields={formFields} headerTitle={this.headerTitle}/>
                {this.state.category.categoryName}
            </div>)
    }
}