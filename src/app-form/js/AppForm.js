import { invalid, valid, validate } from './AppFormActions';

import AppFormCheckBox from './components/AppFormCheckbox';
import AppFormInput from './components/AppFormInput';
import AppFormRadio from './components/AppFormRadio';
import AppFormSelect from './components/AppFormSelect';
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
}

export class FieldCreator {
    constructor(formFields, field, templates) {
        this.field = field;
        this.formFields = formFields;
        this.fieldTemplates = { ...DEFAULT_TEMPLATES };
        if (templates) {
            lodash.forIn(templates, (value, field) => {
                lodash.set(this.fieldTemplates, field, value);
            });
        }
    }
    getElement() {
        return lodash.get(this.fieldTemplates, this.field.tag)(this.field, new Validator());
    }
}

export class FieldValidator {
    constructor(event, message, handler) {
        this.event = event;
        this.message = message;
        this.handler = handler;
        this.invalid = false;
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
export class Validator {
    validate(context, field, fieldProps, dispatch) {
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
                        validator.handler(event, (okay) => {
                            if (!okay) {
                                field.setInvalid(true);
                                validator.setInvalid(true);
                                fieldProps.className = fieldProps.className += ' invalid';
                                dispatch(invalid(field.validator));
                            } else {
                                dispatch(valid());
                            }
                            context.forceUpdate();
                        });
                    }, validator.delay ? validator.delay : 400);

                });
            }
        });
    }
}

const DEFAULT_TEMPLATES = {
    input: (field, validator) => {
        return <AppFormInput field={field} validator={validator} />
    },
    checkbox: (field, validator) => {
        return <AppFormCheckBox field={field} validator={validator} />
    },
    select: (field, validator) => {
        return <AppFormSelect field={field} validator={validator} />
    },
    radio: (field, validator) => {
        return <AppFormRadio field={field} validator={validator} />
    }
};