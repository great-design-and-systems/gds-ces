import AppFormComponent from '../../app-form/js/AppFormComponent';
import { Field } from '../../app-form/js/AppForm';
import React from 'react';

export default class ItemCategoryFormComponent extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({
            category: {
                categoryName: 'Hi',
                categoryType: 'books',
                isItem: true
            }
        });
        this.fieldTemplates = {

        };
    }
    render() {
        const formFields = [];
        let field = new Field('input');
        field.setName('categoryName');
        field.setLabel('Category')
        field.setValue(this.state.category.categoryName);
        field.setProperties({
            required: true,
            placeholder: 'Enter category name here'
        });

        formFields.push(field);
        field = new Field('checkbox');
        field.setName('isItem');
        field.setLabel('Item?')
        field.setHasDivParent(false);
        field.setValue(this.state.category.isItem);
        formFields.push(field);

        field = new Field('checkbox');
        field.setName('isItem2');
        field.setLabel('Item2?')
        field.setValue(this.state.category.isItem2);
        field.setHasDivParent(false);
        formFields.push(field);

        field = new Field('checkbox');
        field.setName('isItem3');
        field.setLabel('Item3?')
        field.setValue(this.state.category.isItem3);
        field.setHasDivParent(false);
        formFields.push(field);

        field = new Field('checkbox');
        field.setName('isItem4');
        field.setLabel('Item4?')
        field.setValue(this.state.category.isItem4);
        field.setHasDivParent(false);
        formFields.push(field);

        field = new Field('select');
        field.setName('categoryType');
        field.setLabel('Category Type');
        field.setValue(this.state.category.categoryType);
        field.setProperties({
            options: {
                'Electronics': 'electronics',
                'Books': 'books',
                'Food': 'food'
            }
        });
        formFields.push(field);
        return (
            <div>
                <AppFormComponent
                    fieldTemplates={this.fieldTemplates}
                    onFormUpdate={this.onCategoryFormUpdate.bind(this)}
                    formFields={formFields} />
            </div>)
    }
    onCategoryFormUpdate(model) {
        console.log('model', model);
        this.setState({ category: model });
    }
}