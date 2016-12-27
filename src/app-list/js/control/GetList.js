import {query} from '../../../api/ApiActions';
import {togglePending} from '../AppListActions';
export default class GetList {
    constructor(dispatch, listManager, q) {
        if (listManager) {
            const get = listManager.get;
            if (get && get.action) {
                dispatch(query(get.action, {
                    query: q
                }));
                dispatch(togglePending());
            }
        }
    }
}