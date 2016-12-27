import lodash from 'lodash';

export default class IsNewQuery {
    constructor(oldQuery, newQuery) {
        this.newQuery = false;
        if (!oldQuery) {
            this.newQuery = true;
        } else if (oldQuery && newQuery) {
            lodash.forIn(oldQuery, (value, field) => {
                if (!this.newQuery) {
                    const newValue = lodash.get(newQuery, field);
                    this.newQuery = newValue !== value;
                }
            });
        }
    }

    isNew() {
        return this.newQuery;
    }
}