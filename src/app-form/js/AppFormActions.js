
export function dirty() {
    return {
        type: 'FORM_DIRTY'
    }
}

export function invalid(fieldName, validator) {
    return {
        type: 'FORM_INVALID',
        payload: {
            validator: validator,
            field: fieldName
        }
    }
}

export function validate() {
    return {
        type: 'FORM_VALIDATE'
    }
}

export function valid(fieldName) {
    return {
        type: 'FORM_VALID',
        payload: fieldName
    }
}

export function setModelValue(field, fieldValue) {
    return {
        type: 'SET_MODEL_VALUE',
        payload: {
            field: field,
            name: field.properties.name,
            value: fieldValue
        }
    };
}