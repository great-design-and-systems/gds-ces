import { setDirty } from '../AppListActions';

export default class EvaluateList {
    constructor(api, listManager) {
        const get = listManager.get;
        if (get) {
            let action = get.action.replace('{', '').replace('}', '');
            action = action.replace(' ', '_');
            const actionSplit = action.split('.');
            const domain = actionSplit[0];
            const method = actionSplit[1];
            const domainCont = eval('api.' + domain);
            if (domainCont) {
                const actionCont = eval('domainCont.' + method);
                if (actionCont) {
                    this.list = actionCont.data;
                    if (this.list && get.eval) {
                        this.list = eval('this.list.' + get.eval);
                    }
                }
            }
        }
    }

    getList() {
        return this.list;
    }
}