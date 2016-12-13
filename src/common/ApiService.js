import Vendors from './AppVendors';
import lodash from 'lodash';

export class Api {
    constructor() {
        if (window.gdsApi) {
            lodash.forEach(window.gdsApi, (value, field) => {
                lodash.set(this, field, value);
            });
        }
    }
    init(source, callback) {
        const fetch = new Vendors().getFetch();
        fetch(source)
            .then(res => {
                window.gdsApi = res.json();
                callback();
            })
            .catch(err => {
                callback(err);
            });
    }
}