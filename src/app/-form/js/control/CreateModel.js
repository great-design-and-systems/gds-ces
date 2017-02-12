import lodash from 'lodash';

export default class CreateModel {
    constructor(formFields, formManager) {
        const modProps = lodash.map(formFields, 'properties');
        const newModel = {};
        setNewModelProps(newModel, modProps);
        setNewModelFormId(newModel, formManager);
        this.model = newModel;
    }
    getModel() {
        return this.model;
    }
}

function setNewModelFormId(newModel, formManager) {
    if (formManager && formManager.id) {
        lodash.forIn(formManager.id, (value, field) => {
            lodash.set(newModel, field, value);
        });
    }
}

function setNewModelProps(newModel, props) {
    lodash.forEach(props, (prop) => {
        if (prop.name) {
            lodash.set(newModel, prop.name, prop.value);
        }
    });
}