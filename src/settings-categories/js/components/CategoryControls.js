import { Toolbar, View } from '../../../common/AppComponents';
import { clearForm, formRemove, formSubmit } from '../../../app/-form/js/AppFormActions';

import AppInterceptor from '../../../app/-interceptor/AppInterceptor';
import React from 'react';
import { browserHistory } from 'react-router';
import { wrapComponent } from '../../../common/AppUtils';

export default class CategoryControls extends React.Component {
    constructor() {
        super();
        this.controls = [{
            name: 'back',
            iconClass: 'fa fa-puzzle-piece',
            label: 'Categories'
        },
        {
            name: 'saveCategory',
            iconClass: 'fa fa-save',
            label: 'Save',
            isVisible: (props) => !props.form.id
        },
        {
            name: 'updateCategory',
            iconClass: 'fa fa-save',
            label: 'Update',
            isVisible: (props) => !!props.form.id
        },
        {
            name: 'removeCategory',
            iconClass: 'fa fa-trash',
            buttonClass: 'alert',
            label: 'Remove',
            isVisible: (props) => !!props.form.id
        },
        {
            name: 'create',
            iconClass: 'fa fa-plust',
            label: 'New',
            isVisible: (props) => !!props.form.id
        }
        ];
    }
    handleClick(event, action, dispatch) {
        switch (action) {
            case 'saveCategory':
            case 'updateCategory':
                this.handleSave(dispatch);
                break;
            case 'removeCategory':
                this.handleRemove(dispatch);
                break;
            case 'back':
                browserHistory.push('/settings/categories');
                break;
            case 'create':
                dispatch(clearForm());
                browserHistory.push('/settings/categories/new');
                break;
        }
    }
    handleSave(dispatch) {
        dispatch(formSubmit('categoryForm'));
    }
    handleRemove(dispatch) {
        dispatch(formRemove('categoryForm'));
    }
    render() {
        return (<View load={AppInterceptor}>
            <Toolbar onClick={this.handleClick.bind(this)} controls={this.controls} />
        </View>)
    }
}