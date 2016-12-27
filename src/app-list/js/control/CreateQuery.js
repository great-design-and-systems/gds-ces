import lodash from 'lodash';

export default class CreateQuery {
    constructor(nextProps, prevProp, query) {
        const queryMap = nextProps.listManager ? nextProps.listManager.query : undefined;
        const list = nextProps.list;
        this.query = query || {};
        if (!prevProp) {
            setLimit(this.query, list.limit, queryMap);
            setStart(this.query, list.start, queryMap);
            if (list.order && list.order.order) {
                setOrder(this.query, list.order, queryMap);
            }
            if (list.filter) {
                setFilter(this.query, list.filter, queryMap);
            }
        } else {
            const prevList = prevProp.list;
            if (list.limit !== prevList.limit) {
                setLimit(this.query, list.limit, queryMap);
            }
            if (list.start !== prevList.start) {
                setStart(this.query, list.start, queryMap);
            }
            if (list.order && list.order.order !== prevList.order.order) {
                setOrder(this.query, list.order, queryMap);
            }
            if (list.filter !== prevList.filter) {
                setFilter(this.query, list.filter, queryMap);
            }
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
        lodash.forIn(result, (field, value) => {
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
    if (queryMap.limit) {
        const map = getMap(queryMap, 'limit');
        if (map) {
            lodash.set(query, map.field, parseValue(map.value, '{limit}', limit));
        }
    } else {
        lodash.set(query, 'limit', limit);
    }
}
function setStart(query, start, queryMap) {
    if (queryMap.stat) {
        const map = getMap(queryMap, 'start');
        if (map) {
            lodash.set(query, map.field, parseValue(map.value, '{start}', start));
        }
    } else {
        lodash.set(query, 'start', start);
    }
}

function setFilter(query, filter, queryMap) {
    if (queryMap.filter) {
        const map = getMap(queryMap, 'filter');
        if (map) {
            lodash.set(query, map.field, parseValue(map.value, '{value}', filter));
        }
    } else {
        lodash.set(query, 'filter', filter);
    }
}

function setOrder(query, order, queryMap) {
    if (queryMap.order) {
        const map = getOrder(queryMap);
        if (map) {
            const orderMap = lodash.get(map, order.order);
            lodash.set(query, orderMap.field, parseValue(orderMap.value, '{field}', order.field));
        }
    } else {
        lodash.set(query, order.order, order.field);
    }
}