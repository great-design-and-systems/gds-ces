import { Field, FieldValidator } from '../../app-form/js/AppForm';

import AppFormComponent from '../../app-form/js/AppFormComponent';
import React from 'react';
import { connect } from 'react-redux';

export default class ItemCategoryFormComponent extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({
            category: {
                categoryName: 'Hi',
                categoryRadio: 'foods',
                isItem: true,
                isItem2: true
            }
        });
    }
    getFormFields() {
        const formFields = [];
        let field = new Field('input');
        field.setName('categoryName');
        field.setLabel('Category')
        field.setValue(this.state.category.categoryName);
        field.setProperties({
            required: true,
            placeholder: 'Enter category name here'
        });

        field.setValidator({
            required: new FieldValidator('onBlur', 'Category name is required', (event, done) => {
                done(event.target.value != null && !!event.target.value.length);
            })
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

        field = new Field('column');
        field.setProperties({
            className: 'medium-12 large-4 small-12 columns'
        });
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
        field.setValidator({
            restriction: new FieldValidator('onChange', 'Book is not allowed for now', (event, done) => {
                console.log('restriction', event.target.value);
                done(event.target.value !== 'books');
            })
        });
        formFields.push(field);

        field = new Field('column');
        field.setProperties({
            className: 'medium-12 large-4  small-12 columns'
        });
        formFields.push(field);

        field = new Field('radio');
        field.setName('categoryRadio');
        field.setLabel('Category Radio');
        field.setValue(this.state.category.categoryRadio);
        field.setProperties({
            options: {
                'Electronics': 'electronics',
                'Books': 'books',
                'Food': 'food'
            }
        });

        formFields.push(field);

        return formFields;
    }

    render() {
        const formFields = this.getFormFields();
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