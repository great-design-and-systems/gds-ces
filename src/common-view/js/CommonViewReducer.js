const DEFAULT_STATE = {
    visible: true,
    reload: false
}

const CommonViewReducer = (state = DEFAULT_STATE, action) => {
    state = { ...state };
    switch (action.type) {
        case 'RELOAD':
            state.reload = true
            break;
    }
    return state;
}

export default CommonViewReducer;