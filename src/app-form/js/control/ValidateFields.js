import { invalid, setError, valid, validate } from '../AppFormActions';

import lodash from 'lodash';

export default class ValidateFields {
    constructor(formFields, dispatch) {
        this.formFields = formFields;
        this.dispatch = dispatch;
    }
    validate() {
        const dispatch = this.dispatch;
        if (this.formFields && this.formFields.length) {
            const errors = [];
            dispatch(validate());
            this.formFields.forEach(field => {
                const fieldProps = field.getProperties();
                const value = field.properties.value;
                if (field.validator) {
                    lodash.forIn(field.validator, (validator) => {
                        validator.handler(value, (okay) => {
                            if (!okay) {
                                validator.setInvalid(true);
                                fieldProps.className = fieldProps.className += ' invalid';
                                dispatch(setError(field));
                            } 
                            errors.push(field);
                        });
                    });
                }
            });
            if(errors.length){
                dispatch(invalid());
            }
            else {
                dispatch(valid());
            }
        }
    }
}