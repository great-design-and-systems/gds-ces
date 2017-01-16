import { invalid, setFormValue, setModelValue, valid, validate } from './AppFormActions';

import AppFormCategories from './components/AppFormCategories';
import AppFormCheckBox from './components/AppFormCheckbox';
import AppFormInput from './components/AppFormInput';
import AppFormRadio from './components/AppFormRadio';
import AppFormSelect from './components/AppFormSelect';
import AppIconBox from './components/AppIconBox';
import React from 'react';
import lodash from 'lodash';

export class Field {
    constructor(tag) {
        this.tag = tag;
        this.properties = {};
        this.hasDivParent = true;
        this.invalid = false;
    }
    setHasDivParent(hasDivParent) {
        this.hasDivParent = hasDivParent;
    }
    setName(name) {
        this.properties.name = name;
    }
    setLabel(label) {
        this.label = label;
    }
    setValue(value) {
        this.properties.value = value;
    }
    setProperties(properties) {
        lodash.forIn(properties, (value, field) => {
            if (field === 'className') {
                value += ' field-element';
            }
            lodash.set(this.properties, field, value);
        });
    }
    getProperties() {
        this.setClass();
        return this.properties;
    }
    setClass() {
        let classProp = lodash.get(this.properties, 'className');
        if (!classProp) {
            classProp = 'field-element';
            lodash.set(this.properties, 'className', classProp);
        }
    }
    getValue() {
        return this.properties.value;
    }
    setValidator(validator) {
        this.validator = validator;
    }
    setInvalid(invalid) {
        this.invalid = invalid;
    }
    setRequired(required) {
        lodash.set(this.properties, 'required', required);
    }
    isRequired() {
        return !!lodash.get(this.properties, 'required');
    }
}

export class FieldCreator {
    constructor(field, dispatch, templates) {
        this.field = field;
        this.fieldTemplates = { ...DEFAULT_TEMPLATES };
        if (templates) {
            lodash.forIn(templates, (value, field) => {
                lodash.set(this.fieldTemplates, field, value);
            });
        }
        this.dispatch = dispatch;
    }
    getElement() {
        return lodash.get(this.fieldTemplates, this.field.tag)(this.field, new FormManager(this.dispatch));
    }
}

export class FieldValidator {
    constructor(event, message, handler, type) {
        this.event = event;
        this.message = message;
        this.handler = handler;
        this.invalid = false;
        this.type = type;
    }
    setMessage(message) {
        this.message = message;
    }

    setEvent(event) {
        this.event = event;
    }

    setHandler(handler) {
        this.handler = handler;
    }
    setInvalid(invalid) {
        this.invalid = invalid;
    }
}
export class FormManager {
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
                            validator.handler(event.target.value, (okay) => {
                                if (okay !== undefined) {
                                    if (!okay) {
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
    triggerValidateHandler(field, dispatch) {
        const fieldProps = field.properties;
        if (!field.validating) {
            field.validating = true;
            lodash.forIn(field.validator, (validator, fv) => {
                dispatch(validate());
                validator.handler(field.properties.value, (okay) => {
                    if (okay !== undefined) {
                        if (!okay) {
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
            });
        }
    }
}

const DEFAULT_TEMPLATES = {
    input: (field, formManager) => {
        return <AppFormInput field={field} formManager={formManager} />
    },
    checkbox: (field, formManager) => {
        return <AppFormCheckBox field={field} formManager={formManager} />
    },
    select: (field, formManager) => {
        return <AppFormSelect field={field} formManager={formManager} />
    },
    radio: (field, formManager) => {
        return <AppFormRadio field={field} formManager={formManager} />
    },
    iconBox: (field, formManager) => {
        return <AppIconBox field={field} formManager={formManager} />
    },
    categories: (field, formManager) => {
        return <AppFormCategories field={field} formManager={formManager} />
    }
};