import lodash from 'lodash';

export default class SetFieldValue {
    constructor(fieldName, formFields) {
        if (fieldName) {
            this.field = lodash.filter(formFields, (field) => {
                return field.properties.name === fieldName
            })[0];
        }
    }
    setValue(value) {
        if (this.field) {
            this.field.setValue(value);
        }
    }
}