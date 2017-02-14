export function setBasic(basic) {
    return {
        type: 'SET_BASIC_MODEL',
        payload: basic
    };
}

export function setAdditional(additional) {
    return {
        type: 'SET_ADDITIONAL_MODEL',
        payload: additional
    };
}

export function setCopies(copies) {
    return {
        type: 'SET_COPIES_MODEL',
        payload: copies
    };
}