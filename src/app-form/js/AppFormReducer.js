import lodash from 'lodash';

const FORM_STATE = {
    pristine: true,
    untouched: true,
    dirty: false,
    invalid: false,
    valid: false,
    pending: false,
    error: null,
    lastTouch: null,
    managed: false,
    id: null,
    formSubmit: false,
    formRemove: false,
    name: null
}

const AppFormReducer = (state = FORM_STATE, action) => {
    switch (action.type) {
        case 'FORM_DIRTY':
            state = { ...state, pristine: false, dirty: true, lastTouch: null };
            break;
        case 'FORM_INVALID':
            state = {
                ...state, invalid: true, pending: false, lastTouch: null
            };
            if (!state.error) {
                state.error = {};
            }
            state.error = { ...state.error };
            lodash.set(state.error, action.payload.field, action.payload.validator);
            break;
        case 'FORM_VALID':
            state = { ...state, invalid: false, valid: true, pending: false, lastTouch: null };
            if (state.error) {
                state.error = { ...state.error };
                lodash.unset(state.error, action.payload);
            }
            break;
        case 'FORM_VALIDATE':
            state = { ...state, pending: true, lastTouch: null };
            break;
        case 'SET_MODEL_VALUE':
            state = { ...state };
            action.payload.field.setValue(action.payload.value);
            state.lastTouch = action.payload.field;
            break;
        case 'SET_ID':
            state = { ...state };
            state.id = action.payload;
            break;
        case 'SET_MANAGED':
            state = { ...state };
            state.managed = action.payload;
            break;
        case 'FORM_SUBMIT':
            state = { ...state };
            state.formSubmit = true;
            state.name = action.payload;
            break;
        case 'FORM_REMOVE':
            state = { ...state };
            state.formRemove = true;
            state.name = action.payload;
            break;
        case 'FORM_REINSTATE':
            state = { ...state };
            state.formSubmit = false;
            state.formSubmit = false;
            state.name = null;
            braek;

    }
    return state;
}

export default AppFormReducer;