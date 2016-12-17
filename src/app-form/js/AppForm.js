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
}

export class FieldCreator {
    constructor(field, templates) {
        if (!(field instanceof Field)) {
            throw new Error('Argument must be an instance of Field');
        }
        this.field = field;
        this.fieldTemplates = { ...DEFAULT_TEMPLATES };
        if (templates) {
            lodash.forIn(templates, (value, field) => {
                lodash.set(this.fieldTemplates, field, value);
            });
        }
    }

    getElement() {
        return lodash.get(this.fieldTemplates, this.field.tag)(this.field);
    }
}

export class FieldValidator {
    constructor(event, message, handler) {
        this.event = event;
        this.message = message;
        this.handler = handler;
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

    done(valid) {
        return Object.assign({}, this, { valid });
    }
}

const DEFAULT_TEMPLATES = {
    input: (field) => {
        return <AppFormInput field={field} />
    },
    checkbox: (field) => {
        return <AppFormCheckBox field={field} />
    },
    select: (field) => {
        return <AppFormSelect field={field} />
    },
    radio: (field) => {
        return <AppFormRadio field={field} />
    }
};