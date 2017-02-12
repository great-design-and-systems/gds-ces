import lodash from 'lodash';

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

    getFormFields() { return this.formFields; }
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
            formField.properties.value = value;
        }
    });
}