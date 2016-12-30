import { setDirty, setPending } from '../AppListActions';

import { query } from '../../../api/ApiActions';

export default class GetList {
    constructor(dispatch, listManager, q, params) {
        if (listManager) {
            const get = listManager.get;
            if (get && get.action) {
                dispatch(query(get.action, {
                    query: q,
                    params: params
                }));
                dispatch(setDirty(false));
                dispatch(setPending(true));
            }
        }
    }
}