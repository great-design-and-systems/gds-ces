export default class FormConfig {
    constructor() {
        this.create = {};
        this.update = {};
        this.get = {};
        this.delete = {};
        this.deletePopup = {};
    }
    setCreate(action, params) {
        this.create.action = action;
        this.create.params = params;
        return this;
    }
    setUpdate(action, params) {
        this.update.action = action;
        this.update.params = params;
        return this;
    }
    setDelete(action, params) {
        this.delete.action = action;
        this.delete.params = params;
        return this;
    }
    setGet(action, params, peval) {
        this.get.action = action;
        this.get.params = params;
        this.get.eval = peval;
        return this;
    }
    setDeletePopup(title, message, okButton, cancelButton, okAction, cancelAction) {
        this.deletePopup.title = title;
        this.deletePopup.message = message;
        this.deletePopup.okButton = okButton;
        this.deletePopup.cancelButton = cancelButton;
        this.deletePopup.okAction = okAction;
        this.deletePopup.cancelAction = cancelAction;
        return this;
    }
    setTransformRequestModel(transformer){
        this.transformRequestModel = transformer;
    }
    getTransformRequestModel(){
        return this.transformRequestModel;
    }
}