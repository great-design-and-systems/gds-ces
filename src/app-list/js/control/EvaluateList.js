import { setPending, setTotal } from '../AppListActions';

import lodash from 'lodash';

export default class EvaluateList {
    constructor(dispatch, api, listManager, target) {
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
                    if (this.list && listManager.transformData) {
                        this.list = listManager.transformData(this.list);
                    }
                    const evaluates = listManager.eval;
                    if (evaluates && actionCont.data) {
                        this.evaluated = {};
                        lodash.forIn(evaluates, (value, field) => {
                            const evaluatedValue = eval('actionCont.data.' + value);
                            lodash.set(this.evaluated, field, evaluatedValue);
                            if (field === 'total') {
                                dispatch(setTotal(evaluatedValue, target));
                            }
                        });
                    }
                }
            }
        }
        dispatch(setPending(false, target));
    }
    getList() {
        return this.list;
    }
}