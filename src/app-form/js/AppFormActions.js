import { get, remove, save } from '../../api/ApiActions';

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

export function setValidating(validating) {
    return {
        type: 'VALIDATING',
        payload: validating
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
            name: field.form,
            fieldName: field.properties.name,
            fieldValue: fieldValue
        }
    };
}

export function setId(id) {
    return {
        type: 'SET_ID',
        payload: id
    }
}
export function setManaged(managed) {
    return {
        type: 'SET_MANAGED',
        payload: managed
    }
}
export function getModel(action, id, params) {
    const parameters = JSON.stringify(params).replace('{id}', id);
    return get(action, JSON.parse(parameters));
}

export function removeModel(action, id, params) {
    const parameters = JSON.stringify(params).replace('{id}', id);
    return remove(action, JSON.parse(parameters));
}

export function saveModel(action, id, model, params) {
    const parameters = params ? JSON.stringify(params).replace('{id}', id) : '{}';
    return save(action, model, JSON.parse(parameters));
}

export function formSubmit(formName) {
    return {
        type: 'FORM_SUBMIT',
        payload: formName
    }
}

export function formRemove(formName) {
    return {
        type: 'FORM_REMOVE',
        payload: formName
    }
}

export function formReinstate() {
    return {
        type: 'FORM_REINSTATE'
    }
}

export function formSubmitted(formName) {
    return {
        type: 'FORM_SUBMITTED',
        payload: formName
    }
}

export function formRemoved(formName) {
    return {
        type: 'FORM_REMOVED',
        payload: formName
    }
}
export function modelSet() {
    return {
        type: 'MODEL_SET'
    }
}

export function clearForm() {
    return {
        type: 'CLEAR_FORM'
    }
}