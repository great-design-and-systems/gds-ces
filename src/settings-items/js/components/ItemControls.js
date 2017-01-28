import { Toolbar, View } from '../../../common/AppComponents';
import { clearForm, formRemove, formSubmit } from '../../../app-form/js/AppFormActions';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import React from 'react';
import { browserHistory } from 'react-router';
import { wrapComponent } from '../../../common/AppUtils';

export default class ItemControls extends React.Component {
    constructor() {
        super();
        this.controls = [
            {
                name: 'back',
                iconClass: 'fa fa-cube',
                label: 'Items'
            },
            {
                name: 'saveItem',
                iconClass: 'fa fa-save',
                label: 'Save',
                isVisible: (props) => !props.form.id
            },
            {
                name: 'updateItem',
                iconClass: 'fa fa-save',
                label: 'Update',
                isVisible: (props) => !!props.form.id
            },
            {
                name: 'removeItem',
                iconClass: 'fa fa-trash',
                buttonClass: 'alert',
                label: 'Remove',
                isVisible: (props) => !!props.form.id
            },
            {
                name: 'create',
                iconClass: 'fa fa-plus',
                label: 'New',
                isVisible: (props) => !!props.form.id
            }
        ];
    }
    handleClick(event, action, dispatch) {
        switch (action) {
            case 'back':
                browserHistory.push('/settings/items');
                break;
            case 'create':
                dispatch(clearForm());
                browserHistory.push('/settings/items/new');
                break;
            case 'saveItem':
            case 'updateItem':
                this.handleSave(dispatch);
                break;
            case 'removeItem':
                this.handleRemove(dispatch);
                break;
        }
    }
    handleSave(dispatch) {
        dispatch(formSubmit('itemForm'));
    }
    handleRemove(dispatch) {
        dispatch(formRemove('itemForm'));
    }
    render() {
        return (<View load={AppInterceptor}>
            <Toolbar onClick={this.handleClick.bind(this)} controls={this.controls} />
        </View>)
    }
}