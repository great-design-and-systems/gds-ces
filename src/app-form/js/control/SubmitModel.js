import CreateModel from './CreateModel';
import { save } from '../../../api/ApiActions';

export default class SubmitModel {
    constructor(dispatch, formFields, formManager) {
        this.dispatch = dispatch;
        this.model = new CreateModel(formFields, formManager).getModel();
        this.formManager = formManager;
    }
    create() {
        this.dispatch(save(this.formManager.create.action, this.model,
            this.formManager.create.params));
    }
    update() {
        this.dispatch(save(this.formManager.update.action, this.model,
            this.formManager.update.params));
    }
}