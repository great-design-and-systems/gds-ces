import { openModal, rejectModal, successModal } from '../../../app-modal/js/AppModalActions';
import { setId, setManaged } from '../../js/AppFormActions';

import { removeModel } from '../AppFormActions';

export default class DeleteModel {
    constructor(dispatch, formManager, formFields, formId) {
        dispatch(openModal({
            id: 'appFormModal',
            title: formManager.deletePopup.title,
            message: formManager.deletePopup.message,
            okButton: formManager.deletePopup.okButton,
            cancelButton: formManager.deletePopup.cancelButton,
            okAction: (event) => {
                dispatch(successModal('appFormModal', 'Yes'));
                dispatch(removeModel(formManager.delete.action, formId,
                    formManager.delete.params));
                clearValues(formFields);
                dispatch(setId(null));
                dispatch(setManaged(false));
                if (formManager.deletePopup.okAction) {
                    formManager.deletePopup.okAction();
                }
            },
            cancelAction: (event) => {
                dispatch(rejectModal('appFormModal', 'No'));
                if (formManager.deletePopup.cancelAction) {
                    formManager.deletePopup.cancelAction();
                }
            }
        }));
    }
}

function clearValues(formFields) {
    if (formFields) {
        formFields.forEach(field => {
            field.setValue('');
        });
    }
}