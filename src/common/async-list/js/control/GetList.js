import { setDirty, setPending } from '../CommonAsyncListActions';

import lodash from 'lodash';
import { query } from '../../../../api/ApiActions';

export default class GetList {
    constructor(dispatch, listManager, q, params, json, target, queryParam) {
        dispatch(setPending(true, target));
        if (listManager) {
            const get = listManager.get;
            if (get && get.action) {
                const q2 = {...q};
                if (get.query) {
                    lodash.forIn(get.query, (value, field) => {
                        lodash.set(q2, field, value);
                    });
                }
                if (queryParam && queryParam != null) {
                    lodash.forIn(queryParam, (value, field) => {
                        lodash.set(q2, field, value);
                    });
                }
                dispatch(query(get.action, {
                    query: q2,
                    params: params,
                    json: json != null ? json : get.json
                }));
                dispatch(setDirty(false, target));
            }
        }
    }
}