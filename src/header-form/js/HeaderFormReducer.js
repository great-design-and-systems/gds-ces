const DEFAULT_STATE = {
    formValue: null
};
const HeaderFormReducer = (state = DEFAULT_STATE, action) => {
    state = { ...state };
    return state;
}

export default HeaderFormReducer;