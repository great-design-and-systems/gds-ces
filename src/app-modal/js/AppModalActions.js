export function openModal(properties) {
    return {
        type: 'OPEN_MODAL',
        payload: properties
    }
}

export function rejectModal(id, error) {
    return {
        type: 'REJECT_MODAL',
        payload: {
            error: error,
            id: id
        }
    }
}

export function successModal(id, success) {
    return {
        type: 'SUCCESS_MODAL',
        payload: {
            success: success,
            id: id
        }
    }
}

export function reinstateModal() {
    return {
        type: 'REINSTATE_MODAL'
    }
}