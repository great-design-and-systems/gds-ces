import {BatchProcessor} from '../../../common/AppUtils';
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
    lastTouchValue: null,
    managed: false,
    id: null,
    formSubmit: false,
    formRemove: false,
    formSubmitted: false,
    formRemoved: false,
    isSettingModel: false,
    name: null,
    model: null,
    batchProcessor: new BatchProcessor()
}

const AppFormReducer = (state = FORM_STATE, action) => {
    switch (action.type) {
        case 'FORM_DIRTY':
            state = { ...state, pristine: false, dirty: true, lastTouch: null };
            break;
        case 'FORM_INVALID':
            state = {
                ...state, invalid: true, valid: false, pending: false, lastTouch: null
            };
            if (action.payload) {
                if (!state.error) {
                    state.error = {};
                }
                state.error = { ...state.error };
                lodash.set(state.error, action.payload.field, action.payload.validator);
            }
            break;
        case 'FORM_VALID':
            state = { ...state, invalid: false, valid: true, pending: false, lastTouch: null };
            if (action.payload) {
                if (state.error) {
                    state.error = { ...state.error };
                    lodash.unset(state.error, action.payload);
                }
            }
            break;
        case 'FORM_VALIDATE':
            state = { ...state, pending: true, lastTouch: null };
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
        case 'FORM_SUBMITTED':
            state = { ...state };
            state.formSubmitted = true;
            state.formSubmit = false;
            state.name = action.payload;
            break;
        case 'FORM_REMOVED':
            state = { ...state };
            state.formRemoved = true;
            state.formRemove = false;
            state.name = action.payload;
            break;
        case 'FORM_REINSTATE':
            state = { ...state };
            state.formSubmit = false;
            state.formSubmit = false;
            state.formSubmitted = false;
            state.formRemoved = false;
            state.name = null;
            state.lastTouch = null;
            state.lastTouchValue = null;
            break;
        case 'MODEL_SET':
            state = { ...state };
            state.isSettingModel = false;
            state.lastTouch = null;
            state.lastTouchValue = null;
            state.model = null;
            break;
        case 'CLEAR_FORM':
            state = { ...FORM_STATE, clear: true };
            break;
        case 'SET_MODEL_VALUE':
            state = { ...state };
            state.name = action.payload.name;
            state.model = {
                name: action.payload.fieldName,
                value: action.payload.fieldValue
            };
            state.isSettingModel = true;
            break;
        case 'SET_ID':
            state = { ...state };
            state.id = action.payload;
            break;
        case 'SET_ERROR':
            if (!state.error) {
                state.error = {};
            }
            lodash.set(state.error, action.payload.field, action.payload.validator);
            break;
        case 'SET_MANAGED':
            state = { ...state };
            state.managed = action.payload;
            break;
        case 'FORM_CLEARED':
            state = { ...state, clear: false }
            break;
    }
    return state;
}

export default AppFormReducer;