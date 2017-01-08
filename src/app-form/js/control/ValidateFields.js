import { invalid, valid, validate } from '../AppFormActions';

import lodash from 'lodash';

export default class ValidateFields {
    constructor(formFields, dispatch) {
        this.formFields = formFields;
        this.dispatch = dispatch;
    }
    validate() {
        const dispatch = this.dispatch;
        if (this.formFields && this.formFields.length) {
            this.formFields.forEach(field => {
                const fieldProps = field.getProperties();
                const value = field.properties.value;
                if (field.validator) {
                    console.log('validating', field);
                    lodash.forIn(field.validator, (validator) => {
                        dispatch(validate());
                        validator.handler(value, (okay) => {
                            if (!okay) {
                                validator.setInvalid(true);
                                fieldProps.className = fieldProps.className += ' invalid';
                                dispatch(invalid(fieldProps.name, field.validator));
                            } else {
                                dispatch(valid(fieldProps.name));
                            }
                            field.validating = false;
                        });
                    });
                }
            });
        }
    }
}