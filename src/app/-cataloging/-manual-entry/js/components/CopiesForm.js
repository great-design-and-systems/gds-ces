import { Config ,Field, FieldConverter } from '../../../../-form/js/AppForm';

function CreateCopiesFormField() {
    const formFields = [];
    formFields.push(createBarcodeField());
    formFields.push(createLocationField());
    formFields.push(createCostField());
    formFields.push(createVendorField());
    formFields.push(createDateField());
    formFields.push(createPublicNote());
    formFields.push(createColumnField());

    formFields.push(createCallNumber());
    formFields.push(createFormatField());
    formFields.push(createCurrencyField());
    formFields.push(createFundField());
    formFields.push(createColumnField());

    formFields.push(createFieldSet());
    return formFields;
}

function createFieldSet() {
    const field = new Field('fieldset');
    field.setProperties({
        title: 'Copies',
        className: 'row expanded'
    });
    return field;
}

function createColumnField() {
    const field = new Field('column');
    field.setProperties({
        className: 'large-6 medium-6 small-12'
    });
    return field;
}

function createBarcodeField() {
    const field = new Field('input');
    field.setProperties({
        type: 'text'
    });
    field.setLabel('Barcode');
    field.setRequired(true);
    field.setName('852.p');
    return field;
}

function createLocationField() {
    const field = new Field('select');
    field.setLabel('Location');
    field.setRequired(true);
    field.setName('090.b');
    return field;
}
function createCostField() {
    const field = new Field('input');
    field.setProperties({
        type: 'text'
    });
    field.setLabel('Cost');
    field.setName('cost');
    return field;
}

function createVendorField() {
    const field = new Field('select');
    field.setLabel('Vendor');
    field.setName('vendor');
    return field;
}


function createDateField() {
    const field = new Field('date');
    field.setLabel('Date');
    field.setName('date');
    return field;
}

function createPublicNote() {
    const field = new Field('textArea');
    field.setLabel('Public Note');
    field.setName('publicNote');
    return field;
}

function createCallNumber() {
    const field = new Field('input');
    field.setLabel('Call Number');
    field.setRequired(true);
    field.setName('090.a');
    return field;
}

function createFormatField() {
    const field = new Field('select');
    field.setLabel('Format');
    field.setRequired(true);
    field.setName('leader.$6');
    field.setProperties({
        options: {
            Books: 'a',
            'Printed Music': 'c',
            'Manuscript Music': 'd',
            Maps: 'e',
            'Manuscript maps': 'f',
            'Projected medium (videos)': 'g',
            'Non musical source recording': 'i',
            'Musical sound recording': 'j',
            'Two-dimensional non-projectable graphic': 'k',
            'Computer file': 'm',
            Kit: 'o',
            'Mixed materials': 'p',
            'Three-dimensional artifact': 'r',
            'Manuscript language material': 't'
        }
    });
    return field;
}

function createCurrencyField() {
    const field = new Field('select');
    field.setLabel('Currency');
    field.setRequired(true);
    field.setName('currency');
    return field;
}

function createFundField() {
    const field = new Field('select');
    field.setLabel('Fund');
    field.setRequired(true);
    field.setName('fund');
    return field;
}
export  default CreateCopiesFormField;