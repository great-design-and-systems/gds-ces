import React from 'react';
import AppFormComponent from '../../app-form/js/AppFormComponent';


export default class ItemCategoryFormComponent extends AppFormComponent {
    componentWillMount() {
        this.formlyConfig = {
            name: 'itemCategoryForm',
            fields: [
                {
                    key: 'name',
                    type: 'text',
                    label: 'Category',
                    placeholder: 'Category name'
                }
            ]
        };
        this.setState({ title: 'Create category' });
    }
}

