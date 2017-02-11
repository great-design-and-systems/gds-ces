import lodash from 'lodash';

export default class CreateQuery {
    constructor(nextProps, query, target) {
        const queryMap = nextProps.listManager ? nextProps.listManager.query : undefined;
        const list = nextProps.list.getState(target);
        this.query = { ...query };
        if (list) {
            setLimit(this.query, list.limit, queryMap);
            setStart(this.query, list.start, queryMap);
            setFilter(this.query, list.filter, list.field, queryMap);
            setOrder(this.query, list.order, list.field, queryMap);
        }
    }

    getQuery() {
        return this.query;
    }
}

function parseValue(source, format, value) {
    return source.replace(format, value);
}
function getMap(queryMap, field) {
    const result = lodash.get(queryMap, field);
    if (result) {
        const map = result.split('=');
        return {
            field: map[0],
            value: map[1]
        }
    }
}

function getOrder(queryMap) {
    const result = lodash.get(queryMap, 'order');
    if (result) {
        const order = {};
        lodash.forIn(result, (value, field) => {
            const map = value.split('=');
            const val = {
                field: map[0],
                value: map[1]
            };
            lodash.set(order, field, val);
        });
        return order;
    }
}

function setLimit(query, limit, queryMap) {
    if (limit) {
        if (queryMap && queryMap.limit) {
            const map = getMap(queryMap, 'limit');
            if (map) {
                lodash.set(query, map.field, parseValue(map.value, '{limit}', limit));
            }
        } else {
            lodash.set(query, 'limit', limit);
        }
    }

}
function setStart(query, start, queryMap) {
    if (start) {
        if (queryMap && queryMap.start) {
            const map = getMap(queryMap, 'start');
            if (map) {
                lodash.set(query, map.field, parseValue(map.value, '{start}', start));
            }
        } else {
            lodash.set(query, 'start', start);
        }
    }

}
function setFilter(query, filter, field, queryMap) {
    if (filter != null) {
        if (queryMap && queryMap.filter) {
            const map = getMap(queryMap, 'filter');
            if (map) {
                let value = parseValue(map.value, '{value}', filter);
                lodash.set(query, map.field, parseValue(value, '{field}', field));
            }
        } else {
            lodash.set(query, 'filter', filter);
        }
    }
}

function setOrder(query, order, field, queryMap) {
    if (order && field) {
        if (queryMap && queryMap.order) {
            const map = getOrder(queryMap);
            if (map) {
                const orderMap = lodash.get(map, order);
                if (orderMap) {
                    lodash.set(query, orderMap.field, parseValue(orderMap.value, '{field}', field));
                } else {
                    const asc = lodash.get(map, 'asc');
                    const desc = lodash.get(map, 'desc');
                    if (asc) {
                        lodash.unset(query, asc.field);
                    }
                    if (desc) {
                        lodash.unset(query, desc.field);
                    }
                }

            }
        } else {
            lodash.set(query, order, field);
        }
    }

}