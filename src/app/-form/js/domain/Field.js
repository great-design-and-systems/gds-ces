import lodash from 'lodash';
export default class Field {
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

    setConverter(converter) {
        this.converter = converter;
    }

    getConverter() {
        this.converter;
    }

    setModelValue(value) {
        this.modelValue = value;
    }

    getModelValue() {
        return this.modelValue;
    }
}