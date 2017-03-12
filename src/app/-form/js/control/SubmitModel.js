import CreateModel from './CreateModel';
import { saveModel } from '../AppFormActions';

export default class SubmitModel {
    constructor(dispatch, formFields, formManager, formId) {
        this.dispatch = dispatch;
        this.model = new CreateModel(formFields, formManager).getModel();
        this.formManager = formManager;
        this.formId = formId;
        if (formManager.getTransformRequestModel()) {
            this.model = formManager.getTransformRequestModel()(this.model);
        }
    }

    create() {
        this.dispatch(saveModel(this.formManager.create.action, this.formId, this.model,
            this.formManager.create.params));
    }

    update() {
        this.dispatch(saveModel(this.formManager.update.action, this.formId, this.model,
            this.formManager.update.params));
    }
}