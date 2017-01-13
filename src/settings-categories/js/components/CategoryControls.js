import { Toolbar, View } from '../../../common/AppComponents';
import { formRemove, formSubmit } from '../../../app-form/js/AppFormActions';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import React from 'react';
import { wrapComponent } from '../../../common/AppUtils';

export default class CategoryControls extends React.Component {
    constructor() {
        super();
        this.controls = [
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
                label: 'Remove',
                isVisible: (props) => !!props.form.id
            }
        ];
    }
    handleClick(event, action) {
        switch (action) {
            case 'saveCategory':
            case 'updateCategory':
                this.handleSave();
                break;
            case 'removeCategory':
                this.handleRemove();
                break;
        }
    }
    handleSave() {
        this.props.dispatch(formSubmit('categoryForm'));
    }
    handleRemove() {
        this.props.dispatch(formRemove('categoryForm'));
    }
    render() {
        return (<View load={AppInterceptor}>
            <Toolbar onClick={this.handleClick.bind(this) } controls={this.controls} />
        </View>)
    }
}