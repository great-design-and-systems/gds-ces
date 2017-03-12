import DefaultTemplates from '../AppFormDefaultTemplates';
import FormManager from './FormManager';
import lodash from 'lodash';
export default class FieldCreator {
    constructor(field, dispatch, templates) {
        this.field = field;
        this.fieldTemplates = {...DefaultTemplates};
        if (templates) {
            lodash.forIn(templates, (value, field) => {
                lodash.set(this.fieldTemplates, field, value);
            });
        }
        this.dispatch = dispatch;
    }

    getElement() {
        return lodash.get(this.fieldTemplates, this.field.tag)(this.field, new FormManager(this.dispatch));
    }
}