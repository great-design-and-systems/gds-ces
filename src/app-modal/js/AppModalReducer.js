
const DEFAULT_STATE = {
    okButton: 'Yes',
    cancelButton: 'No',
    okAction: (event) => { },
    cancelAction: (event) => { },
    reject: null,
    success: null,
    id: null,
    isOpen: false
}

const AppModalReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            state = {...state};
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.okButton = action.payload.okButton || 'Yes';
            state.cancelButton = action.payload.cancelButton || 'No';
            state.okAction = action.payload.okAction;
            state.cancelAction = action.payload.cancelAction;
            state.id = action.payload.id;
            state.isOpen = action.payload.isOpen;
            break;
        case 'REJECT_MODAL':
            state = {...state};
            state.reject = action.payload.error;
            state.id = action.payload.id;
            break;
        case 'SUCCESS_MODAL':
            state = {...state};
            state.success = action.payload.success;
            state.id = action.payload.id;
            break;
        case 'REINSTATE_MODAL':
            state = {...DEFAULT_STATE};
            break;
    }
    return state;
};

export default AppModalReducer;