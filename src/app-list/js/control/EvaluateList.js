import {togglePending} from '../AppListActions';
export default class EvaluateList {
    constructor(dispatch, api, listManager) {
        const get = listManager.get;
        if (get) {
            const action = get.action.replace('{', '').replace('}', '');
            const listContext = eval('api.' + action);
            if (listContext) {
                this.list = listContext.data;
                if (get.eval) {
                    this.list = eval('this.list.' + get.eval);
                }
            }
            dispatch(togglePending());
        }
    }

    getList() {
        return this.list;
    }
}