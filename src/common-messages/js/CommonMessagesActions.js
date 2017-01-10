export function addError(error){
    return {
        type: 'ADD_ERROR',
        payload: errorr
    }
}

export function setErrors(errors){
    return {
        type :'SET_ERRORS',
        payload: errors
    }
}
export function clearErrors() {
    return {
        type: 'CLEAR_ERRORS'
    }
}