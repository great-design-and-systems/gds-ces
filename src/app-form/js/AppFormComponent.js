import AppFormMessages from './components/AppFormMessages';
import AppModal from '../../app-modal/js/AppModal';
import DeleteModel from './control/DeleteModel';
import GetModel from './control/GetModel';
import React from 'react';
import RenderFields from './control/RenderFields';
import SubmitModel from './control/SubmitModel';
import { connect } from 'react-redux';
import { get } from '../../api/ApiActions';
import { wrapComponent } from '../../common/AppUtils';

@connect((state) => {
    return {
        form: state.form,
        api: state.api
    };
})
export default class AppForm extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        this.managed = this.props.formManager && !!this.props.formManager.id;
        if (this.managed) {
            this.props.dispatch(get(this.props.formManager.get.action, this.props.formManager.get.params));

        }
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.api.pending) {
            new GetModel(nextProps.api, nextProps.formFields, nextProps.formManager);
        }
    }
    onSubmit(event) {
        event.preventDefault();
        const submitModel = new SubmitModel(this.props.dispatch, this.props.formFields,
            this.props.formManager);
        if (this.managed) {
            submitModel.update();
        } else {
            submitModel.create();
        }
    }
    onDelete() {
        new DeleteModel(this.props.dispatch, this.props.formManager);
    }
    render() {
        const buttons = [];
        buttons.push(<button key="submit_button" disabled={this.props.form.invalid || this.props.api.pending || this.props.form.pending} type="submit" class="button">
            {this.managed ? 'Update' : 'Save'}</button>);
        if (this.managed) {
            buttons.push(<button key="delete_button" disabled={this.props.api.pending || this.props.form.pending} onClick={this.onDelete.bind(this)} type="button" class="button alert">Delete</button>);
        }
        return (
            <div class="app-form">
                {wrapComponent('AppForm', AppModal)({
                    id: 'appFormModal'
                })}
                <form noValidate={this.props.noValidate} onSubmit={this.onSubmit.bind(this)} name="appForm">
                    <div class="row form-content">
                        {wrapComponent('AppForm', AppFormMessages)()}
                        {new RenderFields(this.props.dispatch,
                            this.props.formFields,
                            this.props.fieldTemplates).render()}
                    </div>
                    <div class="row form-buttons button-group">
                        {buttons}
                    </div>
                </form>
            </div>
        )
    }
}
