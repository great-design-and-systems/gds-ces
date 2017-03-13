import React from 'react';
import { Config, AppForm ,Field, FieldConverter } from '../../../../-form/js/AppForm';
import { wrapComponent } from '../../../../../common/AppUtils';
import CreateBasicFormFields from './BasicForm';
import CreateAdditionalFormFields from './AdditionalForm';
import CreateCopiesFormFields from './CopiesForm';
import Controls from './Controls';
$(document).foundation();
export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setFormState();
    }

    setFormState() {
        this.formFields = [];
        this.formConfig = new Config();
        this.setUpConfig();
        this.formFields = this.formFields.concat(CreateBasicFormFields());
        this.formFields = this.formFields.concat(CreateAdditionalFormFields());
        this.formFields = this.formFields.concat(CreateCopiesFormFields());
    }

    setUpConfig() {
        this.formConfig.setTransformRequestModel(model=> {
            console.log('transforming model', model);
            return model;
        });
    }

    render() {
        return (
            <div class="manual-entry body">
                <div class="content-header">
                    <Controls/>
                </div>
                <div class="large-8 large-offset-2">
                    {wrapComponent('entry_form', AppForm)({
                        id: 'manualEntryForm',
                        className: 'manual-entry',
                        formFields: this.formFields,
                        formConfig: this.formConfig
                    })}
                </div>
            </div>
        )
    }
}