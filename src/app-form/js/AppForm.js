import lodash from 'lodash';
export class Field {
    constructor(tag) {
        this.tag = tag;
        this.properties = {};
    }
    setType(type) {
        this.properties.type = type;
    }
    setName(name) {
        this.properties.name = name;
    }
    setLabel(label) {
        this.label = label;
    }
    setProperties(properties) {
        lodash.forIn(properties, (value, field) => {
            if (field === 'className') {
                value = +' field-element';
            }
            lodash.set(this.properties, field, value);
        });
    }
    getProperties() {
        this.setClass();
        return this.properties;
    }
    setClass() {
        let classProp = lodash.get(this.properties, 'className');
        if (!classProp) {
            classProp = ' field-element';
            lodash.set(this.properties, 'className', classProp);
        }
    }
}