export default class FieldConverter {
    setViewValueConverter(action) {
        this.viewValueConverter = action;
        return this;
    }

    setViewModelConverter(action) {
        this.viewModelConverter = action;
        return this;
    }

    convertViewModel(value) {
        if (this.viewModelConverter) {
            this.value = this.viewModelConverter(value);
        }
        else {
            this.value = value;
        }
    }

    convertViewValue(value) {
        if (this.viewValueConverter) {
            this.viewValue = this.viewValueConverter(value);
        }
        else {
            this.viewValue = value;
        }
    }

    getValue() {
        return this.value;
    }

    getViewValue() {
        return this.viewValue;
    }
}