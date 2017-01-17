import { Api } from '../api/ApiService';
import lodash from 'lodash';

const ApiMiddleware = (store) => (next) => (action) => {
    if (/{(.+)\.(.+)}/.test(action.type)) {
        let executable = action.type.replace('{', '').replace('}', '');
        const link = executable.split('.');
        const api = new Api();
        const domain = lodash.get(api, link[0]);
        const actionLink = lodash.get(domain, link[1]);
        if (actionLink) {
            store.dispatch({
                type: executable + '_PENDING',
                payload: {
                    domain: link[0],
                    executable: link[1]
                }
            });
            actionLink.execute(action.payload, (err, result) => {
                if (err) {
                    store.dispatch({
                        type: executable + '_REJECTED',
                        payload: {
                            domain: link[0],
                            executable: link[1],
                            error: err
                        }
                    });
                } else {
                    store.dispatch({
                        type: executable + '_FULFILLED',
                        payload: {
                            domain: link[0],
                            executable: link[1],
                            result: result
                        }
                    });
                }
                next(action);
            });
        }
        else {
            next(action);
        }

    } else {
        next(action);
    }


};

export default ApiMiddleware;