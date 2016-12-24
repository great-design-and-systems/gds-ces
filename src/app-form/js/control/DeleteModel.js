import { openModal, rejectModal, successModal } from '../../../app-modal/js/AppModalActions';

import { remove } from '../../../api/ApiActions';

export default class DeleteModel {
    constructor(dispatch, formManager) {
        dispatch(openModal({
            id: 'appFormModal',
            title: formManager.deletePopup.title,
            message: formManager.deletePopup.message,
            okButton: formManager.deletePopup.okButton,
            cancelButton: formManager.deletePopup.cancelButton,
            okAction: (event) => {
                dispatch(successModal('appFormModal', 'Yes'));
                dispatch(remove(formManager.delete.action,
                    formManager.delete.params));
            },
            cancelAction: (event) => {
                dispatch(rejectModal('appFormModal', 'No'));
            }
        }));
    }
}