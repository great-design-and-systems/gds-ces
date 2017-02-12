const DEFAULT_STATE = {
    render: false,
    form: null,
    field: null,
    properties: null
}
const FormFieldReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'RENDER':
            state = { ...state, render: true, form: action.payload.formName, field: action.payload.fieldName, properties: action.payload.properties };
            break;
        case 'REINSTATE':
            state = { ...DEFAULT_STATE };
            break;
    }
    return state;
}

export default FormFieldReducer;