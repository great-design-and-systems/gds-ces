import { formRemove, formSubmit } from '../../../app-form/js/AppFormActions';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import React from 'react';
import { View } from '../../../common/AppComponents';
import { connect } from 'react-redux';
import { wrapComponent } from '../../../common/AppUtils';

@connect(state => {
    return {
        form: state.form
    }
})
export default class CategoryControls extends React.Component {
    constructor() {
        super();
    }
    componentWillReceiveProps(nextProps) {
        if (!!nextProps.form.id) {
            this.setState({
                submitLabel: 'Update',
                showDelete: true
            })
        } else {
            this.setState({
                submitLabel: 'Save',
                showDelete:false
            });
        }
    }
    componentWillMount() {
        this.setState({
            submitLabel: 'Save'
        });
    }
    handleSave(event) {
        this.props.dispatch(formSubmit('categoryForm'));
    }
    handleRemove(event) {
        this.props.dispatch(formRemove('categoryForm'));
    }
    render() {
        let deleteButton = <span class="delete-placeholder"></span>
        if(this.state.showDelete) {
          deleteButton =  <button type="button" onClick={this.handleRemove.bind(this)} class="button">Delete</button>
        }
        return (<View load={AppInterceptor}>
            <div class="button-group">
                <button type="button" onClick={this.handleSave.bind(this)} class="button">{this.state.submitLabel}</button>
                {deleteButton}
            </div>
        </View>)
    }
}