import lodash from 'lodash';

export default class IsNewQuery {
    constructor(oldQuery, newQuery, props) {
        this.newQuery = props.list ? props.list.dirty : false;
        if (!this.newQuery) {
            if (!oldQuery) {
                this.newQuery = true;
            } else if (oldQuery && newQuery) {
                if (lodash.keys(oldQuery).length === lodash.keys(newQuery).length) {
                    lodash.forIn(oldQuery, (value, field) => {
                        if (!this.newQuery) {
                            const newValue = lodash.get(newQuery, field);
                            this.newQuery = newValue !== value;
                        }
                    });
                } else {
                    this.newQuery = true;
                }
            }
        }

    }

    isNew() {
        return this.newQuery;
    }
}