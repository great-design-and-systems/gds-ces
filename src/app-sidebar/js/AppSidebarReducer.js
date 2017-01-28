const DEFAULT_STATE = {
    isOpen: false
};
const AppSidebarReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            state = { ...state, isOpen: !state.open }
            break;
    }
    return state;
}

export default AppSidebarReducer;