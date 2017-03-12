import { renderField } from '../../-fields/js/FormFieldAction';
import { invalid, setModelValue, valid, validate } from '../AppFormActions';
export default class FormManager {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    setModelValue(field, fieldValue) {
        this.dispatch(setModelValue(field, fieldValue));
    }

    setFormValue(formName, fieldName, fieldValue) {
        this.dispatch(setFormValue(formName, fieldName, fieldValue));
    }

    validate(field, fieldProps, dispatch) {
        if (!field.validating) {
            field.validating = true;
            lodash.forIn(field.validator, (validator, fv) => {
                const existingFunction = lodash.get(fieldProps, validator.event);
                if (validator.event) {
                    lodash.set(fieldProps, validator.event, (event) => {
                        if (existingFunction) {
                            existingFunction(event);
                        }
                        event.persist();
                        dispatch(validate());
                        setTimeout(() => {
                            validator.handler(event.target.value, (okay, message) => {
                                if (okay !== undefined) {
                                    if (!okay) {
                                        if (!!message) {
                                            validator.message = message;
                                        }
                                        validator.setInvalid(true);
                                        fieldProps.className = fieldProps.className += ' invalid';
                                        dispatch(invalid(fieldProps.name, field.validator));
                                    } else {
                                        validator.setInvalid(false);
                                        dispatch(valid(fieldProps.name));
                                    }
                                }
                                field.validating = false;
                            });
                        }, validator.delay ? validator.delay : 400);

                    });
                }
            });
        }
    }

    triggerValidateHandler(field, dispatch, event) {
        const fieldProps = field.properties;
        if (!field.validating) {
            field.validating = true;
            lodash.forIn(field.validator, (validator, fv) => {
                dispatch(validate());
                if (!!event && event === validator.event) {
                    validator.handler(field.properties.value, (okay, message) => {
                        if (okay !== undefined) {
                            if (!okay) {
                                if (!!message) {
                                    validator.message = message;
                                }
                                validator.setInvalid(true);
                                fieldProps.className = fieldProps.className += ' invalid';
                                dispatch(invalid(fieldProps.name, field.validator));
                            } else {
                                validator.setInvalid(false);
                                dispatch(valid(fieldProps.name));
                            }
                        }
                        field.validating = false;
                    });
                } else {
                    validator.handler(field.properties.value, (okay, message) => {
                        if (okay !== undefined) {
                            if (!okay) {
                                if (!!message) {
                                    validator.message = message;
                                }
                                validator.setInvalid(true);
                                fieldProps.className = fieldProps.className += ' invalid';
                                dispatch(invalid(fieldProps.name, field.validator));
                            } else {
                                validator.setInvalid(false);
                                dispatch(valid(fieldProps.name));
                            }
                        }
                        field.validating = false;
                    });
                }

            });
        }
    }

    renderField(formName, field, properties) {
        this.dispatch(renderField(formName, field, properties));
    }
}