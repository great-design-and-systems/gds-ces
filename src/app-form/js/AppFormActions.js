
export function dirty() {
    return {
        type: 'FORM_DIRTY'
    }
}

export function invalid(validator) {
    return {
        type: 'FORM_INVALID',
        payload: validator
    }
}

export function validate() {
    return {
        type: 'FORM_VALIDATE'
    }
}

export function valid() {
    return {
        type: 'FORM_VALID'
    }
}