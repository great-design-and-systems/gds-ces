import Vendors from '../common/AppVendors';
import lodash from 'lodash';

export class Api {
    constructor() {
        copyApiValue(this);
    }
    init(source, callback) {
        const fetch = new Vendors().getFetch();
        fetch(source)
            .then(res => {
                res.json().then((data) => {
                    window.gdsApi = {};
                    lodash.forIn(data, (value) => {
                        lodash.set(window.gdsApi, value.domain, new DomainApi(value));
                    });
                    callback();
                });
            })
            .catch(err => {
                callback(err);
            });
    }
}

class DomainApi {
    constructor(port) {
        lodash.forIn(port.links, (link, name) => {
            lodash.set(this, name, new DomainLink(link));
        });
    }
}

class DomainLink {
    constructor(link) {
        this.url = link.url;
        this.method = link.method;
    }
    execute(options, callback) {
        const link = this;
        const fetch = new Vendors().getFetch();
        let url = link.url;
        const fetchOption = {};
        fetchOption.headers = options.headers || {};

        if (options && options.params) {
            lodash.forEach(options.params, function (value, key) {
                url = url.replace(':' + key, value);
            });
        }
        if (options && options.query) {
            lodash.forEach(options.query, function (value, key) {
                if (value instanceof Array) {
                    value.forEach(queryVal => {
                        if (url.indexOf('?') == -1) {
                            url += '?';
                        } else {
                            url += '&';
                        }
                        url += key;
                        url += '=';
                        url += queryVal;
                    });
                } else {
                    if (url.indexOf('?') == -1) {
                        url += '?';
                    } else {
                        url += '&';
                    }
                    url += key;
                    url += '=';
                    url += value;
                }
            });
        }

        if (options.json) {
            lodash.set(fetchOption.headers, 'Content-Type', 'application/json');
            fetchOption.body = JSON.stringify(options.json);
        } else if (options.data && options.data instanceof FormData) {
            fetchOption.body = data;
        }

        if (options.credentials) {
            fetchOption.credentials = 'include';
        }

        fetchOption.method = link.method;

        fetch(url, fetchOption).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                res.json().then(jsonData => {
                    callback(undefined, jsonData);
                });
            } else {
                res.json().then(jsonData => {
                    callback(new Error(jsonData.data), jsonData);
                });
            }
        }).catch(err => {
            callback(err);
        });
    }
}

function copyApiValue(context) {
    if (window.gdsApi) {
        lodash.forEach(window.gdsApi, (value, field) => {
            lodash.set(context, field, value);
        });
    }
}