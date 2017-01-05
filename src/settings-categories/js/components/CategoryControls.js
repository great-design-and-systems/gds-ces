import { formRemove, formSubmit } from '../../../app-form/js/AppFormActions';

import AppInterceptor from '../../../app-interceptor/AppInterceptor';
import Intercept from '../../../common-view/js/Intercept';
import React from 'react';
import { connect } from 'react-redux';
import { wrapComponent } from '../../../common/AppUtils';

@connect()
export default class CategoryControls extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.setState({});
    }
    handleSave(event) {
        this.props.dispatch(formSubmit('categoryForm'));
    }
    render() {
        return (<Intercept load={AppInterceptor}>
            <div class="button-group">
                <button type="button" onClick={this.handleSave.bind(this)} class="button">Save</button>
            </div>
        </Intercept>)
    }
}