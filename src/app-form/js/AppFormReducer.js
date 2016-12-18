const FORM_STATE = {
    pristine: true,
    untouched: true,
    dirty: false,
    invalid: false,
    valid: false,
    pending: false
}

const AppFormReducer = (state = FORM_STATE, action) => {
    switch (action.type) {
        case 'FORM_DIRTY':
            state = {
                ...state, pristine: false,
                dirty: true
            };
            break;
        case 'FORM_INVALID':
            state = {
                ...state, invalid: true, pending: false,
                validator: action.payload
            };
            break;
        case 'FORM_VALID':
            state = { ...state, invalid: false, valid: true, pending: false };
            break;
        case 'FORM_VALIDATE':
            state = { ...state, pending: true, validator: undefined };
            break;
    }
    return state;
}

export default AppFormReducer;