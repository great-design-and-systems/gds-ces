import lodash from 'lodash';
import FieldConverter from '../domain/FieldConverter';
export default class GetModel {
    constructor(api, formFields, formManager) {
        this.formFields = [...formFields];
        const action = formManager.get.action.replace('{', '').replace('}', '');
        if (api) {
            const data = getData(api, action, formManager);
            if (!!data) {
                setData(this.formFields, data);
            }
        }
    }

    getFormFields() {
        return this.formFields;
    }
}

function getData(api, action, formManager) {
    if (api) {
        const evalatedAction = eval('api.' + action);
        if (evalatedAction) {
            let data = eval('evalatedAction.data');
            if (formManager.get.eval) {
                data = eval('data.' + formManager.get.eval);
            }
            return data;
        }
    }
}

function setData(formFields, data) {
    lodash.forIn(data, (value, field) => {
        const formField = lodash.find(formFields, fd => {
            return fd.properties.name === field
        });
        if (formField) {
            let  viewValue = value;
            if (formField.converter) {
                if (!(formField.converter instanceof FieldConverter)) {
                    throw new Error('Converter must be an instance of -form/js/domain/FieldConverter');
                }
                viewValue = formField.converter.convertViewValue(value).getViewValue();
            }
            formField.setValue(viewValue);
            formField.setModelValue(value);
        }
    });
}