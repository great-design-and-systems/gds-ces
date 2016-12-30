import { setPending, setTotal } from '../AppListActions';

import lodash from 'lodash';

export default class EvaluateList {
    constructor(dispatch, api, listManager) {
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
                    const evaluates = listManager.eval;
                    if (evaluates) {
                        this.evaluated = {};
                        lodash.forIn(evaluates, (value, field) => {
                            const evaluatedValue = eval('actionCont.data.' + value);
                            lodash.set(this.evaluated, field, evaluatedValue);
                            if (field === 'total') {
                                dispatch(setTotal(evaluatedValue));
                            }
                        });
                    }
                }
            }
        }
        dispatch(setPending(false));
    }
    getList() {
        return this.list;
    }
}