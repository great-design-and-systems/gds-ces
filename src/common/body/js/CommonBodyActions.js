export function setBodyHeight(height) {
    return {
        type: 'SET_BODY_HEIGHT',
        payload: height
    }
}

export function setBodyWidth(width) {
    return {
        type: 'SET_BODY_WIDTH',
        payload: width
    }
}

export function setScreenSize(size) {
    return {
        type: 'SET_SCREEN_SIZE',
        payload: size
    }
}