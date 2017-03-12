import lodash from 'lodash';
import FieldConverter from '../domain/FieldConverter';
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
            let  viewValue = value;
            if (this.field.converter) {
                if (!(this.field.converter instanceof FieldConverter)) {
                    throw new Error('Converter must be an instance of -form/js/domain/FieldConverter');
                }
                value = this.field.converter.convertViewModel(value).getValue();
                viewValue = this.field.converter.convertViewValue(value).getViewValue();
            }
            this.field.setValue(viewValue);
            this.field.setModelValue(value);
        }
    }
}