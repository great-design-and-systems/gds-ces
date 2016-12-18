
const DEFAULT_STATE = {
    okButton: 'Yes',
    cancelButton: 'No',
    okAction: (event) => { },
    cancelAction: (event) => { },
    reject: null,
    success: null
}

const AppModalReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            state = {};
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.okButton = action.payload.okButton || 'Yes';
            state.cancelButton = action.payload.cancelButton || 'No';
            state.okAction = action.payload.okAction;
            state.cancelAction = action.payload.cancelAction;
            state.popup = new Foundation.Reveal($('#' + action.payload.id));
            state.popup.open();
            break;
        case 'REJECT_MODAL':
            state.popup.destroy();
            state = {};
            state.reject = action.payload.error;
            break;
        case 'SUCCESS_MODAL':
            state.popup.destroy();
            state = {};
            state.success = action.payload.success;
            break;
    }
    return state;
};

export default AppModalReducer;