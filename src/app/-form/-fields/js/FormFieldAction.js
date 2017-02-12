export function renderField(formName, fieldName, properties) {
    return {
        type: 'RENDER',
        payload: {
            formName: formName,
            fieldName: fieldName,
            properties: properties
        }
    }
}
export function reinstate() {
    return {
        type: 'REINSTATE'
    }
}