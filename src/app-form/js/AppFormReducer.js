import lodash from 'lodash';

const FORM_STATE = {
    pristine: true,
    untouched: true,
    dirty: false,
    invalid: false,
    valid: false,
    pending: false,
    error: null
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
                ...state, invalid: true, pending: false
            };
            if (!state.error) {
                state.error = {};
            }
            state.error = { ...state.error };
            lodash.set(state.error, action.payload.field, action.payload.validator);
            break;
        case 'FORM_VALID':
            state = { ...state, invalid: false, valid: true, pending: false };
            if (state.error) {
                state.error = { ...state.error };
                lodash.unset(state.error, action.payload);
            }
            break;
        case 'FORM_VALIDATE':
            state = { ...state, pending: true };
            break;
    }
    return state;
}

export default AppFormReducer;